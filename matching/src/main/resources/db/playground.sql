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
USE `playground` ;

-- -----------------------------------------------------
-- Table `playground`.`member_sometimes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`member_sometimes` (
  `member_id` INT NOT NULL,
  `nickname` VARCHAR(45) NOT NULL,
  `pw_hash` VARCHAR(45) NOT NULL,
  `name` VARCHAR(45) NULL,
  PRIMARY KEY (`member_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`alarm`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`alarm` (
  `alarm_id` INT NOT NULL AUTO_INCREMENT,
  `member_id` INT NOT NULL,
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
-- Table `playground`.`interest`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`interest` (
  `interest_id` INT NOT NULL AUTO_INCREMENT,
  `member_id` INT NOT NULL,
  `sports` VARCHAR(45) NOT NULL,
  `level` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`interest_id`),
  INDEX `member_id_idx` (`member_id` ASC) VISIBLE,
  CONSTRAINT `fk_interest_member_id`
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
  `sido` VARCHAR(100) NOT NULL,
  `sigun` VARCHAR(100) NOT NULL,
  `dong` VARCHAR(100) NOT NULL,
  `jibun` VARCHAR(100) NOT NULL,
  `place_name` VARCHAR(1000) NOT NULL,
  `latX` FLOAT NOT NULL,
  `latY` FLOAT NOT NULL,
  PRIMARY KEY (`place_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`gathering`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`gathering` (
  `gathering_id` INT NOT NULL AUTO_INCREMENT,
  `place_id` INT NOT NULL,
  `title` VARCHAR(100) NOT NULL,
  `people` INT NOT NULL,
  `start_date` VARCHAR(45) NOT NULL,
  `start_time` VARCHAR(45) NOT NULL,
  `is_completed` TINYINT NOT NULL,
  `manager` INT NOT NULL,
  `sex` VARCHAR(5) NOT NULL,
  `level` VARCHAR(10) NOT NULL,
  `sports` VARCHAR(45) NOT NULL,
  `game_type` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`gathering_id`),
  INDEX `fk_place_id_idx` (`place_id` ASC) VISIBLE,
  CONSTRAINT `fk_gathering_place_id`
    FOREIGN KEY (`place_id`)
    REFERENCES `playground`.`place` (`place_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`member_gathering`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`member_gathering` (
  `member_gathering_id` INT NOT NULL AUTO_INCREMENT,
  `gathering_id` INT NOT NULL,
  `member_id` INT NOT NULL,
  PRIMARY KEY (`member_gathering_id`),
  INDEX `fk_member_id_idx` (`member_id` ASC) VISIBLE,
  INDEX `fk_gathering_id_idx` (`gathering_id` ASC) VISIBLE,
  CONSTRAINT `fk_gathering_member_id`
    FOREIGN KEY (`member_id`)
    REFERENCES `playground`.`member_sometimes` (`member_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_member_gathering_id`
    FOREIGN KEY (`gathering_id`)
    REFERENCES `playground`.`gathering` (`gathering_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`member_profile_img`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`member_profile_img` (
  `profile_img_id` INT NOT NULL AUTO_INCREMENT,
  `member_id` INT NOT NULL COMMENT '회원 : \"M\" + foreigner key\n팀 :  \"T\" + foreigner key',
  `file_name` VARCHAR(1000) NOT NULL,
  `file_path` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`profile_img_id`),
  INDEX `fk_profile_member_id_idx` (`member_id` ASC) VISIBLE,
  CONSTRAINT `fk_profile_member_id`
    FOREIGN KEY (`member_id`)
    REFERENCES `playground`.`member_sometimes` (`member_id`)
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
  `member_id` INT NOT NULL,
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
  `manager` VARCHAR(45) NOT NULL,
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
-- Table `playground`.`message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`message` (
  `message_id` INT NOT NULL AUTO_INCREMENT,
  `chatroom_id` INT NOT NULL,
  `reg_time` DATE NOT NULL,
  `member_id` INT NOT NULL,
  `content` TEXT NOT NULL,
  `is_notice` TINYINT NOT NULL,
  PRIMARY KEY (`message_id`),
  INDEX `fk_chatroom_id_idx` (`chatroom_id` ASC) VISIBLE,
  CONSTRAINT `fk_message_gathering_chatroom_id`
    FOREIGN KEY (`chatroom_id`)
    REFERENCES `playground`.`gathering_chatroom` (`gathering_chatroom_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_message_team_chatroom_id`
    FOREIGN KEY (`chatroom_id`)
    REFERENCES `playground`.`team_chatroom` (`team_chatroom_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`chatroom_notice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`chatroom_notice` (
  `chatroom_notice_id` INT NOT NULL AUTO_INCREMENT,
  `chatroom_id` INT NULL,
  `content` TEXT NULL,
  PRIMARY KEY (`chatroom_notice_id`),
  INDEX `fk_chatroom_id_idx` (`chatroom_id` ASC) VISIBLE,
  CONSTRAINT `fk_notice_chatroom_id`
    FOREIGN KEY (`chatroom_id`)
    REFERENCES `playground`.`gathering_chatroom` (`gathering_chatroom_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`match`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`match` (
  `match_id` INT NOT NULL AUTO_INCREMENT,
  `place_id` INT NOT NULL,
  `match_date` DATE NOT NULL,
  `start_time` TIME NOT NULL,
  `play_time` INT NOT NULL,
  PRIMARY KEY (`match_id`),
  INDEX `fk_place_id_idx` (`place_id` ASC) VISIBLE,
  CONSTRAINT `fk_matching_place_id`
    FOREIGN KEY (`place_id`)
    REFERENCES `playground`.`place` (`place_id`)
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
  `is_win` TINYINT NOT NULL,
  PRIMARY KEY (`team_match_result_id`),
  INDEX `fk_match_id_idx` (`match_id` ASC) VISIBLE,
  INDEX `fk_team_id_idx` (`team_id` ASC) VISIBLE,
  CONSTRAINT `fk_result_match_id`
    FOREIGN KEY (`match_id`)
    REFERENCES `playground`.`match` (`match_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_result_team_id`
    FOREIGN KEY (`team_id`)
    REFERENCES `playground`.`team` (`team_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`member_team`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`member_team` (
  `member_team_id` INT NOT NULL AUTO_INCREMENT,
  `team_id` INT NOT NULL,
  `member_id` INT NOT NULL,
  PRIMARY KEY (`member_team_id`),
  INDEX `fk_member_id_idx` (`member_id` ASC) VISIBLE,
  INDEX `fk_team_id_idx` (`team_id` ASC) VISIBLE,
  CONSTRAINT `fk_team_member_id`
    FOREIGN KEY (`member_id`)
    REFERENCES `playground`.`member_sometimes` (`member_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_team_id`
    FOREIGN KEY (`team_id`)
    REFERENCES `playground`.`team` (`team_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`Member_often`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`Member_often` (
  `member_often_id` INT NOT NULL AUTO_INCREMENT,
  `member_id` INT NOT NULL,
  `status_message` VARCHAR(45) NULL,
  `prefer_time` VARCHAR(45) NOT NULL,
  `fcm_token` TEXT NULL,
  PRIMARY KEY (`member_often_id`),
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
-- Table `playground`.`team_profile_img`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`team_profile_img` (
  `profile_img_id` INT NOT NULL AUTO_INCREMENT,
  `team_id` INT NOT NULL,
  `file_name` VARCHAR(1000) NOT NULL,
  `file_path` VARCHAR(1000) NOT NULL,
  PRIMARY KEY (`profile_img_id`),
  INDEX `fk_profile_team_id_idx` (`team_id` ASC) VISIBLE,
  CONSTRAINT `fk_profile_team_id`
    FOREIGN KEY (`team_id`)
    REFERENCES `playground`.`team` (`team_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`read_message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`read_message` (
  `message_id` INT NOT NULL,
  `is_read` TINYINT NOT NULL,
  INDEX `fk_read_message_id_idx` (`message_id` ASC) VISIBLE,
  CONSTRAINT `fk_read_message_id`
    FOREIGN KEY (`message_id`)
    REFERENCES `playground`.`message` (`message_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `playground`.`member_team_chatroom`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `playground`.`member_team_chatroom` (
  `member_team_chatroom_id` INT NOT NULL AUTO_INCREMENT,
  `team_chatroom_id` INT NOT NULL,
  `member_id` INT NOT NULL,
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


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
