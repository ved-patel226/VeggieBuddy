from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options

import json
from tqdm import tqdm

with open("restaurants.json", "r") as file:
    restauraunts = json.load(file)

options = Options()
options.add_argument("--disable-gpu")
options.add_argument("--headless")

driver = webdriver.Chrome(
    options=options, service=ChromeService(ChromeDriverManager().install())
)

for res in tqdm(restauraunts, desc="Processing restaurants"):
    driver.get("https://www.google.com  /maps/place/?q=place_id:" + res["place_id"])
    try:
        # Assuming there's a specific element to wait for, e.g., the restaurant's name
        element = driver.find_element(
            "xpath",
            '//*[@id="QA0Szd"]/div/div/div[1]/div[2]/div/div[1]/div/div/div[2]/div/div[1]/div[2]/div/div[2]/span[1]/span/button',
        )

        cusine = element.text.strip()
        cusine = " ".join(cusine.split(" ")[:-1])

        res["cuisine"] = cusine

    except Exception as e:
        print(f"Failed to find cuisine for {res['name']}: {e}")

    except Exception as e:
        print(f"Failed to load {res['name']}: {e}")


with open("restaurants.json", "w") as file:
    json.dump(restauraunts, file, indent=4)
