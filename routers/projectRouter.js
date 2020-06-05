const router = require("express").Router();
const Projects = require("../data/helpers/projectModel");
const { validateProject, validateProjectId } = require("../middleware");

router.get("/", (req, res) => {
  Projects.get()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "An error occurred while fetching projects" });
    });
});

router.get("/:id", validateProjectId, (req, res) => {
  res.status(200).json(req.project);
});

router.get("/:id/actions", validateProjectId, (req, res) => {
  res.status(200).json(req.project.actions);
});

router.post("/", validateProject, (req, res) => {
  const { body: newProj } = req;
  Projects.insert(newProj)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "An error occurred while saving your project" });
    });
});

router.put("/:id", validateProjectId, (req, res) => {
  const { id } = req.params;
  const { actions, ...original } = req.project;
  const changes = { ...original, ...req.body };
  Projects.update(id, changes)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "An error occurred while updating your project" });
    });
});

router.delete("/:id", validateProjectId, (req, res) => {
  const { id } = req.project;
  Projects.remove(id)
    .then((data) => {
      if (data) {
        res.status(204).end();
      } else {
        res
          .status(404)
          .json({ message: "Project could not be found for deletion" });
      }
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "An error occurred while deleting your project" });
    });
});

module.exports = router;
