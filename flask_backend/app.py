import pandas as pd
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__, template_folder="templates", static_folder="static")
CORS(app)

# Filvägar för CSV-filer
artists_file = "C:/Users/andre/Documents/MyNodeProject/flask_backend/spotify_dataset/artists.csv"
tracks_file = "C:/Users/andre/Documents/MyNodeProject/flask_backend/spotify_dataset/tracks.csv"

# Försök att läsa in datasets och visa information
try:
    artists_df = pd.read_csv(artists_file)
    tracks_df = pd.read_csv(tracks_file)
    print("Datasets inlästa.")
    print(f"Antal rader i artists_df: {len(artists_df)}")
    print(f"Antal rader i tracks_df: {len(tracks_df)}")
except FileNotFoundError:
    artists_df = None
    tracks_df = None
    print("En eller båda av CSV-filerna hittades inte.")

# Kontrollera att "genres" och "id_artists" finns i datasets och slå samman data
if artists_df is not None and tracks_df is not None:
    # Lägg till genre från artistdata till spårdata
    merged_df = tracks_df.merge(artists_df[['id', 'genres']], left_on='id_artists', right_on='id', how='left')
    merged_df['genres'] = merged_df['genres'].fillna('Unknown')
    print("Genrer tillagda till tracks_df via artistdata.")
else:
    merged_df = None  # Om sammanfogningen misslyckas

# Route för startsidan
@app.route('/')
def home():
    return render_template('index.html')

# Endpoint för att få artistdata
@app.route('/artists', methods=['GET'])
def get_artists():
    try:
        artists_data = artists_df.head(10).to_dict(orient='records')
        return jsonify(artists_data)
    except Exception as e:
        return jsonify({"error": str(e)})

# Endpoint för att få låtdata
@app.route('/tracks', methods=['GET'])
def get_tracks():
    try:
        tracks_data = merged_df.head(10).to_dict(orient='records')
        return jsonify(tracks_data)
    except Exception as e:
        return jsonify({"error": str(e)})

# API-endpoint för att generera rekommendationer baserat på användarens preferenser
@app.route('/generate-recommendation', methods=['POST'])
def generate_recommendation():
    data = request.get_json()
    user_preferences = data.get("preferences", [])

    recommendations_list = []
    if merged_df is not None and 'genres' in merged_df.columns:
        # Filtrera baserat på användarens genrer
        filtered_tracks = merged_df[merged_df['genres'].apply(lambda x: any(genre in x for genre in user_preferences))]
        recommendations_list = filtered_tracks['name'].head(10).tolist()
    else:
        recommendations_list = ["Genre information not available in dataset."]

    return jsonify({"recommendations": recommendations_list})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
