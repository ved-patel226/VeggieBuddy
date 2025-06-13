from veggiebuddy.scrape import VeggieBuddyScraper
from veggiebuddy.llm import ask_llm

from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import re
import csv
import os
from tqdm import tqdm

app = Flask(__name__)
CORS(app)
with open("restaurants.json", "r", encoding="utf-8") as f:
    restaurants = json.load(f)


@app.route("/api/restaurants")
def get_restaurants():
    query = request.args.get("q", "").lower()
    preference = request.args.get("preference", "vegetarian").lower()

    filtered = (
        [r for r in restaurants if query in r["name"].lower()] if query else restaurants
    )

    preference_key = f"{preference}_items"

    print(f"Preference: {preference_key}")

    filtered = [
        r for r in filtered if preference_key in r and r.get(preference_key, 0) != 0
    ]
    filtered.sort(key=lambda x: x.get(preference_key, 0), reverse=True)

    if not filtered:
        updated = False
        for res in tqdm(restaurants, desc="Scraping restaurants"):
            if query and query not in res["name"].lower():
                continue
            placeid = res.get("placeid") or res.get("place_id")

            if not placeid:
                continue

            try:
                menu_items = VeggieBuddyScraper(placeid).scrape()
            except:
                continue

            prefered_items = 0

            for item in menu_items:
                ai_res = ask_llm(str(item), preference_key)
                if ai_res.lower().strip() == "y":
                    prefered_items += 1
                elif ai_res.lower().strip() == "n":
                    continue
                else:
                    print(f"Unrecognized ai_res? {ai_res}")

            if prefered_items > 0:
                res[preference_key] = prefered_items
                updated = True

        if updated:
            with open("restaurants.json", "w", encoding="utf-8") as f:
                json.dump(restaurants, f, ensure_ascii=False, indent=2)

            # Re-filter after update
            filtered = (
                [r for r in restaurants if query in r["name"].lower()]
                if query
                else restaurants
            )
            filtered = [
                r
                for r in filtered
                if preference_key in r and r.get(preference_key, 0) != 0
            ]
            filtered.sort(key=lambda x: x.get(preference_key, 0), reverse=True)
            return jsonify(filtered)

        return jsonify(filtered)

    return jsonify(filtered)


@app.route("/api/restaurant")
def get_restaurant():
    place_id = request.args.get("placeid", "").lower()

    restaurant = next(
        (r for r in restaurants if r.get("place_id", "").lower() == place_id), None
    )

    if restaurant:
        return jsonify(restaurant)
    else:
        return jsonify({"error": "Restaurant not found"}), 404


if __name__ == "__main__":
    app.run(debug=True)
