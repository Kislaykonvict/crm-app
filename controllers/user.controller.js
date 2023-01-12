const User = require('../models/user.model');
const { userListResponse, userResponse } = require('../utils/objectConvertor');


exports.getAllUser = async (req, res) => {
    const queryObj = {};

    if(req.query.name) {
        queryObj.name = req.query.name;
    }
    if(req.query.userStatus) {
        queryObj.userStatus = req.query.userStatus;
    }
    if(req.query.userType) {
        queryObj.userType = req.query.userType;
    }

    try {
        const userInDb = await User.find(queryObj);
        res.status(200).send(userListResponse(userInDb));
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Error occured in processing your request. Please try again after sometime !`
        })
    }
}

exports.getUserOnId = async (req, res) => {
    const reqId = req.params.id;
    try {
        const userInDb = await User.findOne({userId : reqId});
        if(!userInDb) {
            return res.status(404).send({
                message : `User doesn't exist !`
            });
        }
        res.status(200).send(userResponse(userInDb));
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Error occured in processing your request. Please try again after sometime !`
        })
    }
}

exports.updateUser = async (req, res) => {
    const reqId = req.params.id;
    try {
        const userInDb = await User.findOneAndUpdate({userId : reqId}, {
            name : req.body.name,
            userStatus : req.body.userStatus,
            userType : req.body.userType
        });
        if(!userInDb) {
            return res.status(404).send({
                message : `User to be updated doesn't exist !`
            });
        }
        res.status(200).send({
            message : `User record has been successfully updated !`
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).send({
            message : `Error occured in processing your request. Please try again after sometime !`
        })
    }
}