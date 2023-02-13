package com.ssafy.userservice.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@JsonIgnoreProperties(value = {"createdDate", "modifiedDate"}, ignoreUnknown = true)

@Getter @Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity @Table(name = "MEMBER_SOMETIMES")
public class MemberSometimesEntity extends BaseTimeEntity {
    @Id @JsonIgnore
    @Column(name = "MEMBER_ID")
    long id;
    @Column(unique = true)
    String nickname;
    String name;
}

