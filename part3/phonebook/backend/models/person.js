const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI

console.log('Connecting to', url)
mongoose.connect(url, { family: 4 })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB', error)
  })

const personSchema = new mongoose.Schema({
  // Our put method calls save instead of update, so no need to apply update validation
  name: {
    type: String,
    minLength: [3, 'Person name must be at least 3 characters'],
    required: [true, 'Must include person name']
  },
  number: {
    type: String,
    minLength: [8, 'Number must contain at least 8 characters'],
    // No need for a custom validator if you're willing to use a little regex
    match: [/^\d{2,3}-\d+$/, 'Number must be a valid phone number (2 or 3 numbers, a -, then some amount of additional numbers)']
  }
})

personSchema.set('toJSON', {
  transform: (docment, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)