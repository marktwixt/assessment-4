const visionsContainer = document.querySelector('#visions-container')
const form = document.querySelector('form')

const complimentBtn = document.getElementById("complimentButton")
const fortuneBtn = document.getElementById("fortuneButton")


const errCallback = err => console.log(err)

const baseURL = `http://localhost:5502/api/visions`

const visionsCallback = ({ data: visions }) => displayVisions(visions)
const createVision = body => axios.post(baseURL, body).then(visionsCallback).catch(errCallback)
const deleteVision = id => axios.delete(`${baseURL}/${id}`).then(visionsCallback).catch(errCallback)
const highlightVision = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(visionsCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()
    let newVision = document.querySelector('#visionInput')
    let bodyObj = {
        vision: newVision.value
    }
    createVision(bodyObj)
    newVision.value = '';
}

function createVisionCard(vision) {
    const visionCard = document.createElement('div')
    if (vision.color == 'blue') {
        visionCard.classList.add('blue');
    }
    else if (vision.color == 'blueviolet'){
        visionCard.classList.add('blueviolet');
    }
    visionCard.classList.add('vision-card')
    visionCard.innerHTML = `<li>${vision.vision}</li>
    <div class="btns-container">
    </div>
    <button onclick="deleteVision(${vision.id})">Remove</button>
    <button onclick="highlightVision(${vision.id}, 'blue')">In Progress</button>
    <button onclick="highlightVision(${vision.id}, 'blueviolet')">Done</button>
    `
    visionsContainer.appendChild(visionCard);
}

const getCompliment = () => {
    axios.get("http://localhost:5502/api/compliment/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};

const getFortune = () => {
    axios.get("http://localhost:5502/api/fortune/")
        .then(res => {
            const data = res.data;
            alert(data);
    });
};
function displayVisions(arr) {
    visionsContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createVisionCard(arr[i])
    }
}
complimentBtn.addEventListener('click', getCompliment)
fortuneBtn.addEventListener('click', getFortune)
form.addEventListener('submit', submitHandler)