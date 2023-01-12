const constants = require('../utils/constants');

exports.userReqVal = async (req, res, next) => {
    if(!req.body) {
        res.status(400).send({
            message : `Failed! user body required!`
        });
        return;
    }

    if(!req.body.name) {
        res.status(400).send({
            message : `Failed! user name required!`
        });
        return;
    }

    if(!req.body.userId) {
        res.status(400).send({
            message : `Failed! userId required!`
        });
        return;
    }
    
    if(!req.body.email) {
        res.status(400).send({
            message : `Failed! email required!`
        });
        return;
    }

    if(!isValidEmail(req.body.email)) {
        res.status(400).send({
            message : `Failed! email is not a valid one!`
        });
        return;
    }

    if(!req.body.password) {
        res.status(400).send({
            message : `Failed! Password required!`
        });
        return;
    }

    if(!req.body.userType) {
        res.status(400).send({
            message : `Failed! userType required!`
        });   
        return;
    }

    const userType = req.body.userType;
    const userTypes = [constants.userTypes.customer, constants.userTypes.engineer, constants.userTypes.admin];
    if(userType && !userTypes.includes(userType)) {
        res.status(400).send({
            message : `Usertype provided is invalid. Possible values CUSTOMER | ENGINEER | ADMIN`
        });
        return;
    }
    // if(!req.body.userType.includes(constants.userType))
    next();
}

const isValidEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
};
   