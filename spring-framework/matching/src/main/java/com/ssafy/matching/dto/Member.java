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

@ApiModel(value = "Member : 멤버 기본 정보", description = "멤버의 기본 정보를 나타낸다.")

@SuppressWarnings("serial")
@Entity
@Table(name="member_sometimes")
public class Member implements Serializable {
    @Id
    @ApiModelProperty(value = "회원 번호")
    private long memberId;
    @ApiModelProperty(value = "회원의 본명")
    private String name;
    @ApiModelProperty(value = "회원의 닉네임")
    private String nickname;

    @OneToOne
    @ApiModelProperty(value = "멤버의 자주 업데이트되는 상세 정보")
    @JoinColumn(name = "memberId", insertable=false, updatable=false)
    private MemberDetail memberDetail;
}
