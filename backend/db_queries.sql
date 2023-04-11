-- Create project database
-- the database name is preffixed automatically by
-- the website id (id20543364 in this case) by 000webhost
CREATE DATABASE IF NOT EXISTS scandiweb_test_db;

-- Connect to the database
USE id20543364_scandiweb_test_db;

-- Create tables for different product types
CREATE TABLE IF NOT EXISTS id20543364_scandiweb_test_db.dvd(
  sku VARCHAR(50) NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price FLOAT NOT NULL DEFAULT 1,
  size FLOAT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS id20543364_scandiweb_test_db.book(
  sku VARCHAR(50) NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price FLOAT NOT NULL DEFAULT 1,
  weight FLOAT NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS id20543364_scandiweb_test_db.furniture(
  sku VARCHAR(50) NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  price FLOAT NOT NULL DEFAULT 1,
  height FLOAT NOT NULL DEFAULT 0,
  width FLOAT NOT NULL DEFAULT 0,
  length FLOAT NOT NULL DEFAULT 0
);

-- Insert mock data to database
INSERT INTO id20543364_scandiweb_test_db.book
VALUES
  ("GGWES5E7D", "Inspired", 120, 0.8),
  ("GGW0RFZ85", "Thrive", 75, 0.5),
  ("GGW6MP60E", "The Lord Of Rings", 275, 2.2);

INSERT INTO id20543364_scandiweb_test_db.dvd
VALUES
  ("JVC0RFZ85", "Spartacus", 23, 756),
  ("JVC865R8F", "Who am I", 86, 1024),
  ("JVC6MP60E", "The Choice", 45.99, 848);

INSERT INTO id20543364_scandiweb_test_db.furniture
VALUES
  ("TR1865R8F", "10 Super Markers", 210, 15, 15, 20),
  ("TR15W5JKU", "1000 A4 ream", 150, 5, 22, 29.5),
  ("TR16MP60E", "Paper clipper", 50, 2.5, 10, 20);
