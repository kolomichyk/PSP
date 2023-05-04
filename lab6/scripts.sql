CREATE TABLE IF NOT EXISTS student (
	id_student serial PRIMARY KEY,
	last_name varchar(50) NOT NULL,
	first_name varchar(50) NOT NULL
);

INSERT INTO student (last_name, first_name)
VALUES ('Kolomichyk', 'Ilya');

SELECT * FROM pg_settings WHERE name = 'port';

SELECT * FROM student;

UPDATE student SET last_name = 'Kotova', first_name = 'Nastena' WHERE id_student = 3;