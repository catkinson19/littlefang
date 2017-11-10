DROP DATABASE IF EXISTS littlefang;
CREATE DATABASE littlefang;
USE littlefang;

-- Create the table tasks.
CREATE TABLE attack_successful
(
attack_id int NOT NULL AUTO_INCREMENT,
element_id varchar(255) NOT NULL,
url varchar(255) NOT NULL,
form_id varchar(255) NOT NULL,
attack_type_id int NOT NULL,
PRIMARY KEY (attack_id)
);

CREATE TABLE attack_type_cd
(
attack_type_id int NOT NULL,
attack_name varchar(255) NOT NULL,
PRIMARY KEY (attack_type_id)
);

-- Seeds
INSERT INTO attack_type_cd (attack_type_id, attack_name) VALUES (1, 'jquery_1');
INSERT INTO attack_type_cd (attack_type_id, attack_name) VALUES (2, 'src_1');

-- Query
SELECT attack_id, element_id, url, attack_successful.attack_type_id, attack_name
FROM attack_successful
LEFT JOIN attack_type_cd ON attack_successful.attack_type_id = attack_type_cd.attack_type_id;
