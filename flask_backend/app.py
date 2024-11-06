from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/generate-recommendation": {"origins": "http://127.0.0.1:8083"}})  # Specifik endpoint och ursprung

@app.route('/generate-recommendation', methods=['POST'])
def generate_recommendation():
    data = request.get_json()
    user_preferences = data.get("preferences")
    recommendations = ["recommendation_1", "recommendation_2"]
    return jsonify({"recommendations": recommendations})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
