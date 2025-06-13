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
    # Exclude restaurants with veg_items == 0 if the key exists
    filtered = [r for r in filtered if r.get("veg_items", 1) != 0]
    filtered.sort(key=lambda x: x.get("veg_items", 0), reverse=True)

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
