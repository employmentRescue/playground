package com.ssafy.userservice.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.*;

/*
* 영속성 컨텍스트와 연관관계를 알기전까지는 activitiesEntity가 POJO라고만 생각햇다.
* 하지만 답은 아니였다.
* activitiesEntity는 EntityManager라는 프록시가 관리하는 객체라고 한다.
* 얘는 @Entity라는 어노테이션이 붙은 곳에 있는 자바 인스턴트의 값이 변하면, DB에 반영해주는 영속(저장)을 해준다.
* 무슨소리냐? 연관관계가 전혀 없을 때는 아무런 문제가 없다. 아니, 이점을 몰라도 코딩이 가능하다.
* 근데 cascade를 쓰게 된다면, 자식까지 관리하는 것때문에 'Chilren a = 부모.getChilren()'를 해준후에, a.get(1).setName("..")이라고하면 em.persist()라는 함수를 호출하지 않아도 자동으로 DB에 반영이 되어버린다.
*
* 그래서 같은 필드명을 갖더라도, EntityManager가 전혀 신경쓰지 않는 'DTO'를 만드는게 낭비가 아니다.
* 새로 만든 DTO에 데이터를 마음껏 넣어도, 의도치않게 DB에 반영될 일이 없을테니 말이다.
*/

@JsonIgnoreProperties(ignoreUnknown = true)

@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class activityDTO {
    @EqualsAndHashCode.Include
    String activity;
    String level;
}
