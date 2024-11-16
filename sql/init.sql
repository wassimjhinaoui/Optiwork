-- Create the 'employees' table
CREATE TABLE employees (
  id BIGINT PRIMARY KEY,
  name VARCHAR(255),
  email VARCHAR(255),
  pass VARCHAR(255),
  skills VARCHAR(255)
);

-- Create the 'skills' table 
CREATE TABLE skills (
  id BIGINT PRIMARY KEY,
  name VARCHAR(255)
);

-- Create the 'tasks' table
CREATE TABLE tasks (
  id BIGINT PRIMARY KEY,
  empId BIGINT,
  weight BIGINT,
  description VARCHAR(255),
  state ENUM('open', 'in_progress', 'completed'),
  skills BIGINT,
  name VARCHAR(255),
  dateId BIGINT,
  FOREIGN KEY (empId) REFERENCES employees(id),
  FOREIGN KEY (skills) REFERENCES skills(id),
  FOREIGN KEY (dateId) REFERENCES dates(id)
);

-- Create the 'dates' table
CREATE TABLE dates (
  id BIGINT PRIMARY KEY,
  issued DATETIME,
  started DATETIME,
  finished DATETIME,
  deadline DATETIME,
  taskId BIGINT,
  FOREIGN KEY (taskId) REFERENCES tasks(id)
);

-- Create the 'breaks' table
CREATE TABLE breaks (
  id BIGINT PRIMARY KEY,
  duration TIMESTAMP,
  empId BIGINT,
  start DATETIME,
  end DATETIME,
  FOREIGN KEY (empId) REFERENCES employees(id)
);

-- Create the 'requests' table
CREATE TABLE requests (
  id BIGINT PRIMARY KEY,
  type VARCHAR(255),
  name VARCHAR(255),
  empId BIGINT,
  Description VARCHAR(255),
  state ENUM('pending', 'approved', 'rejected'),
  FOREIGN KEY (empId) REFERENCES employees(id)
);


-- Insert sample data into the 'employees' table
INSERT INTO employees (id, name, email, pass, skills) VALUES
  (1, 'John Doe', 'john.doe@example.com', 'password123', 'programming,design'),
  (2, 'Jane Smith', 'jane.smith@example.com', 'secret456', 'marketing,sales'),
  (3, 'Bob Johnson', 'bob.johnson@example.com', 'qwerty789', 'accounting,finance');

-- Insert sample data into the 'skills' table
INSERT INTO skills (id, name) VALUES
  (1, 'programming'),
  (2, 'design'),
  (3, 'marketing'),
  (4, 'sales'),
  (5, 'accounting'),
  (6, 'finance');

-- Insert sample data into the 'tasks' table
INSERT INTO tasks (id, empId, weight, description, state, skills, name, dateId) VALUES
  (1, 1, 100, 'Develop new website', 'in_progress', 1, 'Website Development', 1),
  (2, 2, 50, 'Create marketing campaign', 'open', 3, 'Marketing Campaign', 2),
  (3, 1, 75, 'Design user interface', 'completed', 2, 'UI Design', 3);

-- Insert sample data into the 'dates' table
INSERT INTO dates (id, issued, started, finished, deadline, taskId) VALUES
  (1, '2023-04-01 08:00:00', '2023-04-01 09:00:00', '2023-04-30 18:00:00', '2023-04-30 23:59:59', 1),
  (2, '2023-05-01 10:00:00', '2023-05-02 08:00:00', '2023-05-31 17:00:00', '2023-05-31 23:59:59', 2),
  (3, '2023-03-15 12:00:00', '2023-03-16 09:00:00', '2023-03-31 17:00:00', '2023-03-31 23:59:59', 3);

-- Insert sample data into the 'breaks' table
INSERT INTO breaks (id, duration, empId, start, end) VALUES
  (1, '01:00:00', 1, '2023-04-01 12:00:00', '2023-04-01 13:00:00'),
  (2, '00:30:00', 2, '2023-05-03 11:30:00', '2023-05-03 12:00:00'),
  (3, '00:45:00', 1, '2023-04-15 14:15:00', '2023-04-15 15:00:00');

-- Insert sample data into the 'requests' table
INSERT INTO requests (id, type, name, empId, Description, state) VALUES
  (1, 'vacation', 'Summer Vacation', 1, 'Request for 2 weeks of vacation', 'pending'),
  (2, 'sick_leave', 'Flu', 2, 'Request for 3 days of sick leave', 'approved'),
  (3, 'personal_day', 'Family event', 3, 'Request for 1 personal day', 'rejected');
