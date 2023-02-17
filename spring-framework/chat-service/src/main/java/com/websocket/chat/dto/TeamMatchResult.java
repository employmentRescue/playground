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
public class TeamMatchResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(value = "팀 대전 결과 아이디", required = true)
    private int teamMatchResultId;
    @ApiModelProperty(value = "팀 아이디", required = true)
    private int teamId;
    @ApiModelProperty(value = "매치 아이디", required = true)
    private int matchId;
    @ApiModelProperty(value = "승리 여부", required = true)
    private boolean isWin;

}
