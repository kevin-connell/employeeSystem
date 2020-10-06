USE eSys_db;

INSERT INTO department(name) VALUES("Accounting") , ("Sales"), ("Shipping");
INSERT INTO role(title, salary, department_id) VALUES("Accountant", 112000, 1), ("Lead Accountant", 158000, 1), ("Salesperson", 78000, 2), ("Lead Salesperson", 115000, 2),
("Shipper", 53000, 3), ("Lead Shipper", 92000, 3);
INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES("John", "Smith", 2, null), ("Jane", "Noobie", 1, 1), ("Panda", "Johnson", 4, null), ("Wilson", "Garble", 3, 3), ("Gerta", "Parton", 6, null) , ("Georp", "Tondlin", 5, 5); 