package com.ssafy.userservice.dto;

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
@Table(name = "MEMBER_SOMTIMES")
public class MemberSometimesEntity {
    @Id @Column(name = "MEMBER_ID")
    int id;
    String nickname;
    String name;
}
