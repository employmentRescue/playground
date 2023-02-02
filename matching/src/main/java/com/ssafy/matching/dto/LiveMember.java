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
@ApiModel(value = "LiveMember : 실시간 운동 모임 정보", description = "실시간 운동 모임의 정보를 나타낸다.")
public class LiveMember implements Serializable {
    @ApiModelProperty(value = "실시간 운동 모임-멤버 아이디")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int live_memberId;
    @ApiModelProperty(value = "실시간 운동 모임 번호", required = true)
    private int liveId;
    @ApiModelProperty(value = "멤버의 아이디", required = true)
    private long memberId;
}
