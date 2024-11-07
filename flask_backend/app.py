import pandas as pd
from flask import Flask, request, jsonify, render_template
from flask_cors import CORS

app = Flask(__name__, template_folder="templates", static_folder="static")
CORS(app)

# Ladda in datan från CSV-filerna
artists_file = "C:/Users/andre/Documents/MyNodeProject/spotify_dataset/artists.csv"
tracks_file = "C:/Users/andre/Documents/MyNodeProject/spotify_dataset/tracks.csv"

try:
    artists_df = pd.read_csv(artists_file)
    tracks_df = pd.read_csv(tracks_file)
    print("Datasets inlästa.")
except FileNotFoundError:
    artists_df = None
    tracks_df = None
    print("En eller båda av CSV-filerna hittades inte.")

# Route för att visa startsidan `index.html`
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
        tracks_data = tracks_df.head(10).to_dict(orient='records')
        return jsonify(tracks_data)
    except Exception as e:
        return jsonify({"error": str(e)})

# API-endpoint för att generera rekommendationer
@app.route('/generate-recommendation', methods=['POST'])
def generate_recommendation():
    data = request.get_json()
    user_preferences = data.get("preferences", [])

    if tracks_df is not None:
        # Kontrollera att kolumnen "genre" finns i datasetet
        if 'genre' in tracks_df.columns:
            # Filtrera datasetet baserat på användarens preferenser (förväntar att kolumnen heter "genre")
            recommendations = tracks_df[tracks_df['genre'].isin(user_preferences)].head(5)
            # Kontrollera att kolumnen "title" finns
            if 'title' in tracks_df.columns:
                recommendations_list = recommendations['title'].tolist()
            else:
                recommendations_list = ["'title' column not found in dataset."]
        else:
            recommendations_list = ["'genre' column not found in dataset."]
    else:
        recommendations_list = ["No recommendations available (dataset not loaded)"]

    return jsonify({"recommendations": recommendations_list})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
