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
public class Memberb {
    @Id
//    @Column(name = "member_id")
    int id;
    String nickname;
    String name;

//    @OneToOne(mappedBy = "sometimes", fetch = FetchType.LAZY, cascade = CascadeType.PERSIST)
//    Membera memberOften;
}
