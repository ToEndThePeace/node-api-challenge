const router = require("express").Router();
const Actions = require("../data/helpers/actionModel");
const { validateAction, validateActionId } = require("../middleware");

router.get("/", (req, res) => {
  Actions.get()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: "An error occurred while fetching actions" });
    });
});

router.get("/:id", validateActionId, (req, res) => {
  res.status(200).json(req.action);
});

router.post("/", validateAction, (req, res) => {
  const { body: newAction } = req;
  Actions.insert(newAction)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "An error occurred while storing your action" });
    });
});

router.put("/:id", validateActionId, (req, res) => {
  const { id } = req.params;
  const { action } = req;
  const changes = { ...action, ...req.body };
  Actions.update(id, changes)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "An error occurred while updating your action" });
    });
});

router.delete("/:id", validateActionId, (req, res) => {
  const { id } = req.action;
  Actions.remove(id)
    .then((data) => {
      if (data) {
        res.status(204).end();
      } else {
        res
          .status(404)
          .json({ message: "Action could not be found for deletion" });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ message: "An error occurred while deleting your action" });
    });
});

module.exports = router;
