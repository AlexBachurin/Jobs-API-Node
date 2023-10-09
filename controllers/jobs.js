const { BadRequestError, NotFoundError } = require("../errors");
const JobModel = require("../models/Job");
const { StatusCodes } = require("http-status-codes");

const getAllJobs = async (req, res) => {
  res.json(req.user);
};

const getSingleJob = async (req, res) => {
  res.send("Get Single Job");
};

const createJob = async (req, res) => {
  // pass id of user who created this job to req.body
  // from req.user we getting from auth middleware
  req.body.createdBy = req.user.userId;
  const job = await JobModel.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
};

const updateJob = async (req, res) => {
  res.send("Update job");
};

const deleteJob = async (req, res) => {
  res.send("Delete Job");
};

module.exports = { getAllJobs, getSingleJob, createJob, updateJob, deleteJob };
