-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema playground
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema playground
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `playground` DEFAULT CHARACTER SET utf8 ;
ALTER AUTHORIZATION ON DATABASE::MyDatabase TO ssafy;
USE `playground` ;

-- -----------------------------------------------------
-- Table `playground`.`member_sometimes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`member_sometimes` (
  `member_id` BIGINT NOT NULL,
  `created_date` DATETIME NULL,
  `modified_date` DATETIME NULL,
  `name` VARCHAR(45) NULL,
  `nickname` VARCHAR(45) NULL,
  `address` VARCHAR(1000) NULL,
  `lat` DOUBLE NULL,
  `lng` DOUBLE NULL,
  `distance` INT NULL,
  PRIMARY KEY (`member_id`),
  UNIQUE INDEX `nickname_UNIQUE` (`nickname` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`alarm`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`alarm` (
  `alarm_id` INT NOT NULL AUTO_INCREMENT,
  `member_id` BIGINT NOT NULL,
  `content` VARCHAR(1000) NOT NULL,
  `alarm_type` VARCHAR(45) NOT NULL,
  `reg_date` DATE NOT NULL,
  PRIMARY KEY (`alarm_id`),
  INDEX `fk_alarm_member_idx` (`member_id` ASC) VISIBLE,
  CONSTRAINT `fk_alarm_member_id`
    FOREIGN KEY (`member_id`)
    REFERENCES `playground`.`member_sometimes` (`member_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`prefer_activities`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`prefer_activities` (
  `activity` VARCHAR(45) NOT NULL,
  `member_id` BIGINT NOT NULL,
  `created_date` DATETIME NULL,
  `modified_date` DATETIME NULL,
  `level` VARCHAR(45) NULL,
  `is_preferable` TINYINT NULL,
  PRIMARY KEY (`activity`, `member_id`),
  INDEX `member_id_idx` (`member_id` ASC) VISIBLE,
  CONSTRAINT `fk_prefer_activities_member_id`
    FOREIGN KEY (`member_id`)
    REFERENCES `playground`.`member_sometimes` (`member_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`place`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`place` (
  `place_id` INT NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(1000) NOT NULL,
  `lat` DOUBLE NOT NULL,
  `lng` DOUBLE NOT NULL,
  PRIMARY KEY (`place_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`gathering`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`gathering` (
  `gathering_id` INT NOT NULL AUTO_INCREMENT,
  `place_id` INT NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `description` VARCHAR(45) NULL,
  `people` INT NOT NULL,
  `start_date` DATE NOT NULL,
  `start_time` TIME NOT NULL,
  `play_time` INT NOT NULL,
  `is_completed` TINYINT NOT NULL,
  `host_id` BIGINT NOT NULL,
  `sex` VARCHAR(5) NOT NULL,
  `level` VARCHAR(10) NOT NULL,
  `sports` VARCHAR(45) NOT NULL,
  `game_type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`gathering_id`),
  INDEX `fk_place_id_idx` (`place_id` ASC) VISIBLE,
  INDEX `fk_gathering_host_id_idx` (`host_id` ASC) VISIBLE,
  CONSTRAINT `fk_gathering_place_id`
    FOREIGN KEY (`place_id`)
    REFERENCES `playground`.`place` (`place_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_gathering_host_id`
    FOREIGN KEY (`host_id`)
    REFERENCES `playground`.`member_sometimes` (`member_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`gathering_member`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`gathering_member` (
  `gathering_member_id` INT NOT NULL AUTO_INCREMENT,
  `gathering_id` INT NOT NULL,
  `member_id` BIGINT NOT NULL,
  PRIMARY KEY (`gathering_member_id`),
  INDEX `fk_member_id_idx` (`member_id` ASC) VISIBLE,
  INDEX `fk_gathering_id_idx` (`gathering_id` ASC) VISIBLE,
  CONSTRAINT `fk_member_gathering_id`
    FOREIGN KEY (`member_id`)
    REFERENCES `playground`.`member_sometimes` (`member_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_gathering_member_member_id`
    FOREIGN KEY (`gathering_id`)
    REFERENCES `playground`.`gathering` (`gathering_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`gathering_chatroom`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`gathering_chatroom` (
  `gathering_chatroom_id` INT NOT NULL AUTO_INCREMENT,
  `gathering_id` INT NOT NULL,
  `chatroom_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`gathering_chatroom_id`),
  INDEX `fk_group_id_idx` (`gathering_id` ASC) VISIBLE,
  CONSTRAINT `fk_gathering_chatroom_id`
    FOREIGN KEY (`gathering_id`)
    REFERENCES `playground`.`gathering` (`gathering_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`member_gathering_chatroom`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`member_gathering_chatroom` (
  `member_gathering_chatroom_id` INT NOT NULL AUTO_INCREMENT,
  `gathering_chatroom_id` INT NOT NULL,
  `member_id` BIGINT NOT NULL,
  PRIMARY KEY (`member_gathering_chatroom_id`),
  INDEX `fk_member_id_idx` (`member_id` ASC) VISIBLE,
  INDEX `fk_gathering_chatroom_id_idx` (`gathering_chatroom_id` ASC) VISIBLE,
  CONSTRAINT `fk_chatroom_member_gathering_id`
    FOREIGN KEY (`member_id`)
    REFERENCES `playground`.`member_sometimes` (`member_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_member_gathering_chatroom_id`
    FOREIGN KEY (`gathering_chatroom_id`)
    REFERENCES `playground`.`gathering_chatroom` (`gathering_chatroom_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`team` (
  `team_id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `sports` VARCHAR(45) NOT NULL,
  `game_type` VARCHAR(45) NOT NULL,
  `level` VARCHAR(45) NOT NULL,
  `point` INT NULL,
  PRIMARY KEY (`team_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`team_chatroom`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`team_chatroom` (
  `team_chatroom_id` INT NOT NULL AUTO_INCREMENT,
  `team_id` INT NOT NULL,
  `chatroom_name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`team_chatroom_id`),
  INDEX `fk_chatroom_team_id_idx` (`team_id` ASC) VISIBLE,
  CONSTRAINT `fk_team_chatroom_id`
    FOREIGN KEY (`team_id`)
    REFERENCES `playground`.`team` (`team_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`chat_message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`chat_message` (
  `message_id` INT NOT NULL AUTO_INCREMENT,
  `chatroom_id` INT NOT NULL,
  `reg_time` DATETIME NOT NULL,
  `member_id` BIGINT NOT NULL,
  `content` TEXT NOT NULL,
  `is_notice` TINYINT NOT NULL,
  `type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`message_id`),
  INDEX `fk_chatroom_id_idx` (`chatroom_id` ASC) VISIBLE,
  CONSTRAINT `fk_message_gathering_chatroom_id0`
    FOREIGN KEY (`chatroom_id`)
    REFERENCES `playground`.`gathering_chatroom` (`gathering_chatroom_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_message_team_chatroom_id0`
    FOREIGN KEY (`chatroom_id`)
    REFERENCES `playground`.`team_chatroom` (`team_chatroom_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`preferred_place`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`preferred_place` (
  `preferred_place_id` INT NOT NULL AUTO_INCREMENT,
  `address` VARCHAR(1000) NOT NULL,
  `lat` DOUBLE NOT NULL,
  `lng` DOUBLE NOT NULL,
  PRIMARY KEY (`preferred_place_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`match`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`match` (
  `match_id` INT NOT NULL AUTO_INCREMENT,
  `host_id` INT NOT NULL,
  `match_date` DATE NOT NULL,
  `min_start_time` TIME NOT NULL,
  `max_start_time` TIME NOT NULL,
  `place_id` INT NOT NULL,
  `distance` VARCHAR(45) NOT NULL,
  `match_sports` VARCHAR(45) NOT NULL,
  `match_game_type` VARCHAR(45) NOT NULL,
  `is_done` TINYINT NULL,
  PRIMARY KEY (`match_id`),
  INDEX `fk_match_place_id_idx` (`place_id` ASC) VISIBLE,
  INDEX `fk_match_host_id_idx` (`host_id` ASC) VISIBLE,
  CONSTRAINT `fk_match_place_id`
    FOREIGN KEY (`place_id`)
    REFERENCES `playground`.`preferred_place` (`preferred_place_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_match_host_id`
    FOREIGN KEY (`host_id`)
    REFERENCES `playground`.`team` (`team_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`team_match_result`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`team_match_result` (
  `team_match_result_id` INT NOT NULL AUTO_INCREMENT,
  `team_id` INT NOT NULL,
  `match_id` INT NOT NULL,
  `result` VARCHAR(5) NULL,
  PRIMARY KEY (`team_match_result_id`),
  INDEX `fk_match_id_idx` (`match_id` ASC) VISIBLE,
  INDEX `fk_team_id_idx` (`team_id` ASC) VISIBLE,
  CONSTRAINT `fk_result_match_id`
    FOREIGN KEY (`match_id`)
    REFERENCES `playground`.`match` (`match_id`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_result_team_id`
    FOREIGN KEY (`team_id`)
    REFERENCES `playground`.`team` (`team_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`team_member`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`team_member` (
  `team_member_id` INT NOT NULL AUTO_INCREMENT,
  `team_id` INT NOT NULL,
  `member_id` BIGINT NOT NULL,
  PRIMARY KEY (`team_member_id`),
  INDEX `fk_member_id_idx` (`member_id` ASC) VISIBLE,
  INDEX `fk_team_id_idx` (`team_id` ASC) VISIBLE,
  CONSTRAINT `fk_team_member_member_id`
    FOREIGN KEY (`member_id`)
    REFERENCES `playground`.`member_sometimes` (`member_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_team_member_team_id`
    FOREIGN KEY (`team_id`)
    REFERENCES `playground`.`team` (`team_id`)
    ON DELETE CASCADE
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`member_often`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`member_often` (
  `member_id` BIGINT NOT NULL,
  `created_date` DATETIME NULL,
  `modified_date` DATETIME NULL,
  `status_message` VARCHAR(45) NULL,
  `prefer_time` VARCHAR(45) NULL,
  `web_fcm_token` TEXT NULL,
  `mobile_fcm_token` TEXT NULL,
  `user_profile_img_url` TEXT NULL,
  PRIMARY KEY (`member_id`),
  INDEX `fk_often_member_id_idx` (`member_id` ASC) VISIBLE,
  CONSTRAINT `fk_often_member_id`
    FOREIGN KEY (`member_id`)
    REFERENCES `playground`.`member_sometimes` (`member_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`read_alarm`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`read_alarm` (
  `read_alarm_id` INT NOT NULL AUTO_INCREMENT,
  `alarm_id` INT NOT NULL,
  `is_read` TINYINT NOT NULL,
  PRIMARY KEY (`read_alarm_id`),
  INDEX `fk_read_alarm_id_idx` (`alarm_id` ASC) VISIBLE,
  CONSTRAINT `fk_read_alarm_id`
    FOREIGN KEY (`alarm_id`)
    REFERENCES `playground`.`alarm` (`alarm_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`member_team_chatroom`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`member_team_chatroom` (
  `member_team_chatroom_id` INT NOT NULL AUTO_INCREMENT,
  `team_chatroom_id` INT NOT NULL,
  `member_id` BIGINT NOT NULL,
  PRIMARY KEY (`member_team_chatroom_id`),
  INDEX `fk_member_id_idx` (`member_id` ASC) VISIBLE,
  INDEX `fk_member_team_chatroom_id_idx` (`team_chatroom_id` ASC) VISIBLE,
  CONSTRAINT `fk_chatroom_member_team_id`
    FOREIGN KEY (`member_id`)
    REFERENCES `playground`.`member_sometimes` (`member_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_member_team_chatroom_id`
    FOREIGN KEY (`team_chatroom_id`)
    REFERENCES `playground`.`team_chatroom` (`team_chatroom_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`live`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`live` (
  `live_id` INT NOT NULL AUTO_INCREMENT,
  `place_id` INT NOT NULL,
  `detail` VARCHAR(45) NULL,
  `current_people_num` INT NOT NULL,
  `total_people_num` INT NOT NULL,
  `regist_time` DATETIME NOT NULL,
  `host_id` BIGINT NOT NULL,
  `sports` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`live_id`),
  INDEX `fk_live_place_id_idx` (`place_id` ASC) VISIBLE,
  INDEX `fk_host_id_idx` (`host_id` ASC) VISIBLE,
  CONSTRAINT `fk_live_place_id`
    FOREIGN KEY (`place_id`)
    REFERENCES `playground`.`place` (`place_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_live_host_id`
    FOREIGN KEY (`host_id`)
    REFERENCES `playground`.`member_sometimes` (`member_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`live_member`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`live_member` (
  `live_member_id` INT NOT NULL AUTO_INCREMENT,
  `live_id` INT NOT NULL,
  `member_id` BIGINT NOT NULL,
  PRIMARY KEY (`live_member_id`),
  INDEX `fk_live_member_id_idx` (`live_id` ASC) VISIBLE,
  INDEX `fk_live_member_member_id_idx` (`member_id` ASC) VISIBLE,
  CONSTRAINT `fk_live_member_live_id`
    FOREIGN KEY (`live_id`)
    REFERENCES `playground`.`live` (`live_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_live_member_member_id`
    FOREIGN KEY (`member_id`)
    REFERENCES `playground`.`member_sometimes` (`member_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`waiting_room`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`waiting_room` (
  `room_id` INT NOT NULL AUTO_INCREMENT,
  `team_id` INT NOT NULL,
  `member_id` BIGINT NOT NULL,
  `match_date` DATE NOT NULL,
  `lat` DOUBLE NOT NULL,
  `lng` DOUBLE NOT NULL,
  `distance` INT NOT NULL,
  `min_start_time` TIME NOT NULL,
  `max_start_time` TIME NOT NULL,
  `sports` VARCHAR(45) NOT NULL,
  `game_type` VARCHAR(45) NOT NULL,
  `team_point` INT NOT NULL,
  `register_time` DATETIME NOT NULL,
  PRIMARY KEY (`room_id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
