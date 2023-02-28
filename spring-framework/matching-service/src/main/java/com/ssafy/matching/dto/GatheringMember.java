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

@ApiModel(value = "GatheringMember : 운동 모임 멤버 정보", description = "운동 모임의 멤버를 나타낸다.")

@SuppressWarnings("serial")
@Entity
public class GatheringMember implements Serializable {
    @ApiModelProperty(value = "운동 모임-멤버 아이디")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int gatheringMemberId;
    @ApiModelProperty(value = "운동 모임 번호", required = true)
    private int gatheringId;
    @ApiModelProperty(value = "멤버의 아이디", required = true)
    private long memberId;

    @ManyToOne
    @JoinColumn(name = "memberId", insertable=false, updatable=false)
    private Member member;

    public GatheringMember(int gatheringMemberId, int gatheringId, long memberId) {
        this.gatheringMemberId = gatheringMemberId;
        this.gatheringId = gatheringId;
        this.memberId = memberId;
    }
}
