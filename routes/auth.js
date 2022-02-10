const express = require('express');
const Router = express.Router();

const { auth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: '68dd2cfbae9bbbace3b855dea206b52c411b3b6dd1e7540f16d0cc2aadd8cfb0',
  baseURL: 'http://localhost:3000',
  clientID: 'pMGDPccRSqVqKDefWoCc3exWOL4aMRTL',
  issuerBaseURL: 'https://dev-bhvjfi3h.us.auth0.com',
};

Router.use(auth(config));

Router.get('/', (req, res) => {
  if (req.oidc.isAuthenticated()) {
    res.json({
      message: 'Logged In',
    });
  } else {
    res.json({
      message: 'Not Logged In',
    });
  }
});

module.exports = Router;
