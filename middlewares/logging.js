const morgan = require('morgan');

const setupMorgan = (app) => {
  app.use(morgan('combined'));
};

exports.setupMorgan = setupMorgan;
