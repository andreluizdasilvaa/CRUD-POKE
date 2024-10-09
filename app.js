const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();
const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.json({ msg: "asdasdsdsad"})
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}´`);
});