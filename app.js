'use strict';
const SwaggerExpress = require('swagger-express-mw');
const SwagguerUi = require('swagger-ui-express')
const express = require('express');
const controllers = require('./controllers.js');
var bunyan = require('bunyan');
var log = bunyan.createLogger({name: "myapp"});

const app = express();
const swagguerConfig = {
    appRoot: __dirname,
    swaggerFile: `${__dirname}/config/api.yaml`,
}

// app.use('/api-docs', swaggerUi.serve)
// app.get('/api-docs', swaggerUi.setup(swaggerDocument, false));

const onSwaggerCreated = (error, swaggerExpress) => {
    if(error) throw error;

    const swaggerDocument = swaggerExpress.runner.swagger;
    app.use('/api/v1/docs', SwagguerUi.serve, SwagguerUi.setup(swaggerDocument));
    swaggerExpress.register(app);
    app.listen(3000, () => log.info('onAppStart', 3000));
}

SwaggerExpress.create(swagguerConfig, onSwaggerCreated);


module.exports = { app, ...controllers};