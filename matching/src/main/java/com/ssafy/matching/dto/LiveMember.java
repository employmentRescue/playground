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

@ApiModel(value = "LiveMember : 실시간 운동 모임 정보", description = "실시간 운동 모임의 정보를 나타낸다.")

@SuppressWarnings("serial")
@Entity
public class LiveMember implements Serializable {
    @Id
    @ApiModelProperty(value = "실시간 운동 모임-멤버 아이디")
    private int live_memberId;
    @ApiModelProperty(value = "실시간 운동 모임 번호", required = true)
    private int liveId;
    @ApiModelProperty(value = "멤버의 아이디", required = true)
    private long memberId;
}
