module.exports.PORT = parseInt(process.env.ELEMENTOR_WEB_PORT, 10) || 8080;
module.exports.MONGO_PATH = process.env.ELEMENTOR_DB_HOST_PORT || 'mongodb://localhost/test';
