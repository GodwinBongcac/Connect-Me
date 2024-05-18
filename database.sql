CREATE DATABASE ConnectMe;

USE db_contact;

CREATE TABLE tbl_contact (
    Id INT(11) NOT NULL AUTO_INCREMENT,
    fldName VARCHAR(255) NOT NULL,
    fldEmail VARCHAR(255) NOT NULL,
    fldPhone VARCHAR(20) NOT NULL,
    fldMessage TEXT NOT NULL,
    PRIMARY KEY (Id)
);
INSERT INTO tbl_contact (fldName, fldEmail, fldPhone, fldMessage) VALUES ('John Doe', 'john.doe@example.com', '123-456-7890', 'This is a test message.');

USE database.sql;

INSERT INTO messages (name, email, message)
VALUES ('John Doe', 'john.doe@example.com', 'Hello, this is a test message!');

USE database.sql;

INSERT INTO messages (name, email, message)
VALUES
    ('John Doe', 'john.doe@example.com', 'Hello, this is a test message!'),
    ('Jane Doe', 'jane.doe@example.com', 'Hi there, this is another test message!'),
    ('Bob Smith', 'bob.smith@example.com', 'Hey, this is my test message!');

    