package com.ssafy.userservice.dto;

import jakarta.annotation.Nonnull;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Membera {
    @Id
    int id;
    String status_message;
    String preferTime;
    String fcmToken;
    String userProfileImgURL;



//    @OneToOne(fetch = FetchType.LAZY)
//    @JoinTable(
//            name = "member_connector", // 조인 테이블명
//            joinColumns = @JoinColumn(name = "member_id",insertable=false, updatable=false), // 외래키
//            inverseJoinColumns = @JoinColumn(name = "member_id",insertable=false, updatable=false)
//    )
//    @JoinColumn(name = "id",insertable=false, updatable=false)
//    private Memberb sometimes;
}
