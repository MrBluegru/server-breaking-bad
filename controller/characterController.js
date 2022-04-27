let characters = require('../db');


const getwelcome = (req, res) => {
  const {
    access
  } = req.body;

  if (access < 5) return res.status(401).json({
    msg: "Error, access denied"
  });
  else
    res.send({
      status: 200,
      msg: "Bienvenidos a la API REST de Breaking Bad"
    });
};


const getcharacters = (req, res) => {
  const {
    status
  } = req.query;
  if (!status) return res.json(characters);
  else {
    const filterCharact = characters.filter(
      (c) => c.status.toLowerCase() === status.toLowerCase()
    );

    if (filterCharact.length) return res.send(filterCharact);

    res.status(404).send({
      msg: 'Character no found'
    });
  }

};


const getcharacterById = (req, res) => {
  //const id = request.params.id;
  const {id} = req.params;
  const found = characters.find((c) => c.char_id === parseInt(id));

  if(found) return res.json(found);
  
  res.json({ msg: 'Character not found'});

};

let char_id = 116;

const getchardcreate = (req, res)=> {
  const {name, birthday, status} = req.body;

  if(!name || !birthday || !status){
      return res.status(400).json({msg: 'No valido, faltan valores...'}) 
  }

  const chard = {
      char_id: ++char_id,
      name,
      birthday,
      status
  };
  characters.push(chard);

  res.json({msg:'Character Created'});
};

const putEdit = (req, res)=>{
  const {id} = req.params;
  const {name, birthday, status} = req.body;

  const found = characters.find((c)=>c.char_id === parseInt(id));

  if(!found) return res.status(404).res.json({ msg: 'Character not found'});

  found.name = name;
  found.birthday = birthday;
  found.status = status;

  res.json({ msg: "Character edited"});

};

const deleteCharacter = (req, res) => {

  const {id} = req.params;

  const filtercharact = characters.finter((c)=>c.char_id !== parseInt(id));
  characters = [...filtercharact];

  res.json({ msg: "Charcter deleted"});
};



module.exports = {
  getwelcome,
  getcharacters,
  getcharacterById,
  getchardcreate,
  putEdit,
  deleteCharacter
};