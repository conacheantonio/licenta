USE library;

CREATE TABLE IF NOT EXISTS account_statuses (
    id int PRIMARY KEY AUTO_INCREMENT,
    `status` varchar(255) UNIQUE NOT NULL
);
CREATE TABLE IF NOT EXISTS order_statuses LIKE account_statuses;
CREATE TABLE IF NOT EXISTS extend_statuses LIKE account_statuses;
CREATE TABLE IF NOT EXISTS roles (
    id int PRIMARY KEY AUTO_INCREMENT,
    `role` varchar(255) UNIQUE NOT NULL
);
CREATE TABLE IF NOT EXISTS genres (
    id int PRIMARY KEY AUTO_INCREMENT,
    genre varchar(255) UNIQUE NOT NULL
);
--
CREATE TABLE IF NOT EXISTS books (
    ISBN bigint PRIMARY KEY,
    book_id int NOT NULL,
    `year` int,
    pages int
);

CREATE TABLE IF NOT EXISTS book_details (
    title varchar(255) NOT NULL,
    author varchar(255) NOT NULL,
    id int UNIQUE NOT NULL AUTO_INCREMENT,
    `description` varchar(255),
    `genre_id` int NOT NULL,
    PRIMARY KEY (title, author),
    FOREIGN KEY (`genre_id`) REFERENCES genres(id)
);

CREATE TABLE IF NOT EXISTS users (
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email varchar(255) UNIQUE NOT NULL,
    `name_surname` varchar(255) NOT NULL,
    phone char(10) UNIQUE NOT NULL,
    `password` varchar(255) NOT NULL,
    pin varchar(255) NOT NULL,
    `role_id` int NOT NULL,
    `status_id` int NOT NULL ,
    FOREIGN KEY (`role_id`) REFERENCES roles(id),
    FOREIGN KEY (`status_id`) REFERENCES account_statuses(id)
);

CREATE TABLE IF NOT EXISTS orders (
    id int PRIMARY KEY AUTO_INCREMENT,
    `user_id` int NOT NULL,
    `date_created` timestamp NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS order_contents (
    id int PRIMARY KEY AUTO_INCREMENT,
    `order_id` int NOT NULL,
    ISBN bigint NOT NULL,
    `order_status_id` int NOT NULL,
    `extension_status_id` int DEFAULT null,
    `start_date` timestamp DEFAULT null,
    `return_date` timestamp DEFAULT null, 
    FOREIGN KEY (ISBN) REFERENCES books(ISBN),
    FOREIGN KEY (`order_id`) REFERENCES orders(id),
    FOREIGN KEY (`order_status_id`) REFERENCES order_statuses(id),
    FOREIGN KEY (`extension_status_id`) REFERENCES extend_statuses(id)
);
