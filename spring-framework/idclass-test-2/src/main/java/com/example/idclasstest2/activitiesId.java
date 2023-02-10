package com.example.idclasstest2;

import lombok.*;

import java.io.Serializable;

@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@NoArgsConstructor
@AllArgsConstructor
public class activitiesId implements Serializable {
    private long member_id;
    private String activity;
}
