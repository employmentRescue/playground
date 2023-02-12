package com.ssafy.userservice.dto;


import com.fasterxml.jackson.annotation.*;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.HashSet;
import java.util.LinkedList;
import java.util.List;
import java.util.Set;

@JsonIgnoreProperties(value = {"createdDate", "modifiedDate"}, ignoreUnknown = true)


@Getter @Setter
@ToString(exclude = "preferActivities")
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Entity @Table(name = "MEMBER_OFTEN")
public class MemberOftenEntity extends BaseTimeEntity {
    @Id @EqualsAndHashCode.Include
    @Column(name = "MEMBER_ID")
    @JsonIgnore
    long id;
    String status_message;
    String prefer_time;
    String web_fcm_token;
    String mobile_fcm_token;
    String user_profile_img_url;

////    // cascade 써야하는 이유 : https://stackoverflow.com/questions/33038202/how-do-i-solve-this-error-of-object-references-an-unsaved-transient-instance-s
////    @OneToMany(cascade=CascadeType.ALL,fetch = FetchType.EAGER)
//@OneToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH}, fetch = FetchType.EAGER)
//@JoinColumn(name = "MEMBER_ID")
//
//
////    @OneToMany()

    @OneToMany(mappedBy = "memberOften", cascade = CascadeType.ALL, orphanRemoval = true)
    List<activitiesEntity> prefer_activities;
}