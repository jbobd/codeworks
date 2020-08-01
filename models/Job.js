const Sequelize = require("sequelize");
const db = require("../config/sequelize");

const Job = db.define("job", {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  technologies: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  budget: {
    type: Sequelize.FLOAT,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  contact_email: {
    type: Sequelize.STRING,
  },
});

module.exports = Job;
