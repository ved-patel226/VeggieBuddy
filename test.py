data = [
    {
        "place_id": "ChIJsZJ8-ZD3wokRUmH0bUJycP0",
        "restaurant_name": "Bosino Ristorante Italiano",
        "veg_items": 14,
    },
    {
        "place_id": "ChIJmfDGXVhZwokRnTHcgVREIDQ",
        "restaurant_name": "Zapallar Restaurant & Bakery",
        "veg_items": 13,
    },
    {
        "place_id": "ChIJqRJTizv2wokRwg_FF-6pYuU",
        "restaurant_name": "Le Monde",
        "veg_items": 47,
    },
    {
        "place_id": "ChIJjUIzMYRYwokRpH6nkif-iZc",
        "restaurant_name": "Celeste",
        "veg_items": 31,
    },
    {
        "place_id": "ChIJzz0OMeL3wokRAlgHd26kHdM",
        "restaurant_name": "The Calaveras NYC",
        "veg_items": 11,
    },
    {
        "place_id": "ChIJz6VeesBYwokRNBYu4Sar8lw",
        "restaurant_name": "THEP Thai Restaurant",
        "veg_items": 22,
    },
    {
        "place_id": "ChIJywkmuxT3wokRvhtxFuVJqpE",
        "restaurant_name": "Mirak | Japanese Sushi Restaurant Fort Lee Cliffside Park, Edgewater, NJ | Korean foods",
        "veg_items": 36,
    },
    {
        "place_id": "ChIJ9blx6XNYwokR3NJv8zUIH2g",
        "restaurant_name": "GP's Restaurant",
        "veg_items": 9,
    },
    {
        "place_id": "ChIJ1aTnVyL2wokR2MfPI3FdsAg",
        "restaurant_name": "Osteria 106",
        "veg_items": 11,
    },
    {
        "place_id": "ChIJMRtWS2r2wokRu_wtCMfge6Y",
        "restaurant_name": "El Tina Harlem Restaurant",
        "veg_items": 27,
    },
    {
        "place_id": "ChIJYwAAe79YwokRAzRYCHUFTJY",
        "restaurant_name": "Boqueria UES",
        "veg_items": 3,
    },
    {
        "place_id": "ChIJ07eFHudZwokRZHgZ1U3eJYE",
        "restaurant_name": "Plum Vietnamese Restaurant",
        "veg_items": 12,
    },
    {
        "place_id": "ChIJg1c_sKT3wokRzd8fecOmgzs",
        "restaurant_name": "Ventanas Restaurant and Lounge",
        "veg_items": 7,
    },
    {
        "place_id": "ChIJFWvro7tYwokRhy_889mPgcg",
        "restaurant_name": "Heidelberg Restaurant",
        "veg_items": 9,
    },
    {
        "place_id": "ChIJ2yTMoxb2wokRixfwCY3ltok",
        "restaurant_name": "Lido Harlem Restaurant",
        "veg_items": 24,
    },
    {
        "place_id": "ChIJccb94CX2wokRETIajBqC4tE",
        "restaurant_name": "Flor de Mayo Restaurant",
        "veg_items": 12,
    },
    {
        "place_id": "ChIJtSHevTz2wokR1jY59paKMww",
        "restaurant_name": "Marlow Bistro",
        "veg_items": 15,
    },
    {
        "place_id": "ChIJb8Xw0wz2wokRXhp1-HSLvkI",
        "restaurant_name": "Sylvia's Restaurant",
        "veg_items": 4,
    },
    {
        "place_id": "ChIJZ-T1rL1YwokRFUejOu-J58g",
        "restaurant_name": "Thai At Lex",
        "veg_items": 21,
    },
    {
        "place_id": "ChIJz6dyp2P2wokRiQdayjc8crQ",
        "restaurant_name": "Caridad Restaurant",
        "veg_items": 10,
    },
    {
        "place_id": "ChIJq6rqPh_0wokRYx9DPUPrCJs",
        "restaurant_name": "Jalao NYC",
        "veg_items": 5,
    },
    {
        "place_id": "ChIJm8GloepYwokRKQQXHlt9X9w",
        "restaurant_name": "EJ's Luncheonette",
        "veg_items": 120,
    },
    {
        "place_id": "ChIJCd1ezxBYwokRIMG7V0JilfA",
        "restaurant_name": "Extra Super Restaurant",
        "veg_items": 3,
    },
    {
        "place_id": "ChIJ7wBO30H2wokR1yFm2_zfDVE",
        "restaurant_name": "El Porton",
        "veg_items": 12,
    },
    {
        "place_id": "ChIJuaWAiHtZwokRT_wcvX3pSPE",
        "restaurant_name": "Paola's Osteria",
        "veg_items": 16,
    },
    {
        "place_id": "ChIJzZWd-cf3wokRHe1cNRQN1BE",
        "restaurant_name": "Del Valle",
        "veg_items": 1,
    },
    {
        "place_id": "ChIJVZRotpf0wokRYqbfByWZ5uo",
        "restaurant_name": "Fine Food Cuisine",
        "veg_items": 12,
    },
    {
        "place_id": "ChIJRzDIvA1YwokRg6FuNHZEK2I",
        "restaurant_name": "Pio Pio Cafe & Restaurant 63",
        "veg_items": 26,
    },
    {
        "place_id": "ChIJB1H-kopYwokRbuCvsBUUkaM",
        "restaurant_name": "Westside Restaurant",
        "veg_items": 79,
    },
]

import json

with open("restaurants.json", "r") as f:
    target_data = json.load(f)

inject_data = json.load(data)[0]


inject_place_ids = {item["place_id"]: item["veg_items"] for item in data}

for res in target_data[0]:
    place_id = res.get("place_id")
    res["veg_items"] = inject_place_ids.get(place_id, 0)
