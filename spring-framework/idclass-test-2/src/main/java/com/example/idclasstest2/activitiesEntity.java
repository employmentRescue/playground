package com.example.idclasstest2;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
//@Table(name = "PREFER_ACTIVITIES")
@IdClass(activitiesId.class)
public class activitiesEntity {
    @Id
    long member_id;
//    @Id
    String activity;
    String level;

}
