const bcrypt = require('bcrypt');
class AuthUtils{
    async  hashpasswords(password){
        try {
            console.log(password)


        const hashedPassword = await bcrypt.hash(password, 4);
        console.log(hashedPassword)
        return hashedPassword;
        } catch (error) {
        throw new Error('Error hashing password');
        }
        }
    async compareHashedPasswords(password,storedHashedPassword){
       let testhash= await bcrypt.compare(password, storedHashedPassword);
       console.log("test",testhash)
       if(testhash){
        return true
       }
       return false
    }
    validatemail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
    }
    async createUserId(name){
        const saltRounds=3
        try {
            const hashedUserID = await bcrypt.hash(name, saltRounds);
            return hashedUserID;
            } catch (error) {
            throw new Error('Error hashing User ID');
            }
    }
}

module.exports=new AuthUtils