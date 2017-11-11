---------
-- DEV --
---------

DROP DATABASE IF EXISTS littlefang;
CREATE DATABASE littlefang;
USE littlefang;


CREATE TABLE launched_attacks
(
id int NOT NULL AUTO_INCREMENT,
attack_id varchar(255) NOT NULL,
form_id varchar(255) NOT NULL,
element_id varchar(255) NOT NULL,
url varchar(255) NOT NULL,
attack_successful BOOLEAN DEFAULT 0,
created_at timestamp default current_timestamp, 
PRIMARY KEY (id)
);


select *
from launched_attacks

---------
-- PROD --
---------

USE uptq3nh7qla5rxs0;

DROP TABLE launched_attacks;
CREATE TABLE launched_attacks
(
id int NOT NULL AUTO_INCREMENT,
attack_id varchar(255) NOT NULL,
form_id varchar(255) NOT NULL,
element_id varchar(255) NOT NULL,
url varchar(255) NOT NULL,
attack_successful BOOLEAN DEFAULT 0,
created_at timestamp default current_timestamp, 
PRIMARY KEY (id)
);
