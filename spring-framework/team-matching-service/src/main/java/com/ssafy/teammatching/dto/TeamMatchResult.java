package com.ssafy.teammatching.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString(exclude = {"team","match"})

@SuppressWarnings("serial")
@Entity
@ApiModel(value = "TeamMatchResult : 팀의 경기 결과", description = "팀 경기 결과를 나타낸다.")
public class TeamMatchResult implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(value = "팀 경기 결과 번호")
    private int teamMatchResultId;
    @ApiModelProperty(value = "팀 번호", required = true)
    private int teamId;
//    private int matchId;
    @ApiModelProperty(value = "경기 결과")
    private String result;

    @ManyToOne
    @JoinColumn(name = "teamId", insertable=false, updatable=false)
    @JsonIgnore
    private Team team;

    @ManyToOne
    @JoinColumn(name = "matchId")
    @JsonIgnore
    private Match match;

    @Builder
    public TeamMatchResult(int teamId) {
        this.teamId = teamId;
    }
}
