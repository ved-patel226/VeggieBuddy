from flask import Flask, request, jsonify
from flask_cors import CORS
import json

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


@app.route("/api/restaurants2")
def get_restaurants2():
    query = request.args.get("q", "").lower()
    filtered = (
        [r for r in restaurants if query in r["name"].lower()] if query else restaurants
    )
    filtered.sort(key=lambda x: x.get("rating", 0), reverse=True)

    relevent_resturuant = filtered[0]
    place_id = relevent_resturuant["place_id"]

    return jsonify(relevent_resturuant)


if __name__ == "__main__":
    app.run(debug=True)
