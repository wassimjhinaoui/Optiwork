-- First, drop the tables in the correct order (reverse of creation) if they exist
DROP TABLE IF EXISTS `dates`;
DROP TABLE IF EXISTS `mental_health`;
DROP TABLE IF EXISTS `breaks`;
DROP TABLE IF EXISTS `skills`;
DROP TABLE IF EXISTS `requests`;
DROP TABLE IF EXISTS `Tasks`;
DROP TABLE IF EXISTS `employees`;
DROP TABLE IF EXISTS `posts`;


-- Create tables in the correct order
CREATE TABLE `posts` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL
);

CREATE TABLE `employees` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `Name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `pass` VARCHAR(255) NOT NULL,
    `postId` BIGINT UNSIGNED NULL,
    CONSTRAINT `employees_postid_foreign` 
    FOREIGN KEY (`postId`) REFERENCES `posts`(`id`)
);

CREATE TABLE `Tasks` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `state` ENUM('pending', 'done', 'in_progress') NOT NULL DEFAULT 'pending',
    `weight` BIGINT NOT NULL,
    `empId` BIGINT UNSIGNED NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL
);

CREATE TABLE `dates` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `started` DATETIME NOT NULL,
    `finished` DATETIME NOT NULL,
    `issued` DATETIME NOT NULL,
    `taskId` BIGINT UNSIGNED NOT NULL,
    `deadline` DATETIME NOT NULL
);

CREATE TABLE `skills` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `taskId` BIGINT UNSIGNED NULL,
    `name` VARCHAR(255) NOT NULL,
    `empId` BIGINT UNSIGNED NULL
);

CREATE TABLE `mental_health` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `status` FLOAT NOT NULL,
    `empId` BIGINT UNSIGNED NOT NULL,
    `date` DATETIME NOT NULL,
    `reason` LONGTEXT NULL
);

CREATE TABLE `requests` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `empId` BIGINT UNSIGNED NOT NULL,
    `type` VARCHAR(255) NOT NULL,
    `state` ENUM('pending', 'approved', 'denied') NOT NULL,
    `fromDate` DATETIME ,
    `toDate` DATETIME ,
    `Description` VARCHAR(255) NOT NULL
);

CREATE TABLE `breaks` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `start` DATETIME NOT NULL,
    `duration` TIME NOT NULL,
    `end` DATETIME NOT NULL,
    `empId` BIGINT UNSIGNED NOT NULL
);


-- Add foreign key constraints
ALTER TABLE `Tasks`
ADD CONSTRAINT `tasks_empid_foreign` 
FOREIGN KEY(`empId`) REFERENCES `employees`(`id`);

ALTER TABLE `dates`
ADD CONSTRAINT `dates_taskid_foreign` 
FOREIGN KEY(`taskId`) REFERENCES `Tasks`(`id`);

ALTER TABLE `skills`
ADD CONSTRAINT `skills_taskid_foreign` 
FOREIGN KEY(`taskId`) REFERENCES `Tasks`(`id`),
ADD CONSTRAINT `skills_empid_foreign` 
FOREIGN KEY(`empId`) REFERENCES `employees`(`id`);

ALTER TABLE `mental_health`
ADD CONSTRAINT `mental_health_empid_foreign` 
FOREIGN KEY(`empId`) REFERENCES `employees`(`id`);

ALTER TABLE `requests`
ADD CONSTRAINT `requests_empid_foreign` 
FOREIGN KEY(`empId`) REFERENCES `employees`(`id`);

ALTER TABLE `breaks`
ADD CONSTRAINT `breaks_empid_foreign` 
FOREIGN KEY(`empId`) REFERENCES `employees`(`id`);



-- Insert Posts (Job Positions)
INSERT INTO `posts` (`id`, `name`, `description`) VALUES
(1, 'Développeur Full Stack','Responsable des applications web et mobiles'),
(2, 'Chef de Projet','Gestion des projets IT et coordination des équipes'),
(3, 'Designer UI/UX','Création des interfaces utilisateur et expérience client'),
(4, 'Administrateur Système','Gestion infrastructure et sécurité'),
(5, 'Analyste de Données','Analyse et reporting des données business');

-- 2. Then insert employees
INSERT INTO `employees` (`id`, `Name`, `email`, `pass`, `postId`) VALUES
(1, 'Ahmed Ben Ali', 'ahmed.benali@optiwork.tn','password123', 1),
(2, 'Leila Trabelsi', 'leila.trabelsi@optiwork.tn','password123', 2),
(3, 'Youssef Gharbi', 'youssef.gharbi@optiwork.tn','password123', 3),
(4, 'Sarra Mejri', 'sarra.mejri@optiwork.tn','password123', 1),
(5, 'Mohamed Ayari', 'mohamed.ayari@optiwork.tn','password123', 4),
(6, 'Ines Chaabane', 'ines.chaabane@optiwork.tn','password123', 5),
(7, 'Karim Brahimi', 'karim.brahimi@optiwork.tn','password123', 1),
(8, 'Yasmine Ben Amor', 'yasmine.benamor@optiwork.tn','password123', 3),
(9, 'Slim Bouazizi', 'slim.bouazizi@optiwork.tn','password123', 2),
(10, 'Hela Ghanmi', 'hela.ghanmi@optiwork.tn','password123', 5);

-- Insert Tasks
INSERT INTO `Tasks` (`id`, `empId`, `weight`, `description`, `state`, `name`) VALUES
(1, 1, 3, 'Implémentation du système de messagerie instantanée pour l''application mobile', 'in_progress', 'Feature Chat'),
(2, 2, 5, 'Coordination du projet e-commerce pour la région de Sfax et supervision des délais', 'pending', 'Projet E-commerce'),
(3, 3, 4, 'Création des maquettes pour l''application mobile version iOS et Android', 'done', 'UI Mobile'),
(4, 4, 2, 'Résolution des bugs sur l''API de paiement en ligne', 'in_progress', 'Debug API'),
(5, 5, 4, 'Migration des serveurs de production vers le nouveau datacenter de Tunis', 'pending', 'Config Serveur'),
(6, 6, 3, 'Analyse des comportements utilisateurs sur la plateforme e-commerce', 'in_progress', 'Analyse Data'),
(7, 7, 5, 'Optimisation des requêtes de la base de données principale', 'pending', 'Optimisation DB'),
(8, 8, 4, 'Design du nouveau site vitrine corporate', 'done', 'Maquettes UI'),
(9, 9, 3, 'Formation et supervision de l''équipe de développeurs juniors', 'in_progress', 'Management'),
(10, 10, 4, 'Préparation du rapport d''analytics pour le second trimestre', 'pending', 'Rapport Q2');

-- Insert Skills
INSERT INTO `skills` (`id`, `name`, `empId`, `taskId`) VALUES
(1, 'React.js', 1, 1),
(2, 'Node.js', 1, NULL),
(3, 'Project Management', 2, 2),
(4, 'Figma', 3, 3),
(5, 'DevOps', 5, 5),
(6, 'Python', 6, 6),
(7, 'MySQL', 7, 7),
(8, 'Adobe XD', 8, 8),
(9, 'Agile', 9, 9),
(10, 'Data Analysis', 10, 10);

-- Insert Mental Health Records
INSERT INTO `mental_health` (`id`, `status`, `date`, `reason`, `empId`) VALUES
(1, 0.8, '2024-01-15 10:00:00', 'Excellente collaboration avec l''équipe sur le nouveau projet. Ambiance positive.', 1),
(2, 0.6, '2024-01-16 10:00:00', 'Stress lié aux délais serrés du projet e-commerce. Besoin de mieux gérer le temps.', 2),
(3, 0.9, '2024-01-17 10:00:00', 'Très satisfait de la réussite du dernier sprint. Feedback positif des clients.', 3),
(4, 0.7, '2024-01-18 10:00:00', 'Motivé par les nouveaux défis techniques, mais légèrement préoccupé par la complexité.', 4),
(5, 0.5, '2024-01-19 10:00:00', 'Difficulté à maintenir l''équilibre travail-vie personnelle. Besoin de mieux organiser les tâches.', 5);

-- Insert Breaks
INSERT INTO `breaks` (`id`, `duration`, `empId`, `start`, `end`) VALUES
(1, '00:30:00', 1, '2024-01-15 12:00:00', '2024-01-15 12:30:00'),
(2, '01:00:00', 2, '2024-01-15 13:00:00', '2024-01-15 14:00:00'),
(3, '00:15:00', 3, '2024-01-15 15:00:00', '2024-01-15 15:15:00'),
(4, '00:45:00', 4, '2024-01-15 12:30:00', '2024-01-15 13:15:00'),
(5, '00:30:00', 5, '2024-01-15 14:00:00', '2024-01-15 14:30:00');

-- Insert Dates
INSERT INTO `dates` (`id`, `issued`, `started`, `finished`, `deadline`, `taskId`) VALUES
(1, '2024-01-15 09:00:00', '2024-01-16 09:00:00', '2024-01-30 17:00:00', '2024-02-01 17:00:00', 1),
(2, '2024-01-20 10:00:00', '2024-01-21 09:00:00', '2024-02-15 17:00:00', '2024-02-20 17:00:00', 2),
(3, '2024-01-25 11:00:00', '2024-01-26 09:00:00', '2024-02-10 17:00:00', '2024-02-15 17:00:00', 3),
(4, '2024-02-01 09:00:00', '2024-02-02 09:00:00', '2024-02-20 17:00:00', '2024-02-25 17:00:00', 4),
(5, '2024-02-05 10:00:00', '2024-02-06 09:00:00', '2024-02-28 17:00:00', '2024-03-01 17:00:00', 5);

-- Insert Requests
INSERT INTO `requests` (`id`, `type`, `name`, `empId`, `Description`, `state`, `fromDate`, `toDate`) VALUES 
(1, 'Congé', 'Congé Aïd El Fitr', 1, 'Demande de congé pour les célébrations de l''Aïd avec la famille', 'approved', '2024-04-10', '2024-04-12'),
(2, 'Formation', 'Formation React Advanced', 2, 'Demande de participation à la formation avancée React.js à distance', 'pending', NULL, NULL),
(3, 'Matériel', 'Nouveau Matériel', 3, 'Demande de renouvellement du poste de travail pour les tâches de design', 'approved', NULL, NULL),
(4, 'Congé', 'Congé Maladie', 4, 'Congé maladie de trois jours avec certificat médical', 'pending', '2024-05-15', '2024-05-17'),
(5, 'Formation', 'Certification AWS', 5, 'Demande de prise en charge de la certification AWS Cloud Architect', 'denied', NULL, NULL);