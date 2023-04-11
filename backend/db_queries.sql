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
VALUES ("GGWES5E7D","CORS in action",49.99,0.42),
  ("GGW0RFZ85","React in action",44.99,0.62),
  ("GGW865R8F","PHP & MySQL",49.99,1.52);

INSERT INTO id20543364_scandiweb_test_db.dvd
VALUES ("JVCES5E7D", "Debesskrāpis", 28.99, 6200),
  ("JVC0RFZ85","The Mover",22.8,5000),
  ("JVC865R8F","Viļņu Varā",8.8,2048);

INSERT INTO id20543364_scandiweb_test_db.furniture
VALUES ("TR1ES5E7D","Sideboard",255,48,90,140),
  ("TR10RFZ85","Mobile Pedestal File",110,50,50,90),
  ("TR1865R8F","Twin Bed Mattress",210,26,160,200);
