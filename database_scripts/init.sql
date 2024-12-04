USE assignments;
DROP TABLE IF EXISTS assingments;
CREATE table assignments(
assignment_num INT auto_increment,
assignment varchar(255),
description varchar(255),
class varchar(255),
priority varchar(255),
date datetime,
completed boolean,

PRIMARY KEY(assignment_num)
)