package com.ssafy.teammatching.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString

@SuppressWarnings("serial")
@Entity
@ApiModel(value = "PreferredPlace : 팀 경기의 선호 장소 정보", description = "팀 경기의 선호 장소 정보를 나타낸다.")
public class PreferredPlace implements Serializable {
    @ApiModelProperty(value = "장소 번호")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int preferredPlaceId;
    @ApiModelProperty(value = "주소", required = true)
    private String address;
    @ApiModelProperty(value = "위도", required = true)
    private double lat;
    @ApiModelProperty(value = "경도", required = true)
    private double lng;

    @Builder
    public PreferredPlace(String address, double lat, double lng) {
        this.address = address;
        this.lat = lat;
        this.lng = lng;
    }
}
