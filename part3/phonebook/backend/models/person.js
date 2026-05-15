const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

const url = process.env.MONGODB_URI

console.log(`Connecting to`, url)
mongoose.connect(url, { family: 4 })
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB', error)
    })

const personSchema = new mongoose.Schema({
    // Our put method calls save instead of update, so no need to apply update validation
    name: {
        type: String,
        minLength: [3, "Person name must be at least 3 characters"],
        required: [true, "Must include person name"]
    },
    number: String
})

personSchema.set('toJSON', {
    transform: (docment, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Person', personSchema)