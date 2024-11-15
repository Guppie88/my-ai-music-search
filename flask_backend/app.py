import pandas as pd
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import ast

app = Flask(__name__, template_folder="templates", static_folder="static")
CORS(app)

# Definiera sökvägarna till CSV-filerna
artists_file = "spotify_dataset/artists.csv"
tracks_file = "spotify_dataset/tracks.csv"

# Ladda in artists.csv och tracks.csv
try:
    artists_df = pd.read_csv(artists_file)
    tracks_df = pd.read_csv(tracks_file)
    print("Datasets inlästa.")
    print(f"Antal rader i artists_df: {len(artists_df)}")
    print(f"Antal rader i tracks_df: {len(tracks_df)}")

    # Omvandla genresträngar till listor för enklare bearbetning
    artists_df['genres'] = artists_df['genres'].apply(lambda x: ast.literal_eval(x) if isinstance(x, str) else [])

    # Skapa en ordbok som mappar artist-ID till deras genre
    artist_genre_map = artists_df.set_index('id')['genres'].to_dict()

    # Tillägg av genrer till tracks_df baserat på artistens ID
    tracks_df['genres'] = tracks_df['id_artists'].apply(
        lambda x: artist_genre_map.get(ast.literal_eval(x)[0], []) if isinstance(x, str) else [])

    print("Genrer tillagda till tracks_df via artistdata.")
    print(tracks_df[['name', 'genres']].head(10))  # Visa de första 10 raderna för att kontrollera
except FileNotFoundError:
    artists_df = None
    tracks_df = None
    print("En eller båda av CSV-filerna hittades inte.")

# Route för att visa startsidan `index.html`
@app.route('/')
def home():
    return render_template('index.html')

# Route för att visa unika genrer i datasetet
@app.route('/available-genres', methods=['GET'])
def available_genres():
    if tracks_df is not None and 'genres' in tracks_df.columns:
        unique_genres = tracks_df['genres'].explode().unique()
        return jsonify({"available_genres": unique_genres.tolist()})
    else:
        return jsonify({"error": "Genres column not found in dataset."})

# Endpoint för att generera rekommendationer baserat på användarens genrepreferenser
@app.route('/generate-recommendation', methods=['POST'])
def generate_recommendation():
    data = request.get_json()
    user_preferences = data.get("preferences", [])

    if tracks_df is not None:
        # Filtrera låtar baserat på användarens genrepreferenser
        recommendations = tracks_df[tracks_df['genres'].apply(
            lambda genres: any(pref in genres for pref in user_preferences))]

        if not recommendations.empty:
            recommendations_list = recommendations['name'].tolist()
        else:
            recommendations_list = ["No recommendations found for the selected genres."]
    else:
        recommendations_list = ["No recommendations available (dataset not loaded)"]

    return jsonify({"recommendations": recommendations_list})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
