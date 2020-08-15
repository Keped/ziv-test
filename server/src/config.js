module.exports.PORT = parseInt(process.env.ELEMENTOR_WEB_PORT, 10) || 8080;
module.exports.MONGO_PATH = process.env.ELEMENTOR_DB_HOST_PORT || 'elemongo:27017/test';
module.exports.STATIC_PATH = process.env.ELEMENTOR_STATIC_PATH || '../frontend';
module.exports.JWT_SECRET = process.env.ELEMENTOR_JWT_SECRET || `${Date.now()}`;
