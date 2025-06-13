from veggiebuddy.scrape import VeggieBuddyScraper
from veggiebuddy.llm import ask_llm

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import re
import csv

app = Flask(__name__)
CORS(app)

with open("restaurants.json", "r", encoding="utf-8") as f:
    restaurants = json.load(f)


@app.route("/api/restaurants")
def get_restaurants():
    query = request.args.get("q", "").lower()
    filtered = (
        [r for r in restaurants if query in r["name"].lower()] if query else restaurants
    )
    filtered.sort(key=lambda x: x.get("rating", 0), reverse=True)
    return jsonify(filtered)


@app.route("/api/resturuants2")
def get_restaurants2():
    query = request.args.get("q", "").lower()
    filtered = (
        [r for r in restaurants if query in r["name"].lower()] if query else restaurants
    )
    filtered.sort(key=lambda x: x.get("rating", 0), reverse=True)

    results = []

    for relevent_resturuant in filtered:
        print(relevent_resturuant["name"])

        place_id = relevent_resturuant["place_id"]

        try:
            menu_items = VeggieBuddyScraper(place_id).scrape()
        except Exception as e:
            continue

        veg_items = 0

        for item in menu_items:
            res = ask_llm(str(item))

            # Remove anything in parentheses (and the parentheses) from res
            res_clean = re.sub(r"\(.*?\)", "", res).strip()
            if res_clean.lower() == "y":
                veg_items += 1
            elif res_clean.lower() == "n":
                continue
            else:
                print(f"Unrecognized output, defaulting to 'n', {res_clean}")

        results.append(
            {
                "restaurant_name": relevent_resturuant["name"],
                "place_id": place_id,
                "veg_items": veg_items,
            }
        )

    # Write results to CSV
    csv_file = "veg_items_results.csv"
    with open(csv_file, "w", newline="", encoding="utf-8") as f:
        writer = csv.DictWriter(
            f, fieldnames=["restaurant_name", "place_id", "veg_items"]
        )
        writer.writeheader()
        writer.writerows(results)

    return jsonify(results)


if __name__ == "__main__":
    app.run(debug=True)
