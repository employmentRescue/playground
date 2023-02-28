package com.ssafy.teammatching.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

@ApiModel(value = "MemberDetail : 멤버의 상세 정보", description = "멤버의 자주 업데이트되는 상세 정보를 나타낸다.")

@SuppressWarnings("serial")
@Entity
@Table(name="member_often")
public class MemberDetail implements Serializable {
    @Id
    @ApiModelProperty(value = "회원 번호")
    private long memberId;
    @ApiModelProperty(value = "회원의 상태 메시지")
    private String statusMessage;
    @ApiModelProperty(value = "회원의 선호 운동 시간대 범위")
    private String preferTime;
    @ApiModelProperty(value = "회원의 웹 토큰 번호")
    private String webFcmToken;
    @ApiModelProperty(value = "회원의 모바일 토큰 번호")
    private String mobileFcmToken;
    @ApiModelProperty(value = "회원의 프로필 이미지 URL")
    private String userProfileImgUrl;
}
