from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS

app = Flask(__name__, static_folder='static')
CORS(app)

# Route för frontend (index.html)
@app.route('/')
def serve_frontend():
    return send_from_directory(app.static_folder, 'index.html')

# API endpoint för att generera rekommendationer
@app.route('/generate-recommendation', methods=['POST'])
def generate_recommendation():
    data = request.get_json()
    user_preferences = data.get("preferences")

    # Exempel på rekommendationslogik
    recommendations = ["recommendation_1", "recommendation_2"]

    return jsonify({"recommendations": recommendations})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
