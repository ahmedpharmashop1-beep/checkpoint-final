const express = require('express');

const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./config/connectDB');
const userRoutes = require('./routes/user');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connexion DB
connectDB();

// Routes
app.use('/api/user', userRoutes);
app.use('/api/food', require('./routes/food'));

// Route test
app.get('/', (req, res) => {
  res.send('API is running...');
});


const PORT = process.env.PORT || 7000;
// Démarrage du serveur 
app.listen(PORT,error=>{
error? console.error("Server failed to start", error) : console.log(`Server is running on port ${PORT}`);
});