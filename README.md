# DoesItGo
Weather app and paragliding/speedflying launch database for checking weather conditions.
Created using Postgresql/Express/Node/React (PERN)

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Features](#features)

## General info
This web application was made out of a need to have weather forecasts for several locations available on one display page.
Before, one would have to visit the individual weather forecasts of several locations idividually.
Now all the pertinant weather info (and technical info) for launches in an area are on one page, saving time.
	
## Technologies
Project is created with:
* Postgresql
* Express
* React
* Node
* Several dependancies (Formik, Yup, React Router)
	
## Features
**Launch Weather Display:** Shows all the launches in the database based on state. State selection is on left side bar, making accessing different states very fast.
<br />
<br />
**Individual Launch Pages:** When you click on a launch card in the weather display you are taken to that launch's about page. Lists details about the launch such as hiking time, elevation, and launch direction.
<br />
<br />
**Submit/Edit/Delete:** Ability to add launches to the database, which then automatically begins reporting weather condition forecasts for that launch on the weather display page. Edit and Delete launches that need to be changed or removed.
<br />
<br />
**Acceptable Conditions Checker:** Weather forecasts displayed for launches will automatically guage whether those conditionans are acceptable for flying. If they are, the numbers will display green. If not, they will be red.
<br />
<br />
**Automatic Time Forecasting:** The app automatically gets the next availabe flying time (morning or evening) and displays the forecasted conditions for that time. 
<br />
Ex. If it is the middle of the day, the app will show the forecast for that evening and then the next morning.
<br />

##TODO
<br />
*Add admin credentials for ability to create POST/PUT/DELETE requests
<br />
*Add better styling
<br />
*Add image storing capabilities for photos of launches and their flights

##BUGS
