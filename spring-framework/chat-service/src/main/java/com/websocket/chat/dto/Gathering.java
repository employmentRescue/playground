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
public class Gathering {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(value = "운동모임 아이디", required = true)
    private int gatheringId;
    @ApiModelProperty(value = "장소 아이디", required = true)
    private int placeId;
    @ApiModelProperty(value = "운동모임 이름", required = true)
    private String title;
    @ApiModelProperty(value = "운동모임 설명")
    private String description;
    @ApiModelProperty(value = "운동모임 인원수", required = true)
    private int people;
    @ApiModelProperty(value = "운동모임 시작날짜", required = true)
    private  String startDate;
    @ApiModelProperty(value = "운동모임 시작시간", required = true)
    private String startTime;
    @ApiModelProperty(value = "운동시간", required = true)
    private int playTime;
    @ApiModelProperty(value = "인원 확정여부", required = true)
    private boolean isCompleted;
    @ApiModelProperty(value = "운동모임 매니저", required = true)
    private int manager;
    @ApiModelProperty(value = "운동모임 성별", required = true)
    private String sex;
    @ApiModelProperty(value = "운동모임 수준", required = true)
    private String level;
    @ApiModelProperty(value = "종목", required = true)
    private String sports;
    @ApiModelProperty(value = "종목 형식", required = true)
    private String game_type;

}
