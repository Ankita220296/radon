const  createUser = require("../controllers/usersController")
const orderModel = require("../models/orderModel");

const headerMiddleware= async function ( req, res, next) {
    const freeAppUser = req.headers.isfreeappuser
    console.log(freeAppUser)
    if(freeAppUser){
        if(freeAppUser == true){
            const a = await orderModel.updateMany({freeAppUser : true},{$set : {amount : 0}})
            console.log(a)
        }
        next()
    }else {
        res.send("Header is mandatory")
    }  
    

}

module.exports.headerMiddleware = headerMiddleware;
