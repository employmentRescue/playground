package com.ssafy.matching.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString

@SuppressWarnings("serial")
@Entity
@Table(name = "member_sometimes")
public class Member implements Serializable {
    @Id
    private int memberId;
    private int nickname;
    private int pwHash;
    private int name;
}
