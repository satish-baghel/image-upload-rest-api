const { request } = require('express')

const mongoose = require('mongoose')
const config = require('config')
const db = config.get('mongoURI')

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    })
    console.log('MongoDB Connect')
  } catch (err) {
    console.error(err.message)
    // Exit Process
    process.exit(1)
  }
}
module.exports = connectDB
