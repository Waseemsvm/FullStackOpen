const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Person = require("./models/Person");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

morgan.token("body", function (req, res) { return JSON.stringify(req.body) })
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
    // response.json(persons);
    Person.find().then(persons => {
        response.json(persons);
    })
})

app.get("/info", (req, res) => {
    res.send(`
     <p>Phonebook has infor for ${persons.length} people</p>
     <p>${new Date()}</p>
    `)
})

app.get("/api/persons/:id", (req, res, next) => {
    // const id = Number(req.params.id);
    // const person = persons.find(person => person.id === id);
    // if (person) {
    //     res.json(person);
    // } else {
    //     res.status(404).json({ error: "Person with the requested id not found." })
    // }

    Person
        .findById(req.params.id)
        .then(person => {
            res.json(person);
        })
        .catch(err => next(err))

})

app.put("/api/persons/:id", (req, res, next) => {

    let personObj = {
        name: req.body.name,
        number: req.body.number
    }
    Person
        .findByIdAndUpdate(req.params.id, personObj, { new: true })
        .then(updatedPerson => {
            res.json(updatedPerson);
        })
        .catch(err => next(err))
})

app.delete("/api/persons/:id", (req, res, next) => {
    // console.log(req.params.id);
    // const id = Number(req.params.id);
    // persons = persons.filter(person => person.id !== id);
    // console.log(persons)
    // res.status(204).end();

    Person
        .findByIdAndDelete(req.params.id)
        .then(result => {
            res.status(204).end();
        })
        .catch(err => next(err))
})

const generateId = () => {
    return Math.round(Math.random() * 10000);
}

app.post("/api/persons", (req, res, next) => {
    console.log(generateId())

    const name = req.body.name;
    const number = req.body.number;

    if (!name || !number) {
        console.log('invalid name or number');
        res.status(400).end();
    } else {

        if (persons.find(person => person.name === name)) {
            console.log("name already exists");
            res.json({ error: 'name must be unique' })
        }

        let person = new Person({
            name: name,
            number: number
        });

        person
            .save()
            .then(savedPerson => {
                res.status(200).json(savedPerson);
                console.log("saved the details of : ", savedPerson);
            })
            .catch(err => {
                next(err)
            })
    }

    // let personObj = {
    //     "id": generateId(),
    //     "name": req.body.name,
    //     "number": req.body.number
    // }

    // persons = persons.concat(personObj);

    // console.log(persons)
    // // res.status(200).end();
    // res.status(200).json(personObj);
});

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }else if (error.name === 'ValidationError') {
        return response.status(500).send({ error: error.message })
    }

    next(error)
}

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})