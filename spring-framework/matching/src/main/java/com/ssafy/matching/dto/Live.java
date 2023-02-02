package com.ssafy.matching.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(value = "실시간 운동 모임 번호")
    private int liveId;
//    @ApiModelProperty(value = "장소 번호", required = true)
//    private int placeId;
    @ApiModelProperty(value = "실시간 운동 모임 설명")
    private String detail;
    @ApiModelProperty(value = "현재 인원", required = true)
    private int currentPeopleNum;
    @ApiModelProperty(value = "총 인원", required = true)
    private int totalPeopleNum;
    @ApiModelProperty(value = "등록 시간", required = true)
    private String registTime;
    @ApiModelProperty(value = "모임장의 memberId", required = true)
    private long hostId;
    @ApiModelProperty(value = "실시간 운동 모임의 종류", required = true)
    private String sports;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "placeId")
    @ApiModelProperty(value = "실시간 운동 모임의 장소", required = true)
    private Place place;

    @OneToOne
    @JoinColumn(name = "hostId", insertable=false, updatable=false)
    @ApiModelProperty(value = "실시간 운동 모임의 모임장 정보")
    private Member host;

    @ApiModelProperty(value = "실시간 운동 모임의 멤버 리스트")
    @OneToMany
    @JoinColumn(name = "liveId", insertable=false, updatable=false)
    private List<LiveMember> liveMemberList;

}
