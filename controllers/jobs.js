const getAllJobs = async (req, res) => {
  res.json(req.user);
};

const getSingleJob = async (req, res) => {
  res.send("Get Single Job");
};

const createJob = async (req, res) => {
  res.json(req.user);
};

const updateJob = async (req, res) => {
  res.send("Update job");
};

const deleteJob = async (req, res) => {
  res.send("Delete Job");
};

module.exports = { getAllJobs, getSingleJob, createJob, updateJob, deleteJob };
