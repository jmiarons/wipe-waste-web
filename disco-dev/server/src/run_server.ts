#!/usr/bin/env node
import dns from 'node:dns';
dns.setDefaultResultOrder('ipv4first');
import { runDefaultServer } from './get_server'

void runDefaultServer()
