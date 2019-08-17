/********************************
 * Config for Scrumblebees
 * 
 * @author Scrumblebees
 * 
 * 2019-08-17
 ********************************/

require('dotenv').config();

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": "swarm_db",
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "port": 3306,
    "operatorsAliases": false
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": "swarm_db",
    "host": process.env.DB_HOST,
    "dialect": "mysql",
    "port": 3306,
    "operatorsAliases": false
  },
  "production": {
    "use_env_variable": "JAWSDB_URL",
    "dialect": "mysql"
  }
}
