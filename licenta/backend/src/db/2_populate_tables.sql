USE library;

INSERT IGNORE INTO account_statuses (`status`)
VALUES ("ACTIVE"), ("WAITING FOR APPROVE"), ("BANNED");

INSERT IGNORE INTO order_statuses (`status`)
VALUES ("APPROVED"), ("PROCESSING"), ("DENIED");

INSERT IGNORE INTO extend_statuses (`status`)
VALUES ("APPROVED"), ("WAITING FOR APPROVE"), ("DENIED");

INSERT IGNORE INTO roles (`role`)
VALUES ("ADMIN"), ("READER");

INSERT IGNORE INTO genres (genre)
VALUES ("FICTIUNE"), ("POLITIST"), ("DRAMA"),
("POEZIE"), ("BIOGRAFIE"), ("AVENTURA"); -- etc

INSERT IGNORE INTO users
SET
	email = "admin@admin.com",
    name_surname = "Admin",
    phone = "0712345678",
    `password` = "$2a$10$4BQE6CSfoY2Q3Tb2xE5FpOE3gQpoQwUaZznzfbmg16eAGMfuUHwre", -- admin
    pin = "$2a$10$yxZXivOwXaSzEP233k3YyOcwBxBF3Rm3yBozlY6y3RNtkKhlfAUUW", -- 1234
    role_id = (SELECT id FROM roles WHERE `role` = "ADMIN"),
    status_id = (SELECT id FROM account_statuses WHERE `status` = "ACTIVE");
INSERT IGNORE INTO users
SET
	email = "antonio@conache.com",
    name_surname = "Antonio Conache",
    phone = "0761646160",
    `password` = "$2a$10$aZgn1nfMqHb9OX3TGDG80eRUwZG7wc5r/4hInLYV3disp4zCFkM86", -- parola
    pin = "$2b$10$TJIG44svPDKtA2p5m9xlPutYtp/b7qg3MbPLoBh94Fn1LjHh9jVj2", -- 0000
    role_id = (SELECT id FROM roles WHERE `role` = "READER"),
    status_id = (SELECT id FROM account_statuses WHERE `status` = "ACTIVE");
INSERT IGNORE INTO users
SET
	email = "user@user.com",
    name_surname = "User",
    phone = "0721123456",
    `password` = "$2a$10$5lA1bDqmlYprSTilJ6p8he6bhQ3fRJIOQy8mKwdswXjzbKJzfffem", -- user
    pin = "$2b$10$XymkwqDP/Oobpi6iRyjc3ueOHwAgJpgv3FllsAoNc4kwhuMC8HN1K", -- 1111
    role_id = (SELECT id FROM roles WHERE `role` = "READER"),
    status_id = (SELECT id FROM account_statuses WHERE `status` = "WAITING FOR APPROVE");
INSERT IGNORE INTO users
SET
	email = "madalin@yahoo.com",
    name_surname = "Madalin Voicu",
    phone = "0745876999",
    `password` = "$2a$10$D1tGtp4HdzCYCWzXuNUI3.pZTFvwI8pDBK7NblDu2G042quhmrMPi", -- madalin
    pin = "$2b$10$h8P70//y79hUQ7b1L/LHP.Fjp1gpGgrl43DaGR/qH0hJGeGzDjDQu", -- 2222
    role_id = (SELECT id FROM roles WHERE `role` = "READER"),
    status_id = (SELECT id FROM account_statuses WHERE `status` = "BANNED");

-- add a few books
INSERT IGNORE INTO book_details
SET
    title = "Demonii",
    author = "F.M.Dostoievski",
    `description` = "Demonii reprezinta un apogeu al figurilor imperfecte si intunecate, angrenate in lupta pentru identitate",
    `genre_id` = (SELECT id FROM genres WHERE genre = "DRAMA");
INSERT IGNORE INTO books
SET
    ISBN = 9783161484100,
    `year` = 2021,
    pages = 920,
    book_id = (SELECT id FROM book_details WHERE title = "Demonii" AND author = "F.M.Dostoievski");

INSERT IGNORE INTO book_details
SET
    title = "Povestea lui Harap Alb",
    author = "Ion Creanga",
    `description` = "Basm cult, pentru copii, aparuta in revista Convorbiri literare",
    `genre_id` = (SELECT id FROM genres WHERE genre = "FICTIUNE");
INSERT IGNORE INTO books
SET
    ISBN = 9783161484101,
    `year` = 1877,
    pages = 187,
    book_id = (SELECT id FROM book_details WHERE title = "Povestea lui Harap Alb" AND author = "Ion Creanga");

INSERT IGNORE INTO book_details -- 2 books of this kind
SET
    title = "Sherlock Holmes",
    author = "Christian Klaver",
    `description` = "Povestea lui Sherlock Holmes si a colegului sau, domnul Hyde",
    `genre_id` = (SELECT id FROM genres WHERE genre = "POLITIST");
INSERT IGNORE INTO books
SET
    ISBN = 9783161484102,
    `year` = 2020,
    pages = 458,
    book_id = (SELECT id FROM book_details WHERE title = "Sherlock Holmes" AND author = "Christian Klaver");
INSERT IGNORE INTO books
SET
    ISBN = 9783161484103,
    `year` = 2020,
    pages = 458,
    book_id = (SELECT id FROM book_details WHERE title = "Sherlock Holmes" AND author = "Christian Klaver");

INSERT IGNORE INTO book_details
SET
    title = "Vincent Van Gogh",
    author = "Pierre Leprehon",
    `description` = "Viata si arta lui Vincent Van Gogh",
    `genre_id` = (SELECT id FROM genres WHERE genre = "BIOGRAFIE");
INSERT IGNORE INTO books
SET
    ISBN = 9783161484104,
    `year` = 2019,
    pages = 286,
    book_id = (SELECT id FROM book_details WHERE title = "Vincent Van Gogh" AND author = "Pierre Leprehon");

INSERT IGNORE INTO book_details
SET
    title = "Monet",
    author = "Christoph Heinrich",
    `description` = "Viata si arta lui Claude Monet",
    `genre_id` = (SELECT id FROM genres WHERE genre = "BIOGRAFIE");
INSERT IGNORE INTO books
SET
    ISBN = 9783161484105,
    `year` = 2014,
    pages = 350,
    book_id = (SELECT id FROM book_details WHERE title = "Monet" AND author = "Christoph Heinrich");

