package com.ssafy.oauth_service.dto;

import lombok.*;

import java.io.Serializable;

@Builder
@Getter @Setter
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class activitiesId implements Serializable {
    private long memberOften;
    private String activity;
}
