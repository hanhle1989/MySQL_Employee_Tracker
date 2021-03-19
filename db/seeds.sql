USE employee_db;

INSERT INTO department (name)
VALUES ("Human Resources"),
("Marketing"),
("Sale"),
("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Office Management", 80000, 1),
("Purchasing Manager", 80000, 3),
("Financial Director", 90000, 4),
("Marketing Director", 90000, 2),
("Graphic Designer", 65000, 2),
("Accountant", 60000, 4),
("Sale Associate", 50000, 3),
("Recruiter", 40000, 1);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Lisa", "Campell", 1),
("Bryan", "Hawks", 3),
("Jessica", "Hampton", 4),
("Peter", "Jogar", 2),
("Hanh", "Le", 2),
("Joe", "Morris", 4),
("Daniel", "Seger", 3),
("Sheri", "Pana", 1);

SELECT * FROM employee;