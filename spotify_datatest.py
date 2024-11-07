import pandas as pd

# Ange filvägarna
artists_file = "C:/Users/andre/Documents/MyNodeProject/spotify_dataset/artists.csv"
tracks_file = "C:/Users/andre/Documents/MyNodeProject/spotify_dataset/tracks.csv"

# Läs in artists.csv-filen
try:
    artists_df = pd.read_csv(artists_file)
    print("Artists data inläst:")
    print(artists_df.head())  # Visar de första raderna
except FileNotFoundError:
    print("artists.csv-filen hittades inte.")

# Läs in tracks.csv-filen
try:
    tracks_df = pd.read_csv(tracks_file)
    print("Tracks data inläst:")
    print(tracks_df.head())  # Visar de första raderna
except FileNotFoundError:
    print("tracks.csv-filen hittades inte.")
