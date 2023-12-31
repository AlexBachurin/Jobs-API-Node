const { BadRequestError, NotFoundError } = require("../errors");

const JobModel = require("../models/Job");
const { StatusCodes } = require("http-status-codes");

const getAllJobs = async (req, res) => {
  // get id that associated with user
  const userId = req.user.userId;
  // get jobs ONLY associated with user who created job using user id
  const jobs = await JobModel.find({ createdBy: userId }).sort("createdAt");
  // send back jobs and count, thats what we looking for in front-end
  res.status(StatusCodes.OK).json({ jobs, count: jobs.length });
};

const getSingleJob = async (req, res) => {
  //get job id from params
  const jobId = req.params.id;
  // get user id from middleware
  const userId = req.user.userId;

  const job = await JobModel.findOne({ _id: jobId, createdBy: userId });
  // check if provided wrong id
  if (!job) {
    throw new NotFoundError(`No job found with id: ${jobId}`);
  }
  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  // pass id of user who created this job to req.body
  // from req.user we getting from auth middleware
  req.body.createdBy = req.user.userId;
  const job = await JobModel.create(req.body);
  res.status(StatusCodes.CREATED).json(job);
};

const updateJob = async (req, res) => {
  //get job id from params
  const jobId = req.params.id;
  // get user id from middleware
  const userId = req.user.userId;
  // get values to change from req.body
  const { company, position } = req.body;
  //if values not provided, send back BadRequest error
  if (company === "" || position === "") {
    throw new BadRequestError("Company name and position must be provided");
  }

  const job = await JobModel.findOneAndUpdate(
    {
      _id: jobId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  );
  // check if provided wrong id
  if (!job) {
    throw NotFoundError(`No job found with id: ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const deleteJob = async (req, res) => {
  //get job id from params
  const jobId = req.params.id;
  // get user id from middleware
  const userId = req.user.userId;

  const job = await JobModel.findOneAndRemove({
    _id: jobId,
    createdBy: userId,
  });
  // check if provided wrong id
  if (!job) {
    throw new BadRequestError(`No job found with id: ${jobId}`);
  }
  res.status(StatusCodes.OK).send();
};

module.exports = { getAllJobs, getSingleJob, createJob, updateJob, deleteJob };
