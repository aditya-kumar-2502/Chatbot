from llama_cpp import Llama
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

llm = Llama(
      model_path="/Users/a0k0d2h/models/DeepSeek-R1-Distill-Qwen-7B-Q5_K_M.gguf",
      n_gpu_layers = 100, 
      verbose = False,
      n_ctx = 48000
)

def get_response(prompt):
    response = llm(prompt, max_tokens=2000)
    return response["choices"][0]["text"].split("</think>")[1]

class ChatRequest(BaseModel):
    prompt: str

@app.post("/chat")
def chat(body: ChatRequest):
    print(f"Received request: {body.prompt}")
    res = {"message": get_response(body.prompt)}
    print(res)
    return res
