package com.ssafy.oauth_service.dto;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import jakarta.persistence.*;
import lombok.*;


@JsonIgnoreProperties(value = {"createdDate", "modifiedDate"}, ignoreUnknown = true)
@JsonIdentityInfo(generator = ObjectIdGenerators.UUIDGenerator.class)

@Getter
@Setter
@ToString(exclude = {"memberSometimes"})
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true) // '@EqualsAndHashCode.Include' 붙은 어노테이션만 포함
@Entity @IdClass(activitiesId.class)  @Table(name = "PREFER_ACTIVITIES")
public class activitiesEntity extends BaseTimeEntity {
    @Id @EqualsAndHashCode.Include
    @Column(name = "ACTIVITY")
    String activity;
    @Column(name = "LEVEL")
    String level;


    @Id @EqualsAndHashCode.Include
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    @JsonIgnore
    public MemberSometimesEntity memberSometimes = new MemberSometimesEntity();
}
