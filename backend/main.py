from llama_cpp import Llama
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

llm = Llama(
      model_path="/Users/a0k0d2h/models/mistral-7b-instruct-v0.2.Q4_K_M.gguf",
      n_gpu_layers = 100, 
      verbose = False,
      n_ctx = 30000
)

def get_response(prompt):
    response = llm(prompt, max_tokens=2000)
    return response["choices"][0]["text"] # .split("</think>")[1] # for deepseek models

class ChatRequest(BaseModel):
    prompt: str

@app.post("/chat")
def chat(body: ChatRequest):
    print(f"Received request: {body.prompt}")
    res = {"Message": get_response(body.prompt)}
    print(res)
    return res
