import ollama


def ask_llm(prompt):
    response = ollama.chat(
        model="llava:latest", messages=[{"role": "user", "content": prompt}]
    )

    return response["message"]["content"]
