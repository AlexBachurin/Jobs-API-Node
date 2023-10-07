const express = require("express");
const jobsRouter = express.Router();

const {
  getAllJobs,
  getSingleJob,
  updateJob,
  createJob,
  deleteJob,
} = require("../controllers/jobs");

jobsRouter.get("/", getAllJobs);
jobsRouter.post("/", createJob);
jobsRouter.get("/:id", getSingleJob);
jobsRouter.patch("/:id", updateJob);
jobsRouter.delete("/:id", deleteJob);

module.exports = jobsRouter;
