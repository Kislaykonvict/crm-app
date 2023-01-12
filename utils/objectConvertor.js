
exports.userResponse = (users) => {
    return {
        name : users.name,
        userId : users.userId,
        email : users.email,
        userType : users.userType,
        userStatus : users.userStatus
    }
}

exports.userListResponse = (users) => {
    const userResult = [];
    users.forEach(doc => {
        userResult.push({
            name : doc.name,
            userId : doc.userId,
            email : doc.email,
            userType : doc.userType,
            userStatus : doc.userStatus
        });
    });
    return userResult;
}


