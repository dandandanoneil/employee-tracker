INSERT INTO department (name) VALUES ('Engineering');
INSERT INTO department (name) VALUES ('Sales');

INSERT INTO role (title, salary, department_id) VALUES ('Senior Engineer', 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Junior Engineer', 60000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Senior Sales Rep', 80000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Junior Sales Rep', 50000, 2);

INSERT INTO employee (first_name, last_name, role_id) VALUES ('Willem', 'Riley', 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Fannie', 'Cohen', 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Domas', 'Kent', 2, 1);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Ann', 'McDougall', 2, 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Alexa', 'Cantrell', 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Adele', 'Thornton', 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Helen', 'McCoy', 4, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Agatha', 'Weir', 4, 6);