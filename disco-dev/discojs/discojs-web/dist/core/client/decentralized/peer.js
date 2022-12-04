"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Peer = void 0;
var tslib_1 = require("tslib");
var immutable_1 = require("immutable");
var simple_peer_1 = (0, tslib_1.__importDefault)(require("simple-peer"));
// message id + (chunk counter == 0) + chunk count
var FIRST_HEADER_SIZE = 2 + 1 + 1;
// message id + chunk counter
var HEADER_SIZE = 2 + 1;
// at which interval to poll
var TICK = 10;
// Peer wraps a SimplePeer, adding message fragmentation
//
// WebRTC implementations have various maximum message size
// but with huge models, our messages might be bigger.
// We split messages by chunks and reconstruct theses
// on the other side.
//
// As the WebRTC's DataChannel is not a stream, we need
// reorder messages, so we use a header on each chunk
// with a message id and chunk counter. The first chunk
// (chunk counter == 0), also add the total number of chunk.
//
// see feross/simple-peer#393 for more info
var Peer = /** @class */ (function () {
    function Peer(id, opts) {
        this.sendCounter = 0;
        this.sendQueue = (0, immutable_1.List)();
        this.receiving = (0, immutable_1.Map)();
        this.id = id;
        this.peer = new simple_peer_1.default(opts);
    }
    Peer.prototype.send = function (msg) {
        console.debug('sending message of size', msg.length);
        var chunks = this.chunk(msg);
        this.sendQueue = this.sendQueue.concat(chunks);
        this.flush();
    };
    Peer.prototype.flush = function () {
        var _this = this;
        if (this.bufferSize === undefined) {
            throw new Error('flush without known buffer size');
        }
        var chunk = this.sendQueue.first();
        if (chunk === undefined) {
            return; // nothing to flush
        }
        var remainingBufferSize = this.bufferSize - this.peer.bufferSize;
        if (chunk.length > remainingBufferSize) {
            setTimeout(function () { return _this.flush(); }, TICK);
            return;
        }
        console.debug('sending chunk of size', chunk.length);
        this.sendQueue = this.sendQueue.shift();
        this.peer.send(chunk);
        // and loop
        this.flush();
    };
    Object.defineProperty(Peer.prototype, "maxChunkSize", {
        get: function () {
            if (this.bufferSize === undefined) {
                throw new Error('chunk without known buffer size');
            }
            // in the perfect world of bug-free implementations
            // we would return this.bufferSize
            // sadly, we are not there yet
            //
            // based on MDN, taking 16K seems to be a pretty safe
            // and widely supported buffer size
            return 16 * (1 << 10);
        },
        enumerable: false,
        configurable: true
    });
    Peer.prototype.chunk = function (b) {
        var _this = this;
        var messageID = this.sendCounter;
        this.sendCounter++;
        if (this.sendCounter > 0xFFFF) {
            throw new Error('too much messages sent to this peer');
        }
        // special case as Range(1, 0) yields a value
        var tail = immutable_1.Seq.Indexed([]);
        if (b.length > this.maxChunkSize) {
            tail = (0, immutable_1.Range)(this.maxChunkSize - FIRST_HEADER_SIZE, b.length, this.maxChunkSize - HEADER_SIZE).map(function (offset) { return b.subarray(offset, offset + _this.maxChunkSize - HEADER_SIZE); });
        }
        var totalChunkCount = 1 + tail.count();
        if (totalChunkCount > 0xFF) {
            throw new Error('too big message to even chunk it');
        }
        var firstChunk = Buffer.alloc((b.length > this.maxChunkSize - FIRST_HEADER_SIZE)
            ? this.maxChunkSize
            : FIRST_HEADER_SIZE + b.length);
        firstChunk.writeUint16BE(messageID);
        firstChunk.writeUint8(0, 2);
        firstChunk.writeUint8(totalChunkCount, 3);
        b.copy(firstChunk, FIRST_HEADER_SIZE, 0, this.maxChunkSize - FIRST_HEADER_SIZE);
        return immutable_1.Seq.Indexed([firstChunk])
            .concat((0, immutable_1.Range)(1).zip(tail)
            .map(function (_a) {
            var _b = (0, tslib_1.__read)(_a, 2), id = _b[0], raw = _b[1];
            var chunk = Buffer.alloc(HEADER_SIZE + raw.length);
            chunk.writeUint16BE(messageID);
            chunk.writeUint8(id, 2);
            raw.copy(chunk, HEADER_SIZE, 0);
            return chunk;
        }));
    };
    Peer.prototype.destroy = function () {
        this.peer.destroy();
    };
    Peer.prototype.signal = function (signal) {
        // extract max buffer size
        if (signal.type === 'offer' || signal.type === 'answer') {
            if (signal.sdp === undefined) {
                throw new Error('signal answer|offer without session description');
            }
            if (this.bufferSize !== undefined) {
                throw new Error('buffer size set twice');
            }
            var match = signal.sdp.match(/a=max-message-size:(\d+)/);
            if (match === null) {
                // TODO default value instead?
                throw new Error('no max-message-size found in signal');
            }
            var max = parseInt(match[1], 10);
            if (isNaN(max)) {
                throw new Error("unable to parse max-message-size as int: " + match[1]);
            }
            this.bufferSize = max;
        }
        this.peer.signal(signal);
    };
    Peer.prototype.on = function (event, listener) {
        var _this = this;
        if (event !== 'data') {
            this.peer.on(event, listener);
            return;
        }
        this.peer.on('data', function (data) {
            if (!Buffer.isBuffer(data) || data.length < HEADER_SIZE) {
                throw new Error('received invalid message type');
            }
            var messageID = data.readUint16BE();
            var chunkID = data.readUint8(2);
            var received = _this.receiving.get(messageID, {
                total: undefined,
                chunks: (0, immutable_1.Map)()
            });
            var total = received.total;
            var chunks = received.chunks;
            if (chunks.has(chunkID)) {
                throw new Error("chunk " + messageID + ":" + chunkID + " already received");
            }
            var chunk;
            if (chunkID !== 0) {
                chunk = Buffer.alloc(data.length - HEADER_SIZE);
                data.copy(chunk, 0, HEADER_SIZE);
            }
            else {
                if (data.length < FIRST_HEADER_SIZE) {
                    throw new Error('received invalid message type');
                }
                if (total !== undefined) {
                    throw new Error('first header received twice');
                }
                var readTotal_1 = data.readUint8(3);
                total = readTotal_1;
                chunk = Buffer.alloc(data.length - FIRST_HEADER_SIZE);
                data.copy(chunk, 0, FIRST_HEADER_SIZE);
                if (chunks.keySeq().some(function (id) { return id > readTotal_1; })) {
                    throw new Error('received total of chunk but got now-out-of-bound chunks');
                }
            }
            _this.receiving = _this.receiving.set(messageID, {
                total: total,
                chunks: chunks.set(chunkID, chunk)
            });
            console.debug("got chunk " + messageID + ":" + chunkID + "/" + (total !== null && total !== void 0 ? total : 'unknown') + " of size " + chunk.length);
            var readyMessages = _this.receiving
                .filter(function (_a) {
                var total = _a.total, chunks = _a.chunks;
                return total !== undefined && chunks.size === total;
            })
                .sort()
                .map(function (_a) {
                var chunks = _a.chunks;
                return chunks.entrySeq().toList().sortBy(function (_a) {
                    var _b = (0, tslib_1.__read)(_a, 2), id = _b[0], _ = _b[1];
                    return id;
                });
            })
                .map(function (chunks) { return Buffer.concat(chunks.map(function (_a) {
                var _b = (0, tslib_1.__read)(_a, 2), _ = _b[0], b = _b[1];
                return b;
            }).toArray()); });
            _this.receiving = _this.receiving.deleteAll(readyMessages.keys());
            readyMessages
                .forEach(function (message) {
                console.debug(_this.peer.address().port, 'recved message of size', message.length);
                // TODO debug
                // @ts-expect-error
                listener(message);
            });
        });
    };
    return Peer;
}());
exports.Peer = Peer;
