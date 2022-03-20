const express = require('express');
const Router = express.Router();
const { userAuthenticate, checkRole } = require('../utils/auth');
const {
  getAllReports,
  getReportsByLoggedInUser,
  getReportsBySpecificUser,
  createNewReport,
  getReportById,
  updateReport,
  deleteReport,
} = require('../controllers/report');

// Test Route
Router.get('/test', (req, res) => {
  res.status(200).json({
    message: "You've Reached the Report Route",
  });
});

// Get All Reports
Router.get('/all', userAuthenticate, checkRole(['admin']), getAllReports);

// Get All Report from the logged in user
Router.get('/myreports', userAuthenticate, getReportsByLoggedInUser);

// Get Reports from a specific user
Router.get(
  '/reports/:id',
  userAuthenticate,
  checkRole(['admin']),
  getReportsBySpecificUser
);

// Create a new report
Router.post('/new', userAuthenticate, createNewReport);

// Get a report by ID
Router.get('/:id', userAuthenticate, getReportById);

// Update a report by ID
Router.put('/:id', userAuthenticate, updateReport);

// Delete a report by ID
Router.delete('/:id', userAuthenticate, deleteReport);

module.exports = Router;
