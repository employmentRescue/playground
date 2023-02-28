package com.ssafy.teammatching.dto;

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
    @ApiModelProperty(value = "운동 종류", required = true)
    private String sports;
    @ApiModelProperty(value = "팀의 게임 종류", required = true)
    private String gameType;
    @ApiModelProperty(value = "운동 레벨", required = true)
    private String level;
    @ApiModelProperty(value = "팀의 랭킹 포인트")
    private int point;

    @Transient
    private String tier;

    @ApiModelProperty(value = "팀의 경기 리스트")
    @OneToMany
    @JoinColumn(name = "teamId", insertable=false, updatable=false)
    private List<TeamMatchResult> teamMatchResultList;
}
