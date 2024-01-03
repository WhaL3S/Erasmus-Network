-- Create DB
CREATE DATABASE IF NOT EXISTS erasmus;
USE erasmus;

DROP TABLE IF EXISTS Evaluation;
DROP TABLE IF EXISTS Message;
DROP TABLE IF EXISTS Application;
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS Resume;
DROP TABLE IF EXISTS Chat;
DROP TABLE IF EXISTS University_Representative;
DROP TABLE IF EXISTS Student;
DROP TABLE IF EXISTS File;
DROP TABLE IF EXISTS Course;
DROP TABLE IF EXISTS Action;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS University;
DROP TABLE IF EXISTS Reservation;
DROP TABLE IF EXISTS Client;

CREATE TABLE Client (
    name VARCHAR(255),
    id_Client INT AUTO_INCREMENT,
    PRIMARY KEY(id_Client)
);

CREATE TABLE Reservation (
    start_date DATE,
    end_date DATE,
    id_Reservation INT AUTO_INCREMENT,
    PRIMARY KEY(id_Reservation)
);

CREATE TABLE University (
    name VARCHAR(255),
    country VARCHAR(255),
    city VARCHAR(255),
    address VARCHAR(255),
    rating DOUBLE PRECISION,
    id_University INT AUTO_INCREMENT,
    PRIMARY KEY(id_University)
);

CREATE TABLE User (
    name VARCHAR(255) NULL,
    surname VARCHAR(255) NULL,
    email VARCHAR(255) NOT NULL,
    login VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    id_User INT AUTO_INCREMENT,
    PRIMARY KEY(id_User)
);


CREATE TABLE Action (
    device VARCHAR(255),
    dateTime DATETIME,
    location VARCHAR(255),
    id_Action INT AUTO_INCREMENT,
    fk_Userid_User INT NOT NULL,
    PRIMARY KEY(id_Action),
    CONSTRAINT tracks FOREIGN KEY(fk_Userid_User) REFERENCES User(id_User)
);

CREATE TABLE Course (
    name VARCHAR(255),
    semester VARCHAR(255),
    credits INT,
    description VARCHAR(255),
    module_code VARCHAR(255),
    degree VARCHAR(255),
    study_format VARCHAR(255),
    faculty VARCHAR(255),
    id_Course INT AUTO_INCREMENT,
    fk_Universityid_University INT NOT NULL,
    PRIMARY KEY(id_Course),
    CONSTRAINT provides FOREIGN KEY(fk_Universityid_University) REFERENCES University(id_University)
);

CREATE TABLE File (
    url VARCHAR(255),
    title VARCHAR(255),
    file_type VARCHAR(255),
    dateTime DATETIME,
    size FLOAT,
    id_File INT AUTO_INCREMENT,
    fk_Universityid_University INT NOT NULL,
    PRIMARY KEY(id_File),
    CONSTRAINT uploads_File FOREIGN KEY(fk_Universityid_University) REFERENCES University(id_University)
);

CREATE TABLE Student (
    passport_id VARCHAR(255),
    phone_number VARCHAR(255),
    linkedin_profile VARCHAR(255),
    id_User INT NOT NULL,
    PRIMARY KEY(id_User),
    FOREIGN KEY(id_User) REFERENCES User(id_User)
);

CREATE TABLE University_Representative (
    position VARCHAR(255),
    department VARCHAR(255),
    id_User INT NOT NULL,
    fk_Universityid_University INT NOT NULL,
    PRIMARY KEY(id_User),
    CONSTRAINT part_of FOREIGN KEY(fk_Universityid_University) REFERENCES University(id_University),
    FOREIGN KEY(id_User) REFERENCES User(id_User)
);

CREATE TABLE Chat (
    name VARCHAR(255),
    id_Chat INT AUTO_INCREMENT,
    fk_Studentid_User INT NOT NULL,
    fk_Universityid_University INT NOT NULL,
    PRIMARY KEY(id_Chat),
    CONSTRAINT creates FOREIGN KEY(fk_Studentid_User) REFERENCES Student(id_User),
    CONSTRAINT belongs FOREIGN KEY(fk_Universityid_University) REFERENCES University(id_University)
);

CREATE TABLE Resume (
    url VARCHAR(255),
    title VARCHAR(255),
    file_type VARCHAR(255),
    dateTime DATETIME,
    size FLOAT,
    id_Resume INT AUTO_INCREMENT,
    fk_Studentid_User INT NOT NULL,
    PRIMARY KEY(id_Resume),
    CONSTRAINT uploads_Resume FOREIGN KEY(fk_Studentid_User) REFERENCES Student(id_User)
);

CREATE TABLE Review (
    text VARCHAR(255),
    timeCreated DATE,
    rating INT,
    id_Review INT AUTO_INCREMENT,
    fk_Studentid_User INT NOT NULL,
    fk_Universityid_University INT NOT NULL,
    PRIMARY KEY(id_Review),
    CONSTRAINT leaves FOREIGN KEY(fk_Studentid_User) REFERENCES Student(id_User),
    CONSTRAINT displayed FOREIGN KEY(fk_Universityid_University) REFERENCES University(id_University)
);

CREATE TABLE Application (
    motivation_letter VARCHAR(255),
    status VARCHAR(255),
    dateTime DATETIME,
    id_Application INT AUTO_INCREMENT,
    fk_Studentid_User INT NOT NULL,
    fk_Resumeid_Resume INT NOT NULL,
    fk_Courseid_Course INT NOT NULL,
    PRIMARY KEY(id_Application),
    CONSTRAINT creates_Application FOREIGN KEY(fk_Studentid_User) REFERENCES Student(id_User),
    CONSTRAINT attached_to_Application FOREIGN KEY(fk_Resumeid_Resume) REFERENCES Resume(id_Resume),
    CONSTRAINT applies_to_Application FOREIGN KEY(fk_Courseid_Course) REFERENCES Course(id_Course)
);

CREATE TABLE Message (
    text VARCHAR(255),
    timeSent DATE,
    attachment VARCHAR(255),
    id_Message INT AUTO_INCREMENT,
    fk_Chatid_Chat INT NOT NULL,
    fk_Studentid_User INT NOT NULL,
    PRIMARY KEY(id_Message),
    CONSTRAINT write_Message FOREIGN KEY(fk_Chatid_Chat) REFERENCES Chat(id_Chat),
    CONSTRAINT belongs_to_Message FOREIGN KEY(fk_Studentid_User) REFERENCES Student(id_User)
);

CREATE TABLE Evaluation (
    reason VARCHAR(255),
    dateTime DATETIME,
    id_Evaluation INT AUTO_INCREMENT,
    fk_University_representativeid_User INT NOT NULL,
    fk_Applicationid_Application INT NOT NULL,
    PRIMARY KEY(id_Evaluation),
    UNIQUE(fk_Applicationid_Application),
    CONSTRAINT provides_Evaluation FOREIGN KEY(fk_University_representativeid_User) REFERENCES University_Representative(id_User),
    CONSTRAINT evaluates_Evaluation FOREIGN KEY(fk_Applicationid_Application) REFERENCES Application(id_Application)
);
