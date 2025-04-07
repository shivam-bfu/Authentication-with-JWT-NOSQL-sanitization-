const jwt =require('jsonwebtoken')
module.exports.tokenGenerator= (id)=>{
    const token= jwt.sign({id},process.env.JWT_KEY)
    return token;
}