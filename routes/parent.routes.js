const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');

exports.createRoutes = (app) => {
    app.use('/crm/api/v1/auth', authRoutes);
    app.use('/crm/api/v1/users', userRoutes);
}