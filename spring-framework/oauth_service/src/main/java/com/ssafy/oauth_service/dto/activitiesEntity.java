package com.ssafy.oauth_service.dto;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "PREFER_ACTIVITIES")
public class activitiesEntity extends BaseTimeEntity {
    @Id
    @GeneratedValue
    @Column(name = "ID", insertable = false, updatable = false)
    Long id;
    @Column(name = "MEMBER_ID") @Id
//            @Id
    long member_id;
    @Id
    String activity;
    String level;

}
