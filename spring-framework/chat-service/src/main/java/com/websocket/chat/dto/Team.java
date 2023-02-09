package com.websocket.chat.dto;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Team {

    @Id
    private int teamId;
    private String name;
    private long managerId;
    private String gameType;
    private String teamProfileImgUrl;

}
