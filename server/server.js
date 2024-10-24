import express from 'express';
import mongoose from 'mongoose';

const app = express();

// Flytta PORT-hanteringen högre upp i filen och sätt en standardport
const PORT = process.env.PORT || 3000;

// Din route för startsidan
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// För att undvika fel "address already in use", kontrollera att servern inte redan körs
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Anslut till MongoDB (förutsatt att detta är korrekt inställt)
mongoose.connect('mongodb://localhost:27017/mydatabase')
    .then(() => console.log('Connected to MongoDB!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Exportera appen så att den kan användas i tester
export default app;
