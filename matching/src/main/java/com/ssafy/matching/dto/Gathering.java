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

@ApiModel(value = "Gathering : 운동 모임 정보", description = "운동 모임의 상세 정보를 나타낸다.")

@SuppressWarnings("serial")
@Entity
public class Gathering implements Serializable {
    @ApiModelProperty(value = "운동 모임 번호")
    @Id
    private int gatheringId;
    @ApiModelProperty(value = "지역 등록 번호", required = true)
    private int placeId;
    @ApiModelProperty(value = "운동 모임 제목", required = true)
    private String title;
    @ApiModelProperty(value = "운동 모임 설명")
    private String description;
    @ApiModelProperty(value = "운동 모임 정원", required = true)
    private int people;
    @ApiModelProperty(value = "운동 모임 시작 날짜", required = true)
    private String startDate;
    @ApiModelProperty(value = "운동 모임 시작 시간", required = true)
    private String startTime;
    @ApiModelProperty(value = "운동 모임 지속 시간", required = true)
    private int playTime;
    @ApiModelProperty(value = "운동 모임 모집 완료 여부", required = true)
    private boolean isCompleted;
    @ApiModelProperty(value = "모임장의  memberId", required = true)
    private long hostId;
    @ApiModelProperty(value = "운동 모임 성별 조건", required = true)
    private String sex;
    @ApiModelProperty(value = "운동 모임 레벨", required = true)
    private String level;
    @ApiModelProperty(value = "운동 모임의 스포츠 종류", required = true)
    private String sports;
    @ApiModelProperty(value = "운동 모임의 게임 타입", required = true)
    private String gameType;

    @ApiModelProperty(value = "운동 모임 장소")
    @OneToOne
    //TODO 에러나서 추가한거 다시 검토하기
    @JoinColumn(name = "placeId", insertable=false, updatable=false) //에러나서 추가로 붙임
    private Place place;

    @ApiModelProperty(value = "운동 모임의 멤버 리스트")
    @OneToMany
    @JoinColumn(name = "gatheringId", updatable=false)
    private List<GatheringMember> memberGatheringList;

}

