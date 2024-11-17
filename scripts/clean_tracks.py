import pandas as pd
import json

# Ange filvägar
input_file = "./spotify_dataset/tracks.csv"
output_file = "./spotify_dataset/cleaned_tracks.csv"

def rensa_artists_fält(artists_field):
    try:
        cleaned_field = artists_field.replace("'", '"')
        parsed_json = json.loads(cleaned_field)
        return json.dumps(parsed_json)
    except Exception as e:
        print(f"Ogiltigt JSON-format i artists: {artists_field}. Fel: {e}")
        return '[]'

def rensa_raden(row):
    if pd.isna(row['id']):
        row['id'] = "unknown_id"

    if 'artists' in row and isinstance(row['artists'], str):
        row['artists'] = rensa_artists_fält(row['artists'])

    return row

try:
    print("Läser in filen...")
    df = pd.read_csv(input_file)
    print("Rensar data...")
    df = df.apply(rensa_raden, axis=1)
    print("Sparar rensad data...")
    df.to_csv(output_file, index=False)
    print(f"Rensad data sparad i: {output_file}")
except Exception as e:
    print(f"Ett fel uppstod under bearbetningen: {e}")
