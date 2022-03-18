const express = require('express');
const Router = express.Router();
const Report = require('../models/report');
const { userAuthenticate, checkRole } = require('../utils/auth');

// Test Route
Router.get('/test', (req, res) => {
  res.status(200).json({
    message: "You've Reached the Report Route",
  });
});

// Get All Reports
Router.get('/all', userAuthenticate, checkRole(['admin']), async (req, res) => {
  try {
    const reports = await Report.find({});
    if (!reports) {
      res.status(404).json({
        message: 'No Reports Found',
      });
    } else {
      res.status(200).json({
        message: 'Reports Found',
        reports: reports,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error Fetching Reports',
      error: error,
    });
  }
});

// Get All Report from the logged in user
Router.get('/myreports', userAuthenticate, async (req, res) => {
  try {
    const reports = await Report.find({});
    let reportsArr = [];
    reports.forEach((report) => {
      if (report.author.id.toString() === req.user._id.toString()) {
        reportsArr.push(report);
      }
    });
    if (reportsArr.length === 0) {
      res.status(404).json({
        message: 'No Reports Found',
      });
    } else {
      res.status(200).json({
        message: 'Reports Found',
        reports: reportsArr,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error Fetching Reports',
      error: error,
    });
  }
});

// Get Reports from a specific user
Router.get(
  '/reports/:id',
  userAuthenticate,
  checkRole(['admin']),
  async (req, res) => {
    try {
      const reports = await Report.find({});
      let reportsArr = [];
      reports.forEach((report) => {
        if (report.author.id.toString() === req.params.id.toString()) {
          reportsArr.push(report);
        }
      });
      if (reportsArr.length === 0) {
        res.status(404).json({
          message: 'No Reports Found',
        });
      } else {
        res.status(200).json({
          message: 'Reports Found',
          reports: reportsArr,
        });
      }
    } catch (error) {
      res.status(500).json({
        message: 'Error Fetching Reports',
        error: error,
      });
    }
  }
);

// Create a new report
Router.post('/new', userAuthenticate, (req, res) => {
  if (!req.body) {
    res.status(400).send('Request body is missing');
  } else {
    try {
      const newReport = new Report({
        dateStart: req.body.dateStart,
        dateEnd: req.body.dateEnd,
        totalStudyCircles: req.body.totalStudyCircles,
        totalMembers: req.body.totalMembers,
        newMembers: req.body.newMembers,
        dateWise: req.body.dateWise,
        average: req.body.average,
        discussedTopics: req.body.discussedTopics,
        programs: req.body.programs,
        attendedPrograms: req.body.attendedPrograms,
        socialWork: req.body.socialWork,
        letter: req.body.letter,
        author: {
          id: req.user._id,
          email: req.user.email,
          unit: req.user.unit,
          role: req.user.role,
        },
      });
      newReport.save((err, report) => {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(201).send(report);
        }
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
});

// Get a report by ID
Router.get('/:id', userAuthenticate, async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      res.status(404).json({
        message: 'No Report Found',
      });
    } else {
      res.status(200).json({
        message: 'Report Found',
        report: report,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error Fetching Report',
      error: error,
    });
  }
});

// Update a report by ID
Router.put('/:id', userAuthenticate, async (req, res) => {
  try {
    const report = await Report.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!report) {
      res.status(404).json({
        message: 'No Report Found',
      });
    } else {
      res.status(200).json({
        message: 'Report Updated',
        report: report,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error Updating Report',
      error: error,
    });
  }
});

// Delete a report by ID
Router.delete('/:id', userAuthenticate, async (req, res) => {
  try {
    const report = await Report.findByIdAndDelete(req.params.id);
    if (!report) {
      res.status(404).json({
        message: 'No Report Found',
      });
    } else {
      res.status(200).json({
        message: 'Report Deleted',
        report: report,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error Deleting Report',
      error: error,
    });
  }
});

module.exports = Router;
