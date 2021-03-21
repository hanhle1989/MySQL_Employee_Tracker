USE employee_db;

INSERT INTO department (name)
VALUES ("Management"),
("Marketing"),
("Sale"),
("Finance");

INSERT INTO role (title, salary, department_id)
VALUES ("Office Manager", 80000, 1),
("Financial Director", 90000, 4),
("Marketing Director", 90000, 2),
("Graphic Designer", 65000, 2),
("Accountant", 60000, 4),
("Sale Associate", 50000, 3);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Lisa", "Campell", 1),
("Bryan", "Hawks", 2),
("Jessica", "Hampton", 3),
("Hanh", "Le", 4),
("Joe", "Morris", 5),
("Daniel", "Seger", 6);