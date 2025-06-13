import requests
import time
import json

from dotenv import load_dotenv
import os

load_dotenv()

API_KEY = os.environ["GOOGLE_PLACE_API_KEY"]
LOCATION = "40.8154,-73.9580"  # Approximate center of Upper Manhattan
RADIUS = 5000  # in meters (max for Places API is 50,000)
TYPE = "restaurant"
RESULTS = []


def get_restaurants(api_key, location, radius, type_, max_results=100):
    url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"
    params = {
        "key": api_key,
        "location": location,
        "radius": radius,
        "type": type_,
        "keyword": "-hotel",  # Exclude results with 'hotel' in the name
    }
    results = []
    while len(results) < max_results:
        response = requests.get(url, params=params)
        data = response.json()
        results.extend(data.get("results", []))
        if "next_page_token" in data and len(results) < max_results:
            time.sleep(2)  # Google requires a short delay before using next_page_token
            params = {"key": api_key, "pagetoken": data["next_page_token"]}
        else:
            break
    return results[:max_results]


if __name__ == "__main__":
    restaurants = get_restaurants(API_KEY, LOCATION, RADIUS, TYPE, 100)
    with open("restaurants.json", "w", encoding="utf-8") as f:
        json.dump(restaurants, f, ensure_ascii=False, indent=2)
