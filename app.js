const express = require('express')
const app = express()
const connectDB = require('./config/db')

// Connnect DataBase
connectDB()
// Port
const PORT = process.env.PORT || 5000

// Init Middleware

app.use('/upload', express.static('upload'))
app.use(express.json({ extended: false }))

//Default Routes
app.use('/api/product', require('./router/api/product'))

app.get('/', (req, res) => res.send('Hello'))
app.listen(PORT, () => console.log(`App is running in ${PORT} ...`))
