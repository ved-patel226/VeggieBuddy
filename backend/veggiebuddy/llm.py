import ollama

with open("prompt.txt", "r") as f:
    prompt_txt = f.read()


def ask_llm(prompt):
    prompt = prompt_txt + prompt

    response = ollama.chat(
        model="mistral", messages=[{"role": "user", "content": prompt}]
    )

    return response["message"]["content"]
