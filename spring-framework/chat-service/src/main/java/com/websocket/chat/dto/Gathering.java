package com.websocket.chat.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Gathering {

    @Id
    private int gatheringId;
    private int placeId;
    private String title;
    private String description;
    private int people;
    private  String startDate;
    private String startTime;
    private int playTime;
    private boolean isCompleted;
    private int manager;
    private String sex;
    private String level;
    private String sports;
    private String game_type;

}
