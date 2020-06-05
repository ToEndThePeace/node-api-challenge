const Projects = require("../data/helpers/projectModel");
const Actions = require("../data/helpers/actionModel");

function validateProjectId(req, res, next) {
  const { id } = req.params;
  Projects.get(id)
    .then((data) => {
      if (!data) throw "Project not found";
      req.project = data;
      next();
    })
    .catch(() => {
      res.status(404).json({ message: "Project not found" });
    });
}
function validateProject(req, res, next) {
  const { body: project } = req;
  if (!project.name && !project.description) {
    res.status(400).json({ message: "No project details provided" });
  } else if (!project.name || !project.description) {
    res
      .status(400)
      .json({ message: "Name and description are required fields" });
  } else {
    next();
  }
}

function validateActionId(req, res, next) {
  const { id } = req.params;
  Actions.get(id)
    .then((data) => {
      if (!data) throw "Action not found";
      req.action = data;
      next();
    })
    .catch(() => {
      res.status(404).json({ message: "Action not found" });
    });
}

function validateAction(req, res, next) {
  const { body: action } = req;
  if (!action.description && !action.project_id && !action.notes) {
    res.status(400).json({ message: "No action details provided" });
  } else if (!action.description || !action.project_id || !action.notes) {
    res
      .status(400)
      .json({ message: "Description, notes, and project id are all required" });
  } else {
    next();
  }
}

module.exports = {
  validateAction,
  validateActionId,
  validateProject,
  validateProjectId,
};
