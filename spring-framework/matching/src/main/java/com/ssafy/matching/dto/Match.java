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
@ToString

@SuppressWarnings("serial")
@Entity
@ApiModel(value = "Match : 팀 경기 정보", description = "팀의 경기 정보를 나타낸다.")
public class Match implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @ApiModelProperty(value = "경기 번호")
    private int matchId;
//    @ApiModelProperty(value = "장소 번호")
//    private int placeId;
    @ApiModelProperty(value = "경기 날짜", required = true)
    private String matchDate;
    @ApiModelProperty(value = "경기 시간", required = true)
    private String play_Time;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "placeId")
    @ApiModelProperty(value = "경기의 장소", required = true)
    private Place place;
    
    @OneToMany(cascade = CascadeType.ALL)
    @JoinColumn(name = "matchId")
    private List<TeamMatchResult> teamMatchResultList = new ArrayList<>();
}
