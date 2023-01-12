const jwt = require('jsonwebtoken');
const config = require('../config/serverConfig');
const constants = require('../utils/constants')

exports.verifyToken = (req, res, next) => {
    const header = req.headers['x-access-token'];
    if(!header) {
        return res.status(401).send({
            message : `Token is not provided !`
        })
    }
    jwt.verify(header, config.SECRET, (err, payload) => {
        if(err) {
            return res.status(401).send({
                message : `Unauthorized !`
            })
        }
        req.userId = payload.userId;
        req.role = payload.role;
        next();
    })
}

exports.isAdmin = async (req, res, next) => {
    
    if(req.role !== constants.userTypes.admin) {
        return res.status(403).send({
            message : `Admin role required !`
        });
    }
    next();
}