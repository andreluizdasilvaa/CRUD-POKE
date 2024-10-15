const express = require('express');
const dotenv = require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const path = require('path');


const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // permite o express entenda dados de formulario html
app.use(cors());

app.use(express.static(path.join(__dirname, "..", "frontend")));

// =-=-=-=-=-=-=-=-=-=-=-=-=- | GET | =-=-=-=-=-=-=-=-=-=-=-=-=-
app.get('/pokefeed', async (req, res)=> {
    try {
        const poke = await prisma.pokemon.findMany();

        res.status(201).json(poke);
        
    } catch (error) {
        console.error('ERROR: ', error);
    }
})

// rota get exibir os pkemons em json + tratar no front

// =-=-=-=-=-=-=-=-=-=-=-=-=- | POST | =-=-=-=-=-=-=-=-=-=-=-=-=-
app.post('/register', async (req, res)=> {
    try {
        const { nome, tipo, url_img } = req.body;

        if (!nome || !tipo || !url_img) {
            res.json({ msg: "Dados faltantes" }).end();
        };

        const pokemon = await prisma.pokemon.create({
            data: {
                name: nome,
                tipo: tipo,
                url_image: url_img,
            },
        });
        res.status(201).json({ msg: "Pokeon registrado com sucesso!"});
    } catch (error) {
        console.error('ERROR: ', error);
    };
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});