# Unit 12 MySQL Homework: Employee Tracker

## Objective
Design the following database schema containing three tables:

* **department**:

  * **id** - INT PRIMARY KEY
  * **name** - VARCHAR(30) to hold department name

* **role**:

  * **id** - INT PRIMARY KEY
  * **title** -  VARCHAR(30) to hold role title
  * **salary** -  DECIMAL to hold role salary
  * **department_id** -  INT to hold reference to department role belongs to

* **employee**:

  * **id** - INT PRIMARY KEY
  * **first_name** - VARCHAR(30) to hold employee first name
  * **last_name** - VARCHAR(30) to hold employee last name
  * **role_id** - INT to hold reference to role employee has
  * **manager_id** - INT to hold reference to another employee that manages the employee being Created. This field may be null if the employee has no manager
  
Build a command-line application that at a minimum allows the user to:

  * Add departments, roles, employees

  * View departments, roles, employees

  * Update employee roles

</br>

  ## Screenshot
  ![Database](Assets/screenshot.jpg)

</br>

  ## Demo
  ![Demo](Assets/demo.gif)

</br>

## Links
[Demo Video](https://drive.google.com/file/d/1-UHkm6sj3t_NdKqC9RfAYcN6x3Th02tz/view) 

[GitHub repository](https://github.com/hanhle1989/MySQL_Employee_Tracker)