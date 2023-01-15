const visions = require('./db.json')
let visionID = 1;

module.exports = {

    getCompliment: (req, res) => {
        const compliments = ["Gee, you're a smart cookie!", "Cool shirt!", "Your Javascript skills are stellar."];
      
        let randomIndex = Math.floor(Math.random() * compliments.length);
        let randomCompliment = compliments[randomIndex];
      
        res.status(200).send(randomCompliment);
    },

    getFortune: (req, res) => {
        const fortunes = ["Do or do not, there is no try.",
    "To give anything less than your best is to sacrifice the gift.", 
    "No one with a good car needs to be justified.",
    "You are what you eat.", "Patience is a virtue."];

    let randomIndex = Math.floor(Math.random() * fortunes.length);
    let randomFortune = fortunes[randomIndex];

    res.status(200).send(randomFortune);
    },
    createVision: (req,res) => {
        const {vision} = req.body;
        let newVision = {
            id: visionID,
            vision: vision,
            color: 'white'
        }
        visions.push(newVision)
        visionID++
        res.status(200).send(visions)
    },
    highlightVision: (req,res) => {
        const {type} = req.body;
        let index = visions.findIndex(elem => elem.id == +req.params.id);
        if (type == 'blue') {
            visions[index].color = 'blue'
            res.status(200).send(visions);
        }else if (type == 'blueviolet') {
            visions[index].color = 'blueviolet'
            res.status(200).send(visions);
        }else {}
    },
    deleteVision: (req,res) => {
        let index = visions.findIndex(elem => elem.id == +req.params.id);
        visions.splice(index, 1);
        res.status(200).send(visions)
    }
}