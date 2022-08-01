const users = []

const createUser  =  (user) => {
    users.push(user);
}

const getUser =  (email) => {
    for (let user of users){
        if(user.email == email){
            return user
        }
    }
}

module.exports = {"getUser":getUser, "createUser": createUser}
