-- Create the table that contains all the users
CREATE TABLE IF NOT EXISTS `registration_list`(
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) NOT NULL,
    `email` varchar(255) NOT NULL,
    `password` varchar(255) NOT NULL,
    `phone` varchar(255) NOT NULL,
    `is_admin` tinyint DEFAULT '0',
    PRIMARY KEY (`id`), -- Corrected PRIMARY KEY syntax
    UNIQUE KEY `email_UNIQUE` (`email`),
    UNIQUE KEY `phone_UNIQUE` (`phone`)
);

-- Insert the default admin user inside the table if it doesn't already exist
INSERT INTO registration_list (name, email, password, phone, is_admin) 
SELECT 'admin', 'admin@admin.org', 'admin', '0000000000', 1
WHERE NOT EXISTS (
    SELECT 1 FROM registration_list WHERE email = 'admin@admin.org'
);