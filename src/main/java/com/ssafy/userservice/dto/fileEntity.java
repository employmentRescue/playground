package com.ssafy.userservice.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "FILE")
public class fileEntity extends BaseTimeEntity {
    @Id @Column(name = "FILE_NAME")
    String file_name;
    String origin_file_name;
    String userID;
}
