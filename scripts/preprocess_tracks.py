import pandas as pd

# Ange filvägar
input_file = "./spotify_dataset/cleaned_tracks.csv"
output_file = "./spotify_dataset/preprocessed_tracks.csv"

print("Läser in filen...")
df = pd.read_csv(input_file)

# Kontrollera om 'duration_ms' finns i filen
if 'duration_ms' in df.columns:
    # Byt namn på 'duration_ms' till 'duration'
    print("Omvandlar 'duration_ms' till 'duration'...")
    df.rename(columns={'duration_ms': 'duration'}, inplace=True)

    # Spara den omvandlade filen
    print("Sparar den omvandlade filen...")
    df.to_csv(output_file, index=False)
    print(f"Fil sparad som: {output_file}")
else:
    print("Kolumn 'duration_ms' saknas i filen. Kontrollera CSV-filen.")
