const express = require("express");
const app = express();
const morgan = require("morgan");
app.use(express.json());
const cors = require("cors");
app.use(cors());

app.use(express.static("dist"));

morgan.token("body", function(req, res){ return JSON.stringify(req.body)})
let logger = morgan(":method :url :status :res[content-length] - :response-time ms :body")

app.use(logger);

let persons = [
    {
        "id": 1,
        "name": "Arto Hellas",
        "number": "040-123456"
    },
    {
        "id": 2,
        "name": "Ada Lovelace",
        "number": "39-44-5323523"
    },
    {
        "id": 3,
        "name": "Dan Abramov",
        "number": "12-43-234345"
    },
    {
        "id": 4,
        "name": "Mary Poppendieck",
        "number": "39-23-6423122"
    }
];

app.get("/api/persons", (request, response) => {
    response.json(persons);
})

app.get("/info", (req, res) => {
    res.send(`
     <p>Phonebook has infor for ${persons.length} people</p>
     <p>${new Date()}</p>
    `)
})

app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id);
    const person = persons.find(person => person.id === id);
    if (person) {
        res.json(person);
    } else {
        res.status(404).json({ error: "Person with the requested id not found." })
    }
})

app.delete("/api/persons/:id", (req, res) => {
    console.log(req.params.id);
    const id = Number(req.params.id);
    persons = persons.filter(person => person.id !== id);
    console.log(persons)
    res.status(204).end();
})

const generateId = () => {
    return Math.round(Math.random() * 10000);
}

app.post("/api/persons", (req, res) => {
    console.log(generateId())

    const name = req.body.name;
    const number = req.body.number;

    if (!name || !number) {
        console.log('invalid name or number');
        res.status(400).end();
    }

    if (persons.find(person => person.name === name)) {
        console.log("name already exists");
        res.json({ error: 'name must be unique' })
    }


    let personObj = {
        "id": generateId(),
        "name": req.body.name,
        "number": req.body.number
    }

    persons = persons.concat(personObj);

    console.log(persons)
    // res.status(200).end();
    res.status(200).json(personObj);
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})