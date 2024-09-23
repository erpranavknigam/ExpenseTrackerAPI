const jsonwebtoken = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const KEY = process.env.SECRET_KEY

module.exports = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]

    if(!token){
        return res.status(403).json({
            message: "Token was not provided"
        })
    }
    jsonwebtoken.verify(token, KEY, (err, decode) => {
        if(err){
            return res.status(401).json({
                message: "Unauthorized access"
            })
        }
        req.user = decode
        // console.log(decode)
        next()
    })
}