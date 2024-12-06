---

# My AI Music Search 🎵

Welcome to the **My AI Music Search** project! This application is a modern and interactive music discovery platform that allows users to search for tracks, view artist recommendations, and navigate through popular tracks. Powered by a robust backend and an intuitive frontend, this project is a one-stop solution for all your music exploration needs.

---

## Table of Contents
1. [About the Project](#about-the-project)
2. [Features](#features)
3. [Spotify Dataset](#spotify-dataset)
4. [Tech Stack](#tech-stack)
5. [Installation](#installation)
6. [Usage](#usage)
7. [API Endpoints](#api-endpoints)
8. [Folder Structure](#folder-structure)
9. [Contributing](#contributing)
10. [License](#license)

---

## About the Project

The **My AI Music Search** application leverages a Node.js backend, MongoDB for the database, and a React.js frontend to deliver a seamless user experience. The project allows users to:
- Search for their favorite songs or artists.
- Browse recommended tracks based on popularity or specific criteria.
- Navigate through a paginated list of tracks.

---

## Features

### User-Facing
- **Search Music**: Search for tracks or artists easily with an intuitive search interface.
- **Track Listings**: Browse paginated lists of tracks sorted by popularity.
- **Recommendations**: Get personalized recommendations based on the artist or song name.

### Backend
- **RESTful API**: A comprehensive API that supports CRUD operations for tracks and recommendations.
- **MongoDB Integration**: Efficient storage and querying of music data.

### Frontend
- **Responsive Design**: Optimized for both desktop and mobile users.
- **Interactive UI**: Smooth navigation and minimalistic design using React.js.

---

## Spotify Dataset

This project utilizes a **Spotify dataset** to power the music search and recommendations functionality. The dataset includes:
- **Track Information**: Names, IDs, durations, popularity scores, and explicit content flags.
- **Artist Information**: Names of the artists associated with each track.
- **Release Information**: Release dates and other metadata for the tracks.

### Source
The dataset is derived from Spotify’s public APIs and preprocessed for this project. It includes thousands of tracks and their metadata, enabling robust search and recommendation capabilities.

### Usage in the Project
1. **MongoDB Storage**: The Spotify dataset is imported into the MongoDB database.
2. **Search**: Tracks and artists are queried using regular expressions for partial matches.
3. **Recommendations**: Popularity scores and metadata are used to provide tailored recommendations.

---

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Other Tools**:
    - Mongoose (Object Data Modeling for MongoDB)
    - dotenv (Environment variable management)
    - CORS (Cross-Origin Resource Sharing)

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/)
- A package manager like `npm` or `yarn`.

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/my-ai-music-search.git
    ```
2. Navigate into the project directory:
    ```bash
    cd my-ai-music-search
    ```
3. Install dependencies for both the frontend and backend:
    ```bash
    npm install
    cd my-frontend
    npm install
    ```
4. Import the Spotify dataset into your MongoDB instance:
    - Place the dataset file (e.g., `spotify_dataset.json`) in the root directory.
    - Run the following command:
      ```bash
      mongoimport --db myDatabase --collection tracks --file spotify_dataset.json --jsonArray
      ```
5. Create a `.env` file in the root directory with the following:
    ```
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    ```
6. Start the application:
    ```bash
    npm start
    ```
7. Access the application in your browser at `http://localhost:3000`.

---

## Usage

### Run the Backend
- The backend server starts on `http://localhost:5000`.
- Use tools like Postman or a browser to test the API.

### Run the Frontend
- The React application starts on `http://localhost:3000`.

---

## API Endpoints

### Tracks API
- **GET** `/api/data/tracks?page=:page&limit=:limit`  
  Retrieves a paginated list of tracks.

- **POST** `/api/data/tracks/import`  
  Placeholder for track imports.

### Recommendations API
- **GET** `/api/recommendations?artist=:artist&name=:name`  
  Retrieves track recommendations based on artist or song name.

---

## Folder Structure

```
my-ai-music-search/
├── server.js             # Backend entry point
├── routes/               # API route definitions
├── controllers/          # Backend logic
├── models/               # MongoDB models
├── spotify_dataset.json  # Preprocessed Spotify dataset
├── my-frontend/          # React frontend code
│   ├── public/           # Static assets
│   ├── src/              # React source code
│       ├── components/   # React components
│       ├── pages/        # Page-level components
│       └── styles/       # CSS files
└── README.md             # Project documentation
```

---

## Contributing

We welcome contributions from the community! To contribute:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m "Add some feature"`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Open a pull request.

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

---

With the **Spotify Dataset** powering this application, music discovery has never been easier! 🎶

Happy Coding! 🚀