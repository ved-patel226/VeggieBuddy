import ollama

with open("prompt.txt", "r") as f:
    prompt_txt = f.read()


def ask_llm(food_item, preference="vegetarian"):
    formatted_prompt = prompt_txt.replace("{preference}", preference) + food_item

    response = ollama.chat(
        model="mistral", messages=[{"role": "user", "content": formatted_prompt}]
    )

    return response["message"]["content"]
