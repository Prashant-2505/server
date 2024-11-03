// app.js
const express = require('express');
const sequelize = require('./config/db');
const authRoute = require('./routes/authRoute')
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors())


// Sync the database
sequelize.sync()
    .then(() => {
        console.log('Database & tables created!');
    })
    .catch(err => {
        console.error('Error creating database tables:', err);
    });


app.use('/api/auth', authRoute);

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
