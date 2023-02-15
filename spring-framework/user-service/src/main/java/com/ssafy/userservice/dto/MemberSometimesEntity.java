package com.ssafy.userservice.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@JsonIgnoreProperties(value = {"createdDate", "modifiedDate"}, ignoreUnknown = true)

@Getter @Setter
@ToString(exclude = "preferActivities")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity @Table(name = "MEMBER_SOMETIMES")
public class MemberSometimesEntity extends BaseTimeEntity {
    @EqualsAndHashCode.Include
    @Id @JsonIgnore
    @Column(name = "MEMBER_ID")
    long id;
    @Column(unique = true)
    String nickname;
    String name;
    String address;
    Double lat;
    Double lng;

    @OneToMany(mappedBy = "memberSometimes", cascade = CascadeType.ALL, orphanRemoval = true)
    List<activitiesEntity> prefer_activities;
}

