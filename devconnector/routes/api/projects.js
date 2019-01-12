const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Project Model
const Project = require("../../models/Project");

//Profile Model
const Profile = require("../../models/Profile");

//Validation
const validateProjectInput = require("../../validation/projects");

// @route   GET api/projects/test
// @desc    Test project route
// @access  public
router.get("/test", (req, res) => res.json({ msg: "Project Works" }));

// @route   GET api/projects
// @desc    Get projects
// @access  public
router.get("/", (req, res) => {
  Project.find()
    .sort({ date: -1 })
    .then(projects => res.json(projects))
    .catch(err =>
      res
        .status(404)
        .json({ noprojectsfound: "No projects found with that ID" })
    );
});

// @route   GET api/projects/:id
// @desc    Get projects by id
// @access  public
router.get("/:id", (req, res) => {
  Project.findById(req.params.id)
    .then(project => res.json(project))
    .catch(err =>
      res.status(404).json({ noprojectfound: "No project found with that ID" })
    );
});

// @route   POST api/projects
// @desc    Create project
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProjectInput(req.body);

    //Check validation
    if (!isValid) {
      //If any errors send 400 with current error object
      return res.status(400).json(errors);
    }

    const newProject = new Project({
      text: req.body.text,
      name: req.body.name,
      avatar: req.body.avatar,
      user: req.user.id
    });

    newProject.save().then(project => res.json(project));
  }
);

// @route   DELETE api/projects/:id
// @desc    Delete project
// @access  Private
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Project.findById(req.params.id)
        .then(project => {
          //Check for project owner
          if (project.user.toString() !== req.user.id) {
            return res
              .status(401)
              .json({ notauthorized: "User not authorized" });
          }

          //Delete
          project.remove().then(() => res.json({ success: true }));
        })
        .catch(err =>
          res.status(404).json({ projectnotfound: "No project found" })
        );
    });
  }
);

// @route   POST api/projects/like/:id
// @desc    Like project
// @access  Private
router.post(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Project.findById(req.params.id)
        .then(project => {
          if (
            project.likes.filter(like => like.user.toString() === req.user.id)
              .length > 0
          ) {
            return res
              .status(400)
              .json({ alreadyliked: "User already liked this project" });
          }

          //Add user id to likes array
          project.likes.unshift({ user: req.user.id });

          project.save().then(project => res.json(project));
        })
        .catch(err =>
          res.status(404).json({ projectnotfound: "No project found" })
        );
    });
  }
);

// @route   POST api/projects/unlike/:id
// @desc    Unlike project
// @access  Private
router.post(
  "/unlike/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOne({ user: req.user.id }).then(profile => {
      Project.findById(req.params.id)
        .then(project => {
          if (
            project.likes.filter(like => like.user.toString() === req.user.id)
              .length === 0
          ) {
            return res
              .status(400)
              .json({ notliked: "You have not liked this project" });
          }

          //Get remove index
          const removeIndex = project.likes
            .map(item => item.user.toString())
            .indexOf(req.user.id);

          //Splice out of array
          project.likes.splice(removeIndex, 1);

          //Save
          project.save().then(project => res.json(project));
        })
        .catch(err =>
          res.status(404).json({ projectnotfound: "No project found" })
        );
    });
  }
);

// @route   POST api/projects/comment/:id
// @desc    Comment project
// @access  Private
router.post(
  "/comment/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProjectInput(req.body);

    //Check validation
    if (!isValid) {
      //If any errors send 400 with current error object
      return res.status(400).json(errors);
    }
    Project.findById(req.params.id)
      .then(project => {
        const newComment = {
          text: req.body.text,
          name: req.body.name,
          avatar: req.body.avatar,
          user: req.user.id
        };

        //Add to comments array
        project.comments.unshift(newComment);

        //Save
        project.save().then(project => res.json(project));
      })
      .catch(err =>
        res.status(404).json({ projectnotfound: "No project found" })
      );
  }
);

// @route   DELETE api/projects/comment/:id/:comment_id
// @desc    DELETE comment to project
// @access  Private
router.delete(
  "/comment/:id/:comment_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Project.findById(req.params.id)
      .then(project => {
        //Check to see if comment exists
        if (
          project.comments.filter(
            comment => comment._id.toString() === req.params.comment_id
          ).length === 0
        ) {
          return res
            .status(404)
            .json({ commentnotexists: "Comment does not exist" });
        }

        //Get remove index
        const removeIndex = project.comments
          .map(item => item._id.toString())
          .indexOf(req.params.comment_id);

        //Splice comment out of array
        project.comments.splice(removeIndex, 1);

        //Save
        project.save().then(project => res.json(project));
      })
      .catch(err =>
        res.status(404).json({ projectnotfound: "No project found" })
      );
  }
);

module.exports = router;
