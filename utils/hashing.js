const bcrypt = require('bcrypt')

module.exports.hashing= async (password)=>{
    if(!password)
    {
        return console.log('the error occured problem with the password',err)
    }
    try{
    const salt = await bcrypt.genSalt(10)
    const hashPassword= await bcrypt.hash(password,salt)
    return hashPassword;
    }
    catch(err)
    {
        return console.log('the error occured in the ahshing part', err)
    }

}