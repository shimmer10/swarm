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

  addTeam: function(teamData) {
    return axios.post("/api/teams", teamData);
  },

  updateEmployee: function(id, employeeData) {
    return axios.put("/api/employees/" + id, employeeData);
  },

  getTeamByTeamName: function(teamName) {
    return axios.get("/api/teams/team/" + teamName);
  },

  getSessionByTeamNameAndDate: function(teamName, sessionDate) {
    return axios.get("/api/sessions/team/" + teamName + "/" + sessionDate);
  },

  deleteEmployee: function(id) {
    return axios.delete("/api/employees/" + id);
  },

  getSessionByTeamNameAndDateRange: function(teamName, lowDate, highDate) {
    return axios.get("/api/sessions/range/" + teamName + "/" + lowDate + "/" + highDate);
  }

};
