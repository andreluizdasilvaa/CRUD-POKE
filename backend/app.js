const express = require('express');
const dotenv = require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();
app.use(express.json());

// =-=-=-=-=-=-=-=-=-=-=-=-=- | POST | =-=-=-=-=-=-=-=-=-=-=-=-=-



// =-=-=-=-=-=-=-=-=-=-=-=-=- | GET | =-=-=-=-=-=-=-=-=-=-=-=-=-

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});