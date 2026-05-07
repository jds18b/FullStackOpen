const express = require("express")
const app = express()

app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get("/", (req, res) =>{
    res.send("<p>App is online</p>")
})

app.get("/api/persons", (req, res) => {
    res.json(persons)
})

app.get("/api/persons/:id", (req, res) => {
    const id = req.params.id
    const person = persons.find(p => p.id === id)

    if(person) {
        res.json(person)
    }
    else {
        res.status(404).end()
    }
})

const generateId = () => {
    const id = Math.floor(Math.random() * Math.pow(2,16))
    return String(id)
}

app.post("/api/persons", (req, res) => {
    const body = req.body

    if(!body.name) {
        return res.status(400).json({"error": "Name is missing from request"})
    }
    if(!body.number) {
        return res.status(400).json({"error": "Number is missing from request"})
    }

    if(persons.find(p => p.name === body.name)) {
        return res.status(400).json({"error": "Name must be unique"})
    }

    const person = {
        id: generateId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    res.json(person)
})

app.delete("/api/persons/:id", (req, res) => {
    const id = req.params.id
    persons = persons.filter(p => p.id !== id)

    res.status(204).end()
})

app.get("/info", (req, res) => {
    const numPersons = persons.length

    res.send(`<div>Phonebook has info for ${numPersons} people</div>
        <div>${Date()}</div>`)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})