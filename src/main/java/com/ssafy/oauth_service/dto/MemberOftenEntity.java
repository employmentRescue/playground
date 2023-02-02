package com.ssafy.oauth_service.dto;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Getter @Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "MEMBER_OFTEN")
public class MemberOftenEntity extends BaseTimeEntity {
    @Id
    @Column(name = "MEMBER_ID")
    long id;
    String status_message;
    String prefer_time;
    String web_fcm_token;
    String mobile_fcm_token;
    String user_profile_img_url;
//    @ElementCollection
////    @JoinColumn
//            @JoinTable(name = "PREFER_ACTIVITIES", joinColumns = @JoinColumn(name = "MEMBER_ID"))
//    Set<String> preferActivities = new HashSet<>();
}
