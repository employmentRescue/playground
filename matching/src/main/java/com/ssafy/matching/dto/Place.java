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

@ApiModel(value = "Place : 장소 정보", description = "장소의 상세 정보를 나타낸다.")

@SuppressWarnings("serial")
@Entity
public class Place implements Serializable {
    @ApiModelProperty(value = "장소 번호")
    @Id
    @Column(name = "place_id")
    private int placeId;
    private String address;
    @ApiModelProperty(value = "위도")
    private double lat;
    @ApiModelProperty(value = "경도")
    private double lng;
}
