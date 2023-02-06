package com.ssafy.matching.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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

    @ApiModelProperty(value = "팀의 멤버 리스트", required = true)
    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "teamId")
    private List<TeamMember> teamMemberList = new ArrayList<>();

    //TODO ERRIR : Could not write JSON: could not extract ResultSet; nested exception is com.fasterxml.jackson.databind.JsonMappingException: could not extract ResultSet (through reference chain: com.ssafy.matching.dto.Team["teamMatchResultList"])]
//    @ApiModelProperty(value = "팀의의 경기 리스트")
//    @OneToMany
//    @JoinColumn(name = "teamId", insertable=false, updatable=false)
//    private List<TeamMatchResult> teamMatchResultList;
}
