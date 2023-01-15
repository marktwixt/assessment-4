const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

const { getCompliment, getFortune, createVision, deleteVision, highlightVision} = require('./controller')

app.get('/api/compliment', getCompliment);
app.get('/api/fortune', getFortune);
app.post('/api/visions', createVision);
app.delete('/api/visions/:id', deleteVision);
app.put('/api/visions/:id', highlightVision);
app.listen(5502, () => console.log("Server running on 5502"));