const express = require("express");
const app = express();
const characters = require('./db');

app.get('/', (req, res)=> {
    res.send({
        status: 200,
        msg: "Bienvenidos a la API REST de Breaking Bad" 
    });
});

app.get('/characters', (req, res) => {
    const {status} = req.query;
    if(!status) return res.json(characters);
    else {
        const filterCharact = characters.filter(
            (c) => c.status.toLowerCase() === status.toLowerCase()
        );
            
            if(filterCharact.length) return res.send(filterCharact);

            res.status(404).send({ msg: 'Character no found' })
    }

    res.json(characters);
});

app.get('/characters/:id', (req, res) => {
    //const id = request.params.id;
    const {id} = req.params;
    const found = characters.find((c) => c.char_id === parseInt(id));

    if(found) return res.json(found);
    
    res.json({ msg: 'Character not found'});
});

app.listen(3000, () => console.log("Server listening on port 3000"));
