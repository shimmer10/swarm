
![Giftastic gif Generator](./client/src/images/SWARMLogo.png)

## **SWARM (Standup With A Remote Motif) is a site intended to solve the issues that arise from having remote teams and team members**

## **SWARM allows you to create your use, choose your role, and deliver information based on the information**
## Developers: Scrumblebees (Brenda, Jenn, Bethany, Sean)

## **Link to Heroku deployed site: https://cryptic-harbor-20380.herokuapp.com**

### **The site opens at the landing page with '/'**
    * The page renders displaying the logo
    * The logo is presented on the Nav bar at all times and the following options are available
        * Developers - dropdown displaying developers with links to portfolios
    * The sign-in/sign-up
### **If the user clicks 'Sign-in/Sign-up' they are brought to '/loginscreen'**
    * The login site opens to '/loginscreen'
    * Two options are available for the user
        * Sign-in and Sign-up
    * If the user is new to the site they can Sign-up
    * If the user has already signed-up they can sign in using email and password
### **Once they Sign-in or Sign-up they are directed to '/home'**
    * At the home page the user is asked to enter a team name and date to view the session
    * The team names are grabed using an API call that queries the database to retrieve all available teams
    * Once the team and date are chosen, upon hitting the submit button, the session for the chosen team and date will render
    * Cards will be created for all members on the team for that date. 
    * Status - Status is rendered using an API call to get the session, session includes the team members and statuses:
        * If the user has entered a status for the day you can view it on the card
        * If the user has not entered a status for the day text fields/options will be available for them to enter one
            * When the user clicks the submit button to enter their status, an API call is made to save that status to the member for the session
### **NavBar after Sign-in**
    * If role is Developer the NavBar contains links to:
        * Developers, Home, Report, and 'Logout for {firstName lastName}'
    * If role is Scrum Master the NavBar contains all that the devoper has and additionally:
        * Admin
### **The Report link leads to '/report'**
    * On the Report page the user is prompted for a team and a date range
    * When a team and date range have been chosen and the submit button is hit, a report showing statuses for members during that time is rendered
    * Statuses are divided into red (blocked), yellow (impeded), green (clear), and gray (unreported)
    * The user can select 'Exit' to select a new team and date range.
### **The Admin link leads to '/admin'**
    * On the admin page the Scrum Master can manage people and teams
    * If they choose to manage people:
        * The Scrum Master clicks on the employee name they want to manage
        * They can then update the first name, last name, email, and/or role
        * They can also delete an employee
    * If they choose to manage teams:
        * The Scrum master can either choose a team from the menu or enter a new team name in the textbox to create a new team
        * If they choose an existing team:
            * The team information will open up
            * All existing members are rendered in the 'Team Members' section on the right-hand side
                * They can remove a team member by clicking on their name
                * Clicking their name will move them to the 'Employees' section on the left-hand side
                * After they have made their changes they select the 'Save' button to save or 'Exit' to cancel changes
            * All available Employees not on the team already are listed in the 'Employees' section on the left-hand side
                * They can add an employee to the team by clicking their name
                * Clicking their name will move them to the 'Team Members' section on the right-hand side
                * After they have made their changes they select the 'Save' button to save or 'Exit' to cancel changes
        * If they choose to create a new team
            * They enter the team name in the textbox and click 'New Team'
            * All available employees are then rendered on the screen in the 'Employee' section on the left-hand side
            * They can add an employee by clicking their name
            * Clicking their name will move them to the 'Team Members' section on the right-hand side
            * After they have made their changes they select the 'Save' button to save or 'Exit' to cancel changes
### **Enhancements**

-------------------------------------------------------------------------------------

# Create React Express App

## About This Boilerplate

This setup allows for a Node/Express/React app which can be easily deployed to Heroku.

The front-end React app will auto-reload as it's updated via webpack dev server, and the backend Express app will auto-reload independently with nodemon.

## Starting the app locally

Start by installing front and backend dependencies. While in this directory, run the following command:

```
npm install
```

This should install node modules within the server and the client folder.

After both installations complete, run the following command in your terminal:

```
npm start
```

Your app should now be running on <http://localhost:3000>. The Express server should intercept any AJAX requests from the client.

## Deployment (Heroku)

To deploy, simply add and commit your changes, and push to Heroku. As is, the NPM scripts should take care of the rest.
