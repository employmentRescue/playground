package com.ssafy.userservice.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@JsonIgnoreProperties(ignoreUnknown = true)

@Entity
@Getter @Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "MEMBER_SOMTIMES")
public class MemberSometimesEntity {
    @Id @Column(name = "MEMBER_ID")
    long id;
    String nickname;
    String name;
}

