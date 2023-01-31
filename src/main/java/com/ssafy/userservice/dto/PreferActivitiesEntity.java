package com.ssafy.userservice.dto;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "PREFER_ACTIVITIES")
public class PreferActivitiesEntity {
    @Id @GeneratedValue(strategy = GenerationType.UUID) @Column(name = "id", insertable = false, updatable = false)
    Long id;
    @Column(name = "member_id")
    int member_id;
    String activity;
}
