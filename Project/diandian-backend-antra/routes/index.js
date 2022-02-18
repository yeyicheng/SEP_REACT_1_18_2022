var router = require('express').Router();
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require("../public/api.json");

router.use('/api', require('./api'));
router.use("/", swaggerUI.serve);
router.get("/", swaggerUI.setup(swaggerDocument));

module.exports = router;
