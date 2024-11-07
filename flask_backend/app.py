from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import pandas as pd

app = Flask(__name__, static_folder='static')
CORS(app)

# Läs in datasetet (exempel: ett CSV-fil som ligger i samma mapp eller i 'static' om du vill)
# Tänk på att justera sökvägen om datasetet ligger någon annanstans
try:
    dataset = pd.read_csv('static/data/music_data.csv')  # Se till att filen finns på rätt plats
except FileNotFoundError:
    dataset = None
    print("Dataset not found. Make sure 'music_data.csv' is in the correct location.")

# Route för att servera frontend-filen `index.html`
@app.route('/')
def serve_frontend():
    return send_from_directory(app.static_folder, 'index.html')

# API endpoint för att generera rekommendationer baserade på användarens preferenser
@app.route('/generate-recommendation', methods=['POST'])
def generate_recommendation():
    data = request.get_json()
    user_preferences = data.get("preferences")

    # Om datasetet finns, filtrera det baserat på användarens preferenser
    if dataset is not None:
        recommendations = dataset[dataset['genre'].isin(user_preferences)].head(5)
        recommendations_list = recommendations['title'].tolist()  # Antag att kolumnen med låttitlar heter 'title'
    else:
        recommendations_list = ["No recommendations available (dataset not loaded)"]

    return jsonify({"recommendations": recommendations_list})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
