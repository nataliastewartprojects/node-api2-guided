const express = require("express");
const Hubs = require("./hubs-model.js"); //<< update the path
const router = express.Router();

module.exports = router;
//export default router

// by the time this runs, the /api/hubs
// part of the url has been evaluated
//we only care about the rest of the url

//list of hubs
router.get("/", (req, res) => {
  //all the database methods returns a promise

  const query = req.query;

  Hubs.find(query) //dont forget to pass a obj here
    .then((hubs) => {
      res.status(200).json({ data: hubs, parameters: req.query });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({ error: error.message });
    });
});

// router.get("/api/hubs", (req, res) => {
//   Hubs.find(req.query)
//     .then((hubs) => {
//       res.status(200).json(hubs);
//     })
//     .catch((error) => {
//       // log error to database
//       console.log(error);
//       res.status(500).json({
//         message: "Error retrieving the hubs",
//       });
//     });
// });

router.get("/api/hubs/:id", (req, res) => {
  Hubs.findById(req.params.id)
    .then((hub) => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: "Hub not found" });
      }
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the hub",
      });
    });
});

router.post("/api/hubs", (req, res) => {
  Hubs.add(req.body)
    .then((hub) => {
      res.status(201).json(hub);
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error adding the hub",
      });
    });
});

router.delete("/api/hubs/:id", (req, res) => {
  Hubs.remove(req.params.id)
    .then((count) => {
      if (count > 0) {
        res.status(200).json({ message: "The hub has been nuked" });
      } else {
        res.status(404).json({ message: "The hub could not be found" });
      }
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error removing the hub",
      });
    });
});

router.put("/api/hubs/:id", (req, res) => {
  const changes = req.body;
  Hubs.update(req.params.id, changes)
    .then((hub) => {
      if (hub) {
        res.status(200).json(hub);
      } else {
        res.status(404).json({ message: "The hub could not be found" });
      }
    })
    .catch((error) => {
      // log error to database
      console.log(error);
      res.status(500).json({
        message: "Error updating the hub",
      });
    });
});
