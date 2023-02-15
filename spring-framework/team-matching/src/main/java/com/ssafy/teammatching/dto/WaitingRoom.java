package com.ssafy.teammatching.dto;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@ToString

@SuppressWarnings("serial")
@Entity
public class WaitingRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int roomId;
    private int teamId;
    private String matchDate;
    private double lat;
    private double lng;
    private int distance;
    private String minStartTime;
    private String maxStartTime;
    private String sports;
    private String gameType;
    private int teamPoint;
    private String registerTime;

    @Builder
    public WaitingRoom(int teamId, String matchDate, double lat, double lng, int distance, String minStartTime, String maxStartTime, String sports, String gameType, int teamPoint, String registerTime) {
        this.teamId = teamId;
        this.matchDate = matchDate;
        this.lat = lat;
        this.lng = lng;
        this.distance = distance;
        this.minStartTime = minStartTime;
        this.maxStartTime = maxStartTime;
        this.sports = sports;
        this.gameType = gameType;
        this.teamPoint = teamPoint;
        this.registerTime = registerTime;
    }
}
