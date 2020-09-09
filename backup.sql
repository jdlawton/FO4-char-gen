-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: fo4_char_mgr_db
-- ------------------------------------------------------
-- Server version	8.0.21

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `character`
--

DROP TABLE IF EXISTS `character`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `character` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `level` int NOT NULL DEFAULT '1',
  `description` text,
  `strength` int NOT NULL DEFAULT '1',
  `perception` int NOT NULL DEFAULT '1',
  `endurance` int NOT NULL DEFAULT '1',
  `charisma` int NOT NULL DEFAULT '1',
  `intelligence` int NOT NULL DEFAULT '1',
  `agility` int NOT NULL DEFAULT '1',
  `luck` int NOT NULL DEFAULT '1',
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `character_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character`
--

LOCK TABLES `character` WRITE;
/*!40000 ALTER TABLE `character` DISABLE KEYS */;
INSERT INTO `character` VALUES (1,'Richard',2,'now I am testing the editing',4,4,4,4,4,4,4,1),(2,'Clark',1,'application test character 2',4,4,4,4,4,4,4,1),(3,'John Doe',1,'Test build',4,4,4,4,4,4,4,1),(4,'badd',1,'Build Description',10,10,4,1,1,1,1,1),(5,'Jane',26,'Test build',3,3,3,3,6,6,4,1);
/*!40000 ALTER TABLE `character` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `character_perk`
--

DROP TABLE IF EXISTS `character_perk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `character_perk` (
  `id` int NOT NULL AUTO_INCREMENT,
  `level_taken` int NOT NULL,
  `character_id` int NOT NULL,
  `perk_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `character_perk_perk_id_character_id_unique` (`character_id`,`perk_id`),
  KEY `perk_id` (`perk_id`),
  CONSTRAINT `character_perk_ibfk_1` FOREIGN KEY (`character_id`) REFERENCES `character` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `character_perk_ibfk_2` FOREIGN KEY (`perk_id`) REFERENCES `perk` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `character_perk`
--

LOCK TABLES `character_perk` WRITE;
/*!40000 ALTER TABLE `character_perk` DISABLE KEYS */;
INSERT INTO `character_perk` VALUES (1,2,1,45),(2,3,1,52),(3,4,1,68),(4,5,1,46),(7,5,1,47),(8,7,1,41),(9,1,1,87),(10,1,1,108),(11,2,1,114),(12,2,1,1),(13,2,1,50),(20,2,1,11),(21,2,1,76),(23,2,1,15),(25,1,5,1),(26,1,5,6),(27,1,5,11),(28,1,5,41),(29,1,5,45),(30,1,5,50),(31,1,5,76),(32,2,5,81),(34,3,5,84),(36,18,5,108),(37,19,5,2),(38,20,5,82),(39,21,5,77),(40,22,5,78),(41,23,5,114),(42,24,5,115),(43,25,5,109);
/*!40000 ALTER TABLE `character_perk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dlc`
--

DROP TABLE IF EXISTS `dlc`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dlc` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dlc`
--

LOCK TABLES `dlc` WRITE;
/*!40000 ALTER TABLE `dlc` DISABLE KEYS */;
INSERT INTO `dlc` VALUES (2,'Automatron'),(1,'Base Game'),(5,'Contraptions Workshop'),(4,'Far Harbor'),(7,'Nuka-World'),(6,'Vault-Tec Workshop'),(3,'Wasteland Workshop');
/*!40000 ALTER TABLE `dlc` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `perk`
--

DROP TABLE IF EXISTS `perk`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `perk` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `perk_rank` int NOT NULL,
  `req_name` varchar(255) NOT NULL,
  `req_rank` int NOT NULL,
  `req_level` int NOT NULL,
  `effect` varchar(255) NOT NULL,
  `dlc_id` int DEFAULT '1',
  PRIMARY KEY (`id`),
  KEY `dlc_id` (`dlc_id`),
  CONSTRAINT `perk_ibfk_1` FOREIGN KEY (`dlc_id`) REFERENCES `dlc` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=139 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `perk`
--

LOCK TABLES `perk` WRITE;
/*!40000 ALTER TABLE `perk` DISABLE KEYS */;
INSERT INTO `perk` VALUES (1,'Iron Fist',1,'Strength',1,1,'Channel your chi to unlease devestating fury! Punching attacks do 20% more damage to your opponent.',1),(2,'Iron Fist',2,'Iron Fist',1,9,'Punching attacks now do 40% more damage and can disarm your opponent.',1),(3,'Iron Fist',3,'Iron Fist',2,18,'Punching attacks now do 60% mroe damage. Unarmed Power Attacks have a chance to cripple one of your opponent\'s limbs.',1),(4,'Iron Fist',4,'Iron Fist',3,31,'Punching attacks now do 80% more damage. Unarmed Power Attacks have an increased chance to cripple one of your opponent\'s limbs.',1),(5,'Iron Fist',5,'Iron Fist',4,46,'Punching attacks now do double damage. Criticals in V.A.T.S. will paralyze your opponent.',1),(6,'Big Leagues',1,'Strength',2,1,'Swing for the fences! Do 20% more melee weapon damage.',1),(7,'Big Leagues',2,'Big Leagues',1,7,'You now do 40% more melee weapon damage and gain a chance to disarm your opponent.',1),(8,'Big Leagues',3,'Big Leagues',2,15,'You now do 60% more melee weapon damage and gain an increased chance to disarm your opponent.',1),(9,'Big Leagues',4,'Big Leagues',3,27,'You now do 80% more melee weapon damage and hit all targets in front of you.',1),(10,'Big Leagues',5,'Big Leagues',4,42,'You now do double damage with a melee weapon, and gain a chance to cripple your opponent, or grand slam their head clean off!',1),(11,'Armorer',1,'Strength',3,1,'Protect yourself from the dangers of the Wasteland with access to base level and Rank 1 armor mods.',1),(12,'Armorer',2,'Armorer',1,13,'You gain access to Rank 2 armor mods.',1),(13,'Armorer',3,'Armorer',2,25,'You gain access to Rank 3 armor mods.',1),(14,'Armorer',4,'Armorer',3,39,'You gain access to Rank 4 armor mods.',1),(15,'Blacksmith',1,'Strength',4,1,'Fire up the forge and gain access to base level and Rank 1 melee weapon mods.',1),(16,'Blacksmith',2,'Blacksmith',1,16,'You gain access to Rank 2 melee weapon mods.',1),(17,'Blacksmith',3,'Blacksmith',2,29,'You gain access to Rank 3 melee weapon mods.',1),(18,'Heavy Gunner',1,'Strength',5,1,'Thanks to practice and conditioning, heavy guns do 20% more damage.',1),(19,'Heavy Gunner',2,'Heavy Gunner',1,11,'Heavy guns now do 40% more damage, and have improved hip fire accuracy.',1),(20,'Heavy Gunner',3,'Heavy Gunner',2,21,'Heavy guns now do 60% more damage. Hip fire accuracy is increased even more.',1),(21,'Heavy Gunner',4,'Heavy Gunner',3,35,'Heavy guns now do 80% more damage and have a chance to stagger your opponent.',1),(22,'Heavy Gunner',5,'Heavy Gunner',4,47,'Heavy guns now do double damage.',1),(23,'Strong Back',1,'Strength',6,1,'What are you, part pack mule? Gain +25 to carry weight.',1),(24,'Strong Back',2,'Strong Back',1,10,'You now have +50 to carry weight.',1),(25,'Strong Back',3,'Strong Back',2,20,'When overencumbered, you can use Action Points to run.',1),(26,'Strong Back',4,'Strong Back',3,30,'When overencumbered, you can fast travel.',1),(27,'Strong Back',5,'Strong Back',4,40,'When overencumbered, running costs 50% less action points.',4),(28,'Steady Aim',1,'Strength',7,1,'Stay on target! Hip-fire accuracy is improved when firing any gun.',1),(29,'Steady Aim',2,'Steady Aim',1,28,'Hip-fire accuracy is improved even more when firing any gun.',1),(30,'Steady Aim',3,'Steady Aim',2,49,'Hip-fire damage is improved when firing any gun.',7),(31,'Basher',1,'Strength',8,1,'Get up close and personal! Gun bashing does 25% mroe damage.',1),(32,'Basher',2,'Basher',1,5,'Gun bashing now does 50% more damage and possibly cripples your opponent.',1),(33,'Basher',3,'Basher',2,14,'Gun bashing now does 75% more damage and has an increased chance to cripple your opponent.',1),(34,'Basher',4,'Basher',3,26,'Gun bashing does double damage and has an increased chance to cripple your opponent. It may also inflice a Critical Hit.',1),(35,'Rooted',1,'Strength',9,1,'You\'re part tree! While standing still, you gain +25 Damage Resistance and your melee and unarmed attacks deal 25% more damage.',1),(36,'Rooted',2,'Rooted',1,22,'While standing still, you now gain +50 Damage Resistance and your melee and unarmed attacks deal 50% more damage.',1),(37,'Rooted',3,'Rooted',2,43,'While standing still, you may automatically disarm enemies that use melee weapons against you.',1),(38,'Pain Train',1,'Strength',10,1,'Choo Choo! All aboard! While wearing Power Armor, sprinting into enemies hurts and staggers them. (Robots and oversized enemies are immune to the stagger.)',1),(39,'Pain Train',2,'Pain Train',1,24,'Sprinting into enemies while wearing Power Armor now causes severe damage and a more powerful stagger. (Robots and oversized enemies are immune to the stagger.)',1),(40,'Pain Train',3,'Pain Train',2,50,'Sprinting into enemies while wearing Power Armor now causes massive damage and knocks them down. Impact landing near enemies inflicts even more damage.',1),(41,'Pickpocket',1,'Perception',1,1,'Your quick hands and sticky fingers make picking pockets 25% easier.',1),(42,'Pickpocket',2,'Pickpocket',1,6,'Picking pockets is now 50% easier. You can place a live grenade in a person\'s inventory.',1),(43,'Pickpocket',3,'Pickpocket',2,17,'Picking pockets is now 75% easier, and you can steal equipped weapons.',1),(44,'Pickpocket',4,'Pickpocket',3,30,'Picking pockets is now twice as easy, and you can steal equipped items.',1),(45,'Rifleman',1,'Perception',2,1,'Keep your distance long and your kill-count high. Attacks with non-automatic rifles do 20% more damage.',1),(46,'Rifleman',2,'Rifleman',1,9,'Attacks with non-automatic rifles do 40% more damage and ignore 15% of a target\'s armor.',1),(47,'Rifleman',3,'Rifleman',2,18,'Attacks with non-automatic rifles do 60% more damage and ignore 20% of a target\'s armor.',1),(48,'Rifleman',4,'Rifleman',3,31,'Attacks with non-automatic rifles do 80% more damage and ignore 25% of a target\'s armor. They also have a slight chance of crippling a limb.',1),(49,'Rifleman',5,'Rifleman',4,46,'Attacks with non-automatic rifles do double damage and ignore 30% of a target\'s armor. They also have a slightly higher chance of crippling a limb.',1),(50,'Awareness',1,'Perception',3,1,'To defeat your enemies, know their weaknesses! You can view a target\'s specific damage resistances in V.A.T.S.',1),(51,'Awareness',2,'Awareness',1,14,'Knowing their weaknesses lets you attack more efficiently. 5% increase to hit chance and damage dealt to V.A.T.S. targets.',7),(52,'Locksmith',1,'Perception',4,1,'Your nimble fingers allow you to pick advanced locks.',1),(53,'Locksmith',2,'Locksmith',1,7,'You can pick Expert locks.',1),(54,'Locksmith',3,'Locksmith',2,18,'You can pick Master locks.',1),(55,'Locksmith',4,'Locksmith',3,41,'Your bobby pins never break during lockpicking.',1),(56,'Demolition Expert',1,'Perception',5,1,'The bigger the boom, the better! Your explosives do 25% more damage, and you can craft explosives at any chemistry station.',1),(57,'Demolition Expert',2,'Demolition Expert',1,10,'Your explosives do 50% more damage, and grenades gain a throwing arc.',1),(58,'Demolition Expert',3,'Demolition Expert',2,22,'Your explosives do 75% more damage and affect a larger area.',1),(59,'Demolition Expert',4,'Demolition Expert',3,34,'Your explosives now do double damage. Mines and grenades shot in V.A.T.S. explode for double damage too.',1),(60,'Night Person',1,'Perception',6,1,'You are a creature of the night! Gain +2 to Intelligence and Perception between the hours of 6:00 p.m. and 6:00 a.m.',1),(61,'Night Person',2,'Night Person',1,25,'You now have +3 to Intelligence and Perception between the hours of 6:00 p.m. and 6:00 a.m., and night vision when sneaking.',1),(62,'Night Person',3,'Night Person',2,37,'You have 30 extra health between the hours of 6:00 p.m. and 6:00 a.m.',4),(63,'Refractor',1,'Perception',7,1,'You must be part mirror! Instantly gain +10 Energy Resistance.',1),(64,'Refractor',2,'Refractor',1,11,'You now have +20 Energy Resistance.',1),(65,'Refractor',3,'Refractor',2,21,'You now have +30 Energy Resistance.',1),(66,'Refractor',4,'Refractor',3,35,'You now have +40 Energy Resistance.',1),(67,'Refractor',5,'Refractor',4,42,'You now have +50 Energy Resistance.',1),(68,'Sniper',1,'Perception',8,1,'It\'s all about focus. You have improved control and can hold your breath longer when aiming with scopes.',1),(69,'Sniper',2,'Sniper',1,13,'Non-automatic, scoped rifles have a 15% chance of knocking down your target.',1),(70,'Sniper',3,'Sniper',2,26,'Non-automatic, scoped rifles gain +25% accuracy to head shot in V.A.T.S.',1),(71,'Penetrator',1,'Perception',9,1,'There\'s no place to hide! In V.A.T.S. you can target an enemy\'s body parts that are blocked by cover, with a decrease in accuracy.',1),(72,'Penetrator',2,'Penetrator',1,28,'In V.A.T.S. when you target an enemy\'s body parts that are blocked by cover, there is no decrease in accuracy.',1),(73,'Concentrated Fire',1,'Perception',10,1,'Stay Focused! In V.A.T.S. every attack on the same body part gains +10% accuracy.',1),(74,'Concentrated Fire',2,'Concentrated Fire',1,26,'In V.A.T.S. every attack on the same body part gains +15% accuracy.',1),(75,'Concentrated Fire',3,'Concentrated Fire',2,50,'In V.A.T.S. every attack on the same body part gains +20% accuracy and does 20% more damage.',1),(76,'Toughness',1,'Endurance',1,1,'If nothing else, you can take a beating! Instantly gain +10 Damage Resistance.',1),(77,'Toughness',2,'Toughness',1,9,'You now have +20 damage resistance.',1),(78,'Toughness',3,'Toughness',2,18,'You now have +30 damage resistance.',1),(79,'Toughness',4,'Toughness',3,31,'You now have +40 damage resistance.',1),(80,'Toughness',5,'Toughness',4,46,'You now have +50 damage resistance.',1),(81,'Lead Belly',1,'Endurance',2,1,'Your digestive tract has adjusted to the weirdness of the Wasteland! Take less radiation from eating or drinking.',1),(82,'Lead Belly',2,'Lead Belly',1,6,'You take even less radiation from eating or drinking',1),(83,'Lead Belly',3,'Lead Belly',2,17,'You take no radiation from eating or drinking.',1),(84,'Lifegiver',1,'Endurance',3,1,'You embody wellness! Instantly gain +20 maximum Health.',1),(85,'Lifegiver',2,'Lifegiver',1,8,'You instantly gain another +20 maximum Health.',1),(86,'Lifegiver',3,'Lifegiver',2,20,'You instantly gain another +20 maximum Health and slowly regenerate lost Health.',1),(87,'Chem Resistant',1,'Endurance',4,1,'All the rush without the hassle! You\'re 50% less likely to get addicted when consuming Chems.',1),(88,'Chem Resistant',2,'Chem Resistant',1,22,'You gain complete immunity to chem addiction.',1),(89,'Aquaboy/Aquagirl',1,'Endurance',5,1,'Water is your ally. You no longer take radiation damage from swimming, and can breathe underwater.',1),(90,'Aquaboy/Aquagirl',2,'Aquaboy/Aquagirl',1,21,'You become totally undetectable while submerged.',1),(91,'Rad Resistant',1,'Endurance',6,1,'Exposure to the Wasteland has made you more resilient, instantly granting +10 Radiation Resistance.',1),(92,'Rad Resistant',2,'Rad Resistant',1,13,'You now have +20 Radiation Resistance.',1),(93,'Rad Resistant',3,'Rad Resistant',2,26,'You now have +30 Radiation Resistance.',1),(94,'Rad Resistant',4,'Rad Resistant',3,35,'You now hoave +40 Radiation Resistance.',4),(95,'Adamantium Skeleton',1,'Endurance',7,1,'Your skeleton has been infused with industructible metal, reducing limb damage by 30%',1),(96,'Adamantium Skeleton',2,'Adamantium Skeleton',1,13,'Your limb damage is now reduced by 60%.',1),(97,'Adamantium Skeleton',3,'Adamantium Skeleton',2,26,'Your limb damage is completely eliminated.',1),(98,'Cannibal',1,'Endurance',8,1,'Feast on mortal flesh to heal your wounds! Eating human corpses restores Health.',1),(99,'Cannibal',2,'Cannibal',1,19,'Eating Ghoul or Super Mutant corpses restores health.',1),(100,'Cannibal',3,'Cannibal',2,38,'Eating human, Ghoul, or Super Mutant corpses now restores a significant amount of Health.',1),(101,'Ghoulish',1,'Endurance',9,1,'Sure, you\'re still human - on the outside! Radiation now regenerates your lost Health.',1),(102,'Ghoulish',2,'Ghoulish',1,24,'Radiation now regenerates more of your lost Health.',1),(103,'Ghoulish',3,'Ghoulish',2,48,'Radiation now regenerates even more of your lost Health, and some Feral Ghouls will randomly become friendly.',1),(104,'Ghoulish',4,'Ghoulish',3,50,'Rad damage will now being to slowly heal, restoring health in the process.',7),(105,'Solar Powered',1,'Endurance',10,1,'Catch some rays! Gain +2 to Strength and Endurance between the hours of 6:00 a.m. and 6:00 p.m.',1),(106,'Solar Powered',2,'Solar Powered',1,27,'Sunlight slowly heals your radiation damage.',1),(107,'Solar Powered',3,'Solar Powered',2,50,'Sunlight slowly regenerates your lost Heatlh.',1),(108,'Cap Collector',1,'Charisma',1,1,'You\'ve mastered the fine art of the deal! Buying and selling prices at vendors are better.',1),(109,'Cap Collector',2,'Cap Collector',1,20,'Buying and selling prices of vendors are now much better.',1),(110,'Cap Collector',3,'Cap Collector',2,41,'You can now invest a total of 500 caps to raise a store\'s buying capacity.',1),(111,'Lady Killer/Black Widow',1,'Charisma',2,1,'You\'re charming... and dangerous. Men/Women suffer +5% damage in combat, and are easier to persuade in dialogue.',1),(112,'Lady Killer/Black Widow',2,'Lady Killer/Black Widow',1,7,'Men/Women now suffer +10% damage in combat and are even easier to persuade in dialogue. They are also easier to pacify with the Intimidation perk.',1),(113,'Lady Killer/Black Widow',3,'Lady Killer/Black Widow',2,22,'Men/Women now suffer +15% damage in combat, and are much easier to persuade in dialogue. They are now even easier to pacity with the Intimidation perk.',1),(114,'Lone Wanderer',1,'Charisma',3,1,'Who needs friends anyway? When adventuring without a companion, you take 15% less damage and carry weight increases by 50.',1),(115,'Lone Wanderer',2,'Lone Wanderer',1,17,'When adventuring without a companion, you take 30% less damage and carry weight increases by 100.',1),(116,'Lone Wanderer',3,'Lone Wanderer',2,40,'When adventuring without a companion, you do 25% more damage.',1),(117,'Lone Wanderer',4,'Lone Wanderer',3,50,'When adventuring without a companion, you have 25 more action points.',4),(118,'Attack Dog',1,'Charisma',4,1,'Your faithful canine companion can hold an enemy, giving you a greater chance to hit them in V.A.T.S.',1),(119,'Attack Dog',2,'Attack Dog',1,9,'When your dog holds an enemy, there\'s a chance he\'ll cripple the limb he\'s biting.',1),(120,'Attack Dog',3,'Attack Dog',2,25,'When your dog holds an enemy, there\'s a chance he\'ll cause them to bleed.',1),(121,'Attack Dog',4,'Attack Dog',3,31,'When adventuring with your dog, you take 10% less damage.',7),(122,'Animal Friend',1,'Charisma',5,1,'Commune with beasts! With your gun, aim at any animal below your level and gain a chance to pacify it.',1),(123,'Animal Friend',2,'Animal Friend',1,12,'When you successfully pacity an animal, you can incide it to attack.',1),(124,'Animal Frined',3,'Animal Friend',2,28,'When you successfully pacify an animal, you can give it specific commands.',1),(125,'Local Leader',1,'Charisma',6,1,'As the ruler everyone turns to, you are able to establish supply lines between your workshop settlements.',1),(126,'Local Leader',2,'Local Leader',1,14,'You can build stores and workstations at workshop settlements.',1),(127,'Party Boy/Party Girl',1,'Charisma',7,1,'Nobody has a good time like you! There\'s no chance you\'ll get addicted to alcohol.',1),(128,'Party Boy/Party Girl',2,'Party Boy/Party Girl',1,15,'The effects of alcohol are doubled.',1),(129,'Party Boy/Party Girl',3,'Party Boy/Party Girl',2,37,'Your Luck is increased by 3 while you are under the influence of alcohol.',1),(130,'Inspirational',1,'Charisma',8,1,'Becase you lead by example, your companion does more damage in combat, and cannot hurt you.',1),(131,'Inspirational',2,'Inspirational',1,19,'Your companion resists more damge in combat, and can\'t be harmed by your attacks.',1),(132,'Inspirational',3,'Inspirational',2,43,'Your companion can carry more items.',1),(133,'Wasteland Whisperer',1,'Charisma',9,1,'Master the post-apocalypse! With your gun, aim at any Wasteland creature below your level and gain a chance to pacify it.',1),(134,'Wasteland Whisperer',2,'Wasteland Whisperer',1,21,'When you successfully pacity a creature, you can incide it to attack.',1),(135,'Wasteland Whisperer',3,'Wasteland Whisperer',2,49,'When you successfully pacity a creature, you can give it specific commands.',1),(136,'Intimidation',1,'Charisma',10,1,'Time to show everyone who\'s boss! With your gun, aim at any human opponent below your level and gain a chance to pacity them.',1),(137,'Intimidation',2,'Intimidation',1,23,'When you successfully pacity someone, you can incide them to attack.',1),(138,'Intimidation',3,'Intimidation',2,50,'When you successfully pacify someone, you can give them specific commands.',1);
/*!40000 ALTER TABLE `perk` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `session`
--

DROP TABLE IF EXISTS `session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `session` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`sid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `session`
--

LOCK TABLES `session` WRITE;
/*!40000 ALTER TABLE `session` DISABLE KEYS */;
INSERT INTO `session` VALUES ('k39FNmFdaViB5hy7Qu6jHKCwooYuZ0Ku','2020-09-09 00:58:45','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user_id\":1,\"username\":\"jlawton\",\"loggedIn\":true}','2020-09-07 19:32:38','2020-09-08 00:58:45'),('unfP1Ds7sscbS277FAPv5dtR97eB0Lr6','2020-09-09 15:39:04','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"}}','2020-09-08 15:39:04','2020-09-08 15:39:04'),('w1m4Y9LV6PcUroOc17TlEA1HnvpmbW0J','2020-09-08 17:23:25','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user_id\":1,\"username\":\"jlawton\",\"loggedIn\":true}','2020-09-06 14:29:27','2020-09-07 17:23:25'),('ZP4MjpFMYkfOsI3o3-X-A4rAl5YjAmWw','2020-09-09 00:15:43','{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"httpOnly\":true,\"path\":\"/\"},\"user_id\":1,\"username\":\"jlawton\",\"loggedIn\":true}','2020-09-05 02:43:52','2020-09-08 00:15:43');
/*!40000 ALTER TABLE `session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'jlawton','joe.lawton@outlook.com','$2b$10$oonrAheyzgVLPy5VbJ6GJ.H.4ztP3tWDwxXtWFgp2LR0LMYpu.Ufq');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-09-08 20:50:22
