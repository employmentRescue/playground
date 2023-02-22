package com.websocket.chat.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import java.util.List;

@Entity
@Getter
@Setter
public class MemberSometimes {

    @Id
    @ApiModelProperty(value = "멤버 계정", required = true)
    private long memberId;
    @ApiModelProperty(value = "만든 날짜")
    private String createdDate;
    @ApiModelProperty(value = "수정된 날짜")
    private String modifiedDate;
    @ApiModelProperty(value = "멤버 이름")
    private String name;
    @ApiModelProperty(value = "닉네임")
    private String nickname;
    @ApiModelProperty(value = "멤버가 선호하는 장소의 주소")
    private String address;
    @ApiModelProperty(value = "위도")
    private Double lat;
    @ApiModelProperty(value = "경도")
    private Double lng;
    @ApiModelProperty(value = "거리", required = true)
    private Integer distance;

    @OneToMany
    @JoinColumn(name="memberId")
    private List<MemberGatheringChatroom> memberGatheringChatrooms;

    @OneToMany
    @JoinColumn(name="memberId")
    private List<MemberTeamChatroom> memberTeamChatrooms;

}
