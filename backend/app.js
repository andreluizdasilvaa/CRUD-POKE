const express = require('express');
const dotenv = require('dotenv').config();
const { PrismaClient } = require('@prisma/client');
const cors = require('cors');
const path = require('path');
const crypto = require('crypto');
// Para criptografar e descriptografar id's
const { incrypt, decrypt } = require('./middleware/cryptog')

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // permite o express entenda dados de formulario html
app.use(cors());

app.use(express.static(path.join(__dirname, "..", "frontend")));

// =-=-=-=-=-=-=-=-=-=-=-=-=- | GET | =-=-=-=-=-=-=-=-=-=-=-=-=-
app.get('/pokefeed', async (req, res)=> {
    try {
        const pokemons = await prisma.pokemon.findMany();

        // para cada objeto dentro dessa lista(array), vou executar esse comando
        for(let poke of pokemons) {
            var id = String(poke.id);
            var idCript = incrypt(id); // aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            poke.id = idCript;
        }

        res.status(201).json(pokemons);
        
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

app.delete('/delete/pokemon', async (req, res)=> {
    try {
        const { id } = req.body;

        if(!id) {
            res.status(400).send('ID necessário.')
        }

        // Descriptografa o id
        const idDescriptado = decrypt(id);
        console.log('Id descryptografado: ',idDescriptado);

        const pokemon = await prisma.pokemon.delete({
            where: {
                id: parseInt(idDescriptado),
            },
        });

        if (!pokemon) {
            res.status(404).send('Pokemon não encontrado.');
        };

        return res.status(200).send('Pokemon deletado com sucesso!');
    } catch (error) {
        console.error('Erro ( delete/pokemon ): ', error)
    }

})

const PORT = process.env.PORT || 4000;
app.listen(PORT, ()=> {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});