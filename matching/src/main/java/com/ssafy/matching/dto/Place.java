package com.ssafy.matching.dto;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

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
    @ApiModelProperty(value = "시/도 이름")
    private String sido;
    @ApiModelProperty(value = "시/군 이름")
    private String sigun;
    @ApiModelProperty(value = "동 이름")
    private String dong;
    @ApiModelProperty(value = "지번 이름")
    private String jibun;
    @ApiModelProperty(value = "장소 이름")
    private String place_name;
    @ApiModelProperty(value = "x좌표")
    private Float latX;
    @ApiModelProperty(value = "y좌표")
    private Float latY;
}
