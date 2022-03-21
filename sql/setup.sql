-- Use this file to define your SQL tables
-- The SQL in this file will be executed when you run `npm run setup-db`
DROP TABLE IF EXISTS jojos;
DROP TABLE IF EXISTS fruits;
DROP TABLE IF EXISTS birthdays;
DROP TABLE IF EXISTS berserk;
DROP TABLE IF EXISTS burgers;

CREATE TABLE jojos (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    part TEXT NOT NULL
);

CREATE TABLE fruits (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    is_stone_fruit BOOLEAN NOT NULL
);

CREATE TABLE birthdays (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    date DATE NOT NULL 
);

CREATE TABLE berserk (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    arc TEXT NOT NULL,
    arc_start INT NOT NULL,
    arc_end INT NOT NULL
);

CREATE TABLE burgers (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name TEXT NOT NULL,
    rating INT NOT NULL
)