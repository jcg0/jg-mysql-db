INSERT INTO department (name)
VALUES ("Customer Service"),
       ("Bakery"),
       ("Deli"),
       ("Produce"),
       ("Meat & Seafood"),
       ("Grocery"),
       ("Pharmacy");

INSERT INTO role (title, salary, department_id)
VALUES ("Produce Manager", 70000.00, 4),
       ("Assistant Produce Manager", 45000.00, 4),
       ("Produce Clerk", 30000.00, 4),
       ("Bakery Manager", 70000.00, 2),
       ("Assistant Bakery Manager", 45000.00, 2),
       ("Bakery Clerk", 30000.00, 2),
       ("Deli Manager", 70000.00, 3),
       ("Assistant Deli Manager", 45000.00, 3),
       ("Deli Clerk", 30000.00, 3),
       ("Customer Service Manager", 70000.00, 1),
       ("Customer Service Clerk", 30000.00, 1),
       ("Meat Manager" , 70000.00, 5),
       ("Assistant meat Manager", 45000.00, 5),
       ("Meat Clerk", 30000.00, 5),
       ("Grocery Manager", 70000.00, 6),
       ("Assistant Grocery Manager", 45000.00, 6),
       ("Grocery Clerk", 30000.00, 6),
       ("Pharmacy Manager", 70000.00, 7),
       ("Assistant Pharmacy Manager", 45000.00, 7),
       ("Pharmacy Clerk", 30000.00, 7);

INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Jefferson", "Griebel", 4),
       ("Ron", "Riggle", 1),
       ("Bob", "Ryan", 2),
       ("Ryen", "Williams", 3),
       ("Marcus", "Brown", 4);


