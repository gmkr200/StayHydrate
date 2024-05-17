CREATE DATABASE IF NOT EXISTS stayhydrate;

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name varchar(255),
    email varchar(255),
    password varchar(255),
    is_admin int DEFAULT 0, -- 0->
    is_verified boolean,
	is_disabled int DEFAULT 0,
	token text,
    last_login timestamp,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS password_resets (
    id SERIAL PRIMARY KEY,
	email varchar(255),
	token text,
    created_at timestamp DEFAULT CURRENT_TIMESTAMP)

SELECT * FROM users ORDER BY id ASC

update users set is_verified=null where email='jettysampath1426@gmail.com'

delete from users where email='jettysampath1426@gmail.com';

SELECT * FROM password_resets ORDER BY id ASC

delete from users;
delete from password_resets;