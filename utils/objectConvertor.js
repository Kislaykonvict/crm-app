
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

exports.ticketResponse = (ticket) => {
    return {
        title : ticket.title,
        description : ticket.description,
        ticketPriority : ticket.ticketPriority,
        status : ticket.status,
        reporter : ticket.reporter,
        assignee : ticket.assignee,
        id : ticket._id,
        createdAt : ticket.createdAt,
        updatedAt : ticket.updatedAt
    }
}

exports.ticketListResponse = (tickets) => {
    const ticketResult = [];
    tickets.forEach(doc => {
        ticketResult.push({
            title : doc.title,
            description : doc.description,
            ticketPriority : doc.ticketPriority,
            status : doc.status,
            reporter : doc.reporter,
            assignee : doc.assignee,
            id : doc._id,
            createdAt : doc.createdAt,
            updatedAt : doc.updatedAt
        })
    });
    return ticketResult
}


