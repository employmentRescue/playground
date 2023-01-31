package com.ssafy.matching.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.sql.Time;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

@ApiModel(value = "Live : 실시간 운동 모임 정보", description = "실시간 운동 모임의 정보를 나타낸다.")

@SuppressWarnings("serial")
@Entity
public class Live implements Serializable {
    @Id
    private int liveId;
    private int placeId;
    private String detail;
    private int currentPeopleNum;
    private int totalPeopleNum;
    private Time registTime;
    private int hostId;
    private String sports;

    @OneToOne
    //TODO 에러나서 추가한거 다시 검토하기
    @JoinColumn(name = "placeId", insertable=false, updatable=false) //에러나서 추가로 붙임
    private Place place;

    @OneToOne
    @JoinColumn(name = "hostId", insertable=false, updatable=false)
    private Member host;

    @ApiModelProperty(value = "실시간 운동 모임의 멤버 리스트")
    @OneToMany
    @JoinColumn(name = "liveId")
    private List<LiveMember> liveMemberList;

}
