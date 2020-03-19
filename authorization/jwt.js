var jwt = require("jsonwebtoken");

var dotenv = require('dotenv').config({ path: '../.env' });

var encryptionKey = process.env.ENCRYPTIONKEY;

function createJwt(payload){
    var token = jwt.sign({
                        data: payload
                        }, encryptionKey , { expiresIn: '1h' });
    return token;
}

function decodeJwt(token){
    jwt.verify(token, encryptionKey, function(err, decoded) {
        if (err) {
            console.log(err);
        }
        else{
            console.log(JSON.stringify(decoded));
            console.log("Decoded token is "+decoded);
        }
    });
}

module.exports ={
    createJwt : createJwt,
    decodeJwt : decodeJwt
}





