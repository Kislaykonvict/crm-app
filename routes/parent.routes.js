const authRoutes = require('./auth.routes');


exports.createRoutes = (app) => {
    app.use('/crm/api/v1/auth', authRoutes);
}