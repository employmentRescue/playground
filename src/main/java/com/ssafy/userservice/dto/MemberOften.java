package com.ssafy.userservice.dto;


import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Getter @Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "MEMBER_OFTEN")
public class MemberOften extends BaseTimeEntity {
    @Id
    @Column(name = "MEMBER_ID")
    int id;
    String status_message;
    String prefer_time;
    String web_fcm_token;
    String mobile_fcm_token;
    String user_profile_img_url;
    @ElementCollection(fetch = FetchType.EAGER)
    @Column(name = "activities")
    @CollectionTable(name = "user_activities", joinColumns = @JoinColumn(name = "member_often_member_id"))
    Set<String> preferActivities = new HashSet<>();
}
