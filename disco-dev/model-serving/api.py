from fastapi import FastAPI
from fastapi.responses import FileResponse

base_path = "/home/hamza/Hackathons/model-converter/"
json_path = base_path + "model.json"
binary_path = base_path + "group1-shard1of1.bin"
app = FastAPI()

@app.get("/model.json")
def main():
    return FileResponse(path=json_path, filename='model.json', media_type='application/json')

@app.get("/group1-shard1of1.bin")
def main():
    return FileResponse(path=binary_path, filename='group1-shard1of1.bin', media_type='application/octet-stream')