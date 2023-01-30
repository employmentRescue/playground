package com.ssafy.matching.dto;

import lombok.*;

import javax.persistence.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

@SuppressWarnings("serial")
@Entity
@Table(name="member_sometimes")
public class Member implements Serializable {
    @Id
    private int memberId;
    private int nickname;
    private int pwHash;
    private int name;
}
