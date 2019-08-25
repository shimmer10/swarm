/********************************
  * API.js for Swarm
  * 
  * Build http requests from react with axios
  * 
  * @author Scrumblebees
  * 
  * 2019-08-21
  ********************************/

import axios from "axios";

export default {
  // Saves employee info to the database
  register: function (registerData) {
    return axios.post("/api/employees/register", registerData);
  },

  // verifies employee login info in the database
  login: function (loginData) {
    return axios.post("/api/employees/login", loginData);
  },

  getEmployees: function() {
    return axios.get("/api/employees");
  },

  getTeams: function() {
    return axios.get("/api/teams");
  },

  getTeamByTeamName: function(teamName) {
    return axios.get("/api/teams/team/" + teamName);
  }
};
