import pandas as pd

# Ange filvägar
input_file = "./spotify_dataset/cleaned_tracks.csv"
output_file = "./spotify_dataset/filtered_tracks.csv"

print("Läser in filen...")
df = pd.read_csv(input_file)

# Kontrollera om nödvändiga kolumner finns
required_columns = ['id', 'name', 'duration_ms']
missing_columns = [col for col in required_columns if col not in df.columns]

if missing_columns:
    print(f"Kolumnnamn i filen: {df.columns.tolist()}")
    raise KeyError(f"Dessa kolumner saknas i filen: {missing_columns}")

# Filtrera bort rader där nödvändiga kolumner saknas
print("Filtrerar bort ogiltiga rader...")
filtered_df = df.dropna(subset=required_columns)

# Byt namn på duration_ms till duration om det behövs
filtered_df.rename(columns={'duration_ms': 'duration'}, inplace=True)

# Spara den filtrerade filen
print("Sparar filtrerad data...")
filtered_df.to_csv(output_file, index=False)
print(f"Klart! Ursprungliga rader: {len(df)}, filtrerade rader: {len(filtered_df)}")
