const express = require("express");
const { getwelcome, getcharacters, getcharacterById, getchardcreate, putEdit, deleteCharacter } = require("./controller/characterController");
const app = express();

app.use(express.json());

app.get('/', getwelcome);
 
app.get('/characters', getcharacters);
    
app.get('/characters/:id', getcharacterById);

app.post('/characters', getchardcreate);

app.put('/characters/:id', putEdit);

app.delete('/characters/:id', deleteCharacter), 


app.listen(3000, () => console.log("Server listening on port 3000"));
