# DoesItGo
Weather app and paragliding/speedflying launch database for checking weather conditions.
Created using Postgresql/Express/Node/React (PERN)

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Features](#features)
* [Todo](#todo)
* [Bugs](#bugs)
* [Screenshots](#screenshots)

## General info
This web application was made out of a need to have weather forecasts for several locations available on one display page.
Before, one would have to visit the individual weather forecasts of several locations individually.
Now all the pertinent weather info (and technical info) for launches in an area are on one page, saving time.
	
## Technologies
Project is created with:
* PostgreSQL
* Express
* React
* Node
* Several dependencies (Formik, Yup, React Router)
	
## Features
**Launch Weather Display:** Shows all the launches in the database based on state. State selection is on left side bar, making accessing different states very fast.
<br />
<br />
**Individual Launch Pages:** When you click on a launch card in the weather display you are taken to that launch's about page. List details about the launch such as hiking time, elevation, and launch direction.
<br />
<br />
**Submit/Edit/Delete:** Ability to add launches to the database, which then automatically begins reporting weather condition forecasts for that launch on the weather display page. Edit and Delete launches that need to be changed or removed.
<br />
<br />
**Acceptable Conditions Checker:** Weather forecasts displayed for launches will automatically gauge whether those conditions are acceptable for flying. If they are, the numbers will display green. If not, they will be red.
<br />
<br />
**Automatic Time Forecasting:** The app automatically gets the next available flying time (morning or evening) and displays the forecast conditions for that time. 
<br />
Ex. If it is the middle of the day, the app will show the forecast for that evening and then the next morning.
<br />

## TODO
* Add admin credentials for ability to create POST/PUT/DELETE requests
* Add better styling
* Add image storing capabilities for photos of launches and their flights
* Have forms redirect to the home page after submitting, editing or deleting
* Security

## BUGS
* Refreshing the launch page resets the id state which keeps the get request from working, thus clearing out all information about the launch.
* All launches in the database are fetched when entering the site. I did this on purpose but now would change it to only fetching the launches in the state you have selected. Hopefully this would reduce response time in the beginning.

## Screenshots
A view of the home page. Select a state on the left to see the launches and their weather conditions.
![image](https://user-images.githubusercontent.com/85317430/218202758-d05ad217-2b43-429c-b257-0a3f48d8a75f.png)
<br />
After clicking Submit in the top right corner you will see this page, where you can submit a launch. Certain parameters are required. This will be behind an admin login in the future.
![image](https://user-images.githubusercontent.com/85317430/218202975-ff32ac53-9d6f-425c-a03a-d9bf805a0f39.png)
<br />
When the launch is submitted it is automatically added to the home page with its weather conditions displayed.
![image](https://user-images.githubusercontent.com/85317430/218203798-169a144d-ed07-4d39-a012-5ee1317f0cab.png)
<br />
Clicking on a launch will take you to its own individual page where it displays about and technical info. From here you can also click to edit button to edit the launch info or delete it from the database.
![image](https://user-images.githubusercontent.com/85317430/218204017-b6b300cf-8bdf-4072-a3fb-bda46d012758.png)
