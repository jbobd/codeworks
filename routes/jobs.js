const express = require("express");
const router = express.Router();
const db = require("../config/sequelize");
const Job = require("../models/Job");
const Sequelize = require("sequelize");
//import Op from sequelize in order to use LIKE sql operator
const Op = Sequelize.Op;

//get job list
//en app.js seteamos la ruta como /jobs así que el / de aquí será por default "/jobs"

router.get("/", (req, res) =>
  Job.findAll()
  //old version it's simple as:
  //then((jobs) => res.render('jobs',{jobs})
    .then((jobs) => {
      //this step is done because of Handlebars ""own property" of its parent." error
      const context = {
        contextJobs: jobs.map((job) => {
          return {
            title: job.title,
            technologies: job.technologies,
            budget: job.budget,
            description: job.description,
            contact_email: job.contact_email,
          };
        }),
      };
      res.render("jobs", { jobs: context.contextJobs });
    })
    .catch((err) => console.log("Error: " + err))
);

//Display add job form
router.get("/add", (req, res) => res.render("add"));

//add a job
router.post("/add", (req, res) => {
  let { title, technologies, budget, description, contact_email } = req.body;
  let errors = [];

  //validation of fields
  if (!title) {
    errors.push({ text: "please add a title" });
  }

  if (!technologies) {
    errors.push({ text: "please add the required technologies" });
  }

  if (!description) {
    errors.push({ text: "please add a description of your job offer" });
  }

  if (!contact_email) {
    errors.push({ text: "please add a contact email" });
  }

  //check for errors
  if (errors.length == 0) {
    //make lower case and remove spaces
    technologies = technologies.toLowerCase().replace(/,[ ]+/g, ",");
    //insert into the table
    Job.create({
      title: title,
      technologies: technologies,
      budget: budget,
      description: description,
      contact_email: contact_email,
    })
      .then((job) => res.redirect("/jobs"))
      .catch((err) => console.log(err));
  } else {
    res.render("add", {
      errors,
      title,
      technologies,
      budget,
      description,
      contact_email,
    });
  }
});

//Search for jobs

router.get("/search", (req, res) => {
  //we get the search data from the url
  let { term } = req.query;
  term = term.toLowerCase();
  
  Job.findAll({ where: { technologies: { [Op.like]: "%" + term + "%" } } })
    .then((filteredJobs) => {
      //this step is done because of Handlebars ""own property" of its parent." error
      const context = {
        contextJobs: filteredJobs.map((job) => {
          return {
            title: job.title,
            technologies: job.technologies,
            budget: job.budget,
            description: job.description,
            contact_email: job.contact_email,
          };
        }),
      };
      res.render("jobs", { jobs: context.contextJobs });
    })
    .catch((err) => console.log(err));
});

module.exports = router;
