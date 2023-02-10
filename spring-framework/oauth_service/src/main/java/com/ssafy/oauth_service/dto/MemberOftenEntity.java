package com.ssafy.oauth_service.dto;


import jakarta.persistence.*;
import lombok.*;

import java.util.LinkedList;
import java.util.List;

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

    // cascade 써야하는 이유 : https://stackoverflow.com/questions/33038202/how-do-i-solve-this-error-of-object-references-an-unsaved-transient-instance-s
    @OneToMany(cascade= CascadeType.ALL)
//            @JoinTable(name = "PREFER_ACTIVITIES", joinColumns = @JoinColumn(name = "MEMBER_ID"))
    @JoinColumn(name = "MEMBER_ID")
    List<activitiesEntity> prefer_activities = new LinkedList<>();
}
