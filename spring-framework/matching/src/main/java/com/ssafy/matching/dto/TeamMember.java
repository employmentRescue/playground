package com.ssafy.matching.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.*;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

@SuppressWarnings("serial")
@Entity
@ApiModel(value = "TeamMember : 팀의 멤버 정보", description = "팀의 멤버 정보를 나타낸다.")
public class TeamMember implements Serializable {
    @ApiModelProperty(value = "팀-멤버 아이디")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int teamMemberId;
    @ApiModelProperty(value = "팀 번호", required = true)
    private int teamId;
    @ApiModelProperty(value = "멤버의 아이디", required = true)
    private long memberId;

    @ManyToOne
    @JoinColumn(name = "memberId", insertable=false, updatable=false)
    private Member member;
}
