package com.ssafy.userservice.dto;

public enum FileTableType {
    user_profile_img("user"), match_img("match");

    private final String value;
    FileTableType(String value) { this.value = value; }
    public String getValue(){ return value; }
}
