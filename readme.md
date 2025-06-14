<div align="center">
  <img src="docs/assets/veggiebuddy-logo.png" alt="VeggieBuddy Logo" width="200" height="200" />
  <h1>VeggieBuddy 🥗</h1>
  
  <p>Discover vegetarian-friendly restaurants with ease</p>

  <p>
    <a href="https://mit-license.org/" target="_blank">
      <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
    </a>
    <img alt="Python" src="https://img.shields.io/badge/Python-3.8+-blue.svg" />
    <img alt="PRs Welcome" src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" />
  </p>
</div>

## 📋 Overview

VeggieBuddy is a web application that helps you discover the best vegetarian-friendly restaurants near you. With smart, personalized recommendations based on your location and preferences, it makes finding meat-free meals easy and stress-free. Whether you're a lifelong vegetarian or just exploring plant-based options, VeggieBuddy connects you to spots you'll love.

## ✨ Features

- **Location-based search**: Find vegetarian restaurants in your area
- **Personalized recommendations**: Get suggestions based on your preferences
- **Detailed restaurant information**: View menus, ratings, reviews, and more

## 🖼️ Screenshots

<div align="center">
  <img src="docs/assets/screenshot-home.png" alt="Home Page" width="45%" />
  <img src="docs/assets/screenshot-results.png" alt="Search Results" width="45%" />
</div>

## 🔧 Technologies

- **Frontend**: HTML, CSS, TypeScript, React
- **Backend**: Python, Flask
- **Database**: MongoDB
- **APIs**: Google Maps Places API

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- pip
- Node.js and npm (for frontend)
- MongoDB (local or Atlas)

### Installation

1. Clone the repository:

```sh
git clone https://github.com/ved-patel226/veggiebuddy.git
cd veggiebuddy
```

2. Install backend dependencies:

```sh
pip install -r requirements.txt
```

3. Install frontend dependencies:

```sh
cd frontend
npm install
```

4. Set up environment variables:

```sh
cp .env.example .env
# Edit .env with your API keys and database credentials
```

## 🔍 Usage

1. Start the backend server:

```sh
python ./backend/main.py
```

2. In a separate terminal, start the frontend:

```sh
cd frontend
npm start
```

3. Navigate to `http://localhost:3000` in your browser

## 📚 API Documentation

The VeggieBuddy API is available at `http://127.0.0.1:3000/`

| Endpoint              | Method | Description                    |
| --------------------- | ------ | ------------------------------ |
| `/restaurants`        | GET    | Get all restaurants            |
| `/restaurants/:id`    | GET    | Get restaurant by ID           |
| `/restaurants/search` | GET    | Search restaurants by criteria |
| `/users/profile`      | GET    | Get current user profile       |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

See the [contributing guide](CONTRIBUTING.md) for detailed instructions.

## 👨‍💻 Authors

- [@ved-patel226](https://github.com/ved-patel226)
- [@Vedant-Daga-Codes](https://github.com/Vedant-Daga-Codes)

## 📝 License

Copyright © 2025 [Ved Patel & Vedant Daga](https://github.com/ved-patel226).<br />
This project is [MIT](https://mit-license.org/) licensed.
