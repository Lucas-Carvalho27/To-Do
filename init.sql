-- initializing tables

CREATE TABLE User (
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL
);

CREATE TABLE Day (
    DayID INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20) NOT NULL
);

CREATE TABLE TaskList (
    TaskListID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT,
    DayID INT,
    name VARCHAR(100) NOT NULL,
    parentId INT DEFAULT NULL,
    complete BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (UserID) REFERENCES User(UserID) ON DELETE CASCADE,
    FOREIGN KEY (DayID) REFERENCES Day(DayID) ON DELETE CASCADE,
    FOREIGN KEY (parentId) REFERENCES TaskList(TaskListID) ON DELETE CASCADE
);



CREATE TABLE Tasks (
    TaskID INT PRIMARY KEY AUTO_INCREMENT,
    TaskListID INT,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    complete BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (TaskListID) REFERENCES TaskList(TaskListID) ON DELETE CASCADE
);


INSERT INTO Day (name) VALUES 
('Monday'), ('Tuesday'), ('Wednesday'), 
('Thursday'), ('Friday'), ('Saturday'), ('Sunday');