const dotenv = require('dotenv')
const app = require('./app')
const {connect} = require('./config/dbconfig')
dotenv.config()

const PORT = process.env.PORT

connect()

app.listen(PORT,() => {
    console.log("Server Started at PORT: ", PORT)
})