const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const constants = require('../utils/constants');
const jwt = require('jsonwebtoken');
const config = require('../config/serverConfig');
const { userResponse } = require('../utils/objectConvertor');

exports.signUp = async (req, res) => {
    const body = req.body;
    let userStatus = body.userStatus;
    const userType = body.userType;

    try {

        const email = await User.findOne({ email : body.email });
        if(email) {
            return res.status(409).send({
                message : `This email has already been registered !`
            });
        }

        if(userType !== constants.userTypes.customer) {
            userStatus = constants.userStatus.pending;
        }

        const userObj = {
            name : body.name,
            userId : body.userId,
            email : body.email,
            password : bcrypt.hashSync(body.password, 8),
            userType : userType,
            userStatus : userStatus
        }

    
        const user = await User.create(userObj);
        console.log(`User has been registered successfully !`);
        res.status(201).send(userResponse(user));
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Some error occured while processing your request. Please try again sometimes !`
        });
    }
    
}

exports.signIn = async (req, res) => {
    const body = req.body;
    const password = body.password

    const queryObj = {};
    if(body.userId) {
        queryObj.userId = body.userId;
    }
    if(body.email) {
        queryObj.email = body.email;
    }

    try {
        const userInDb = await User.findOne(queryObj);
        if(!userInDb) {
            return res.status(404).send({
                message : `User doesn't exist !`
            })
        };

        if(userInDb && userInDb.userStatus !== constants.userStatus.approved) {
            return res.status(401).send({
                message : `Not authorized for signIn. Since your userStatus is ${userInDb.userStatus} !`
            })
        };

        var passwordIsValid = bcrypt.compare(password, userInDb.password);

        if(!passwordIsValid) {
            return res.status(403).send({
                message : `Password is invalid !`
            });
        };
        
        const token = jwt.sign({ userId : userInDb.userId, role : userInDb.userType }, config.SECRET, {
            expiresIn : 86400  // 1d
        });

        let response = userResponse(userInDb)
        response.accessToken = token

        res.status(200).send(response);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Some error occured while processing your request. Please try again sometimes !`
        });
    }
}