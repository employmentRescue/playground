package com.websocket.chat.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@Getter
@Setter
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(value = "팀 아이디", required = true)
    private int teamId;
    @ApiModelProperty(value = "팀 이름", required = true)
    private String name;
    @ApiModelProperty(value = "대전 타입", required = true)
    private String gameType;

}
