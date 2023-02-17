package com.ssafy.teammatching.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

@ApiModel(value = "TeamStats : 팀 통계 정보", description = "팀 통계의 상세 정보를 나타낸다.")
public class TeamStats {
    @ApiModelProperty(value = "팀 번호")
    private int teamId;
    @ApiModelProperty(value = "팀 이름")
    private String teamName;
    @ApiModelProperty(value = "경기 횟수")
    private int matchTimes;
    @ApiModelProperty(value = "이긴 횟수")
    private int win;
    @ApiModelProperty(value = "비긴 횟수")
    private int draw;
    @ApiModelProperty(value = "진 횟수")
    private int lose;
    @ApiModelProperty(value = "팀 랭킹 점수")
    private int point;
    @ApiModelProperty(value = "팀 티어")
    private String tier;
}
