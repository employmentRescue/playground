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

@SuppressWarnings("serial")
@Entity
@ApiModel(value = "Team : 팀 정보", description = "팀의 정보를 나타낸다.")
public class Team implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(value = "팀 번호")
    private int teamId;
    @ApiModelProperty(value = "팀 이름", required = true)
    private String name;
    @ApiModelProperty(value = "팀장의 memberId")
    private long managerId;
    @ApiModelProperty(value = "팀의 게임 종류", required = true)
    private String gameType;
    @ApiModelProperty(value = "팀의 프로필 이미지")
    private String teamProfileImgUrl;
    
    //TODO 필요하면 팀장 객체 연결하기

    @ApiModelProperty(value = "팀의 멤버 리스트")
    @OneToMany
    //TODO 팀 멤버 리스트 : insertable 나중에 수정하기
    @JoinColumn(name = "teamId", insertable=false, updatable=false)
    private List<TeamMember> teamMemberList;

    //TODO 팀 매치 리스트
}
