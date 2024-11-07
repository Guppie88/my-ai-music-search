from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import pandas as pd

app = Flask(__name__, template_folder="../templates")  # Specificera template-sökväg
CORS(app)

# Ladda in datan från CSV-filerna i `spotify_dataset`
dataset_path = "C:/Users/andre/Documents/MyNodeProject/spotify_dataset/tracks.csv"

try:
    dataset = pd.read_csv(dataset_path)
    print("Dataset inläst.")
except FileNotFoundError:
    dataset = None
    print(f"Dataset not found. Make sure '{dataset_path}' is in the correct location.")

# Route för att visa startsidan `index.html`
@app.route('/')
def serve_frontend():
    return render_template('index.html')

# API-endpoint för att generera rekommendationer
@app.route('/generate-recommendation', methods=['POST'])
def generate_recommendation():
    data = request.get_json()
    user_preferences = data.get("preferences", [])

    if dataset is not None:
        # Filtrera datasetet baserat på användarens preferenser (förväntar att kolumnen heter "genre")
        recommendations = dataset[dataset['genre'].isin(user_preferences)].head(5)
        recommendations_list = recommendations['title'].tolist()  # Justera om kolumnen heter något annat
    else:
        recommendations_list = ["No recommendations available (dataset not loaded)"]

    return jsonify({"recommendations": recommendations_list})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
