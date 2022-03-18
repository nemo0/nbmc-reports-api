const Report = require('../models/report');

exports.getAllReports = async (req, res) => {
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
};

exports.getReportsByLoggedInUser = async (req, res) => {
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
};

exports.getReportsBySpecificUser = async (req, res) => {
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
};

exports.createNewReport = (req, res) => {
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
          res.status(500).json({
            message: 'Internal Server Error',
            error: err,
          });
        } else {
          res.status(201).json({
            message: 'Report Created',
            report: report,
          });
        }
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
};

exports.getReportById = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      res.status(404).json({
        message: 'No Report Found',
      });
    } else {
      if (
        report.author.id.toString() === req.user._id.toString() ||
        req.user.role === 'admin'
      ) {
        res.status(200).json({
          message: 'Report Found',
          report: report,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error Fetching Report',
      error: error,
    });
  }
};

exports.updateReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      res.status(404).json({
        message: 'No Report Found',
      });
    } else {
      if (
        report.author.id.toString() !== req.user._id.toString() ||
        req.user.role !== 'admin'
      ) {
        res.status(401).json({
          message: 'Not Authorized',
        });
      } else {
        report.dateStart = req.body.dateStart;
        report.dateEnd = req.body.dateEnd;
        report.totalStudyCircles = req.body.totalStudyCircles;
        report.totalMembers = req.body.totalMembers;
        report.newMembers = req.body.newMembers;
        report.dateWise = req.body.dateWise;
        report.average = req.body.average;
        report.discussedTopics = req.body.discussedTopics;
        report.programs = req.body.programs;
        report.attendedPrograms = req.body.attendedPrograms;
        report.socialWork = req.body.socialWork;
        report.letter = req.body.letter;
        report.save((err, report) => {
          if (err) {
            res.status(500).json({
              message: 'Error Updating Report',
              error: err,
            });
          } else {
            res.status(200).json({
              message: 'Report Updated',
              report: report,
            });
          }
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error Updating Report',
      error: error,
    });
  }
};

exports.deleteReport = async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report) {
      res.status(404).json({
        message: 'No Report Found',
      });
    } else {
      if (
        report.author.id.toString() !== req.user._id.toString() ||
        req.user.role !== 'admin'
      ) {
        res.status(401).json({
          message: 'Not Authorized',
        });
      } else {
        report.remove();
        res.status(200).json({
          message: 'Report Deleted',
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error Deleting Report',
      error: error,
    });
  }
};
