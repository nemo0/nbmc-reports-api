const express = require('express');
const Router = express.Router();
const mongoose = require('mongoose');
const Report = require('../models/report');

// Create a new report
Router.post('/new', (req, res) => {
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

module.exports = Router;
