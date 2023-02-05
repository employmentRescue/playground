package com.ssafy.matching.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString

@SuppressWarnings("serial")
@Entity
@ApiModel(value = "TeamMatchResult : 팀의 경기 결과", description = "팀 경기 결과를 나타낸다.")
public class TeamMatchResult implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(value = "팀 경기 결과 번호")
    private int team_match_result_id;
    private int team_id;
//    private int match_id;
    @ApiModelProperty(value = "경기 결과")
    private String result;

    @ManyToOne
    @JoinColumn(name = "matchId")
    @JsonIgnore
    private Match match;
}
