import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Typography,
    TextField,
    Button,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import '../Recommendations.css'; // Korrekt sökväg

const Recommendations = () => {
    const [artist, setArtist] = useState('');
    const [name, setName] = useState('');
    const [popularity, setPopularity] = useState('');
    const [releaseDate, setReleaseDate] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoading(true);
            try {
                const queryParams = new URLSearchParams();
                if (artist) queryParams.append('artist', artist);
                if (name) queryParams.append('name', name);
                if (popularity) queryParams.append('popularity', popularity);
                if (releaseDate) queryParams.append('releaseDate', releaseDate);

                const response = await fetch(
                    `http://localhost:5000/api/recommendations?${queryParams}`
                );

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to fetch recommendations');
                }

                const data = await response.json();
                setRecommendations(data);
                setError('');
            } catch (error) {
                setRecommendations([]);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRecommendations();
    }, [artist, name, popularity, releaseDate]);

    return (
        <Container maxWidth="sm" sx={{ mt: 5 }}>
            <Typography variant="h4" align="center" gutterBottom>
                Rekommenderade låtar
            </Typography>
            <Typography variant="body1" align="center" gutterBottom>
                Fyll i ett eller flera filter för att hitta låtar.
            </Typography>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { mb: 2 },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField
                    fullWidth
                    label="Artist"
                    value={artist}
                    onChange={(e) => setArtist(e.target.value)}
                    placeholder="Ange artistnamn"
                />
                <TextField
                    fullWidth
                    label="Låtnamn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ange låtnamn"
                />
                <TextField
                    fullWidth
                    label="Popularitet"
                    type="number"
                    inputProps={{ min: 0, max: 100 }}
                    value={popularity}
                    onChange={(e) => setPopularity(e.target.value)}
                    placeholder="0-100"
                />
                <TextField
                    fullWidth
                    label="Utgivningsdatum"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                    placeholder="ÅÅÅÅ-MM-DD"
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => setRecommendations([])}
                >
                    Töm filter
                </Button>
            </Box>
            {loading ? (
                <CircularProgress sx={{ display: 'block', mx: 'auto', my: 3 }} />
            ) : error ? (
                <Typography color="error" align="center">
                    {error}
                </Typography>
            ) : recommendations.length > 0 ? (
                <List>
                    {recommendations.map((track) => (
                        <ListItem key={track._id} sx={{ borderBottom: '1px solid #ddd' }}>
                            <ListItemText
                                primary={`${track.name} - ${track.artists?.join(', ')}`}
                                secondary={`Popularitet: ${track.popularity}, Släppt: ${track.releaseDate}`}
                            />
                        </ListItem>
                    ))}
                </List>
            ) : (
                <Typography align="center">Inga låtar hittades. Justera dina filter och försök igen.</Typography>
            )}
        </Container>
    );
};

export default Recommendations;
