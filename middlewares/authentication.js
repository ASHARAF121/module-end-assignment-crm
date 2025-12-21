const jwt = require('jsonwebtoken')
const secretKey = process.env.secretKey

const checkAuth = (req,res,next)=>{
    try {
        const token = req?.headers['authorization'] || req.cookies['session_token']
        const isAuth = jwt.verify(token,secretKey)
        

        if(!isAuth){
            res.json({message:'unauthorised user '})
            return
        }
        next()
    } catch (error) {
        res.status(500).send('error from server')
        
    }
}

module.exports=checkAuth;