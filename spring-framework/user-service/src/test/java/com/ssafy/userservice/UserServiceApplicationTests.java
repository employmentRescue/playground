package com.ssafy.userservice;


import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.userservice.dto.activityRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import javax.transaction.Transactional;

@SpringBootTest
class UserServiceApplicationTests {
    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private JPAQueryFactory queryFactory;
//
//
//    static QMembera often = new QMembera("often");
//    static QMemberb some = new QMemberb("some");
//
//    static ObjectMapper objectMapper = new ObjectMapper();

    @Autowired
    activityRepository repository;
//
    @Test
    @Transactional
    void contextLoads() throws Exception {
        try {

        }
        catch (Throwable e){
            e.printStackTrace();
        }
    }
//
//    // ----------------------------------------------- api test -----------------------------------------------
//
////    @Test
//    // 닉네임이 중복되는지 확인해주는 rest api
//    void checkNickname(){
//        String nickname = "";
//
//        System.out.println(queryFactory
//                .selectFrom(some)
//                .where(some.nickname.eq(nickname))
//                .fetchFirst() != null);
//    }
//
//    @Test
//        // 사용자 닉네임, 프로필 사진이 있는 주소명을 알려주는 rest api
//        /// 부가적으로 필요한 것 : 사진저장 rest api, 사진 불러오는 rest api
//    void getUserData() throws JsonProcessingException {
//        int userID = 12345;
//
//        Tuple a = (Tuple)queryFactory
//                .select(some, often)
//                .from(often)
//                .join(some)
//                .where(often.id.eq(some.id), often.id.eq(userID))
//                .fetchOne();
//
//        Membera instance = a.get(1, Membera.class);
//
//        System.out.println(instance);
//        System.out.println();
//
//
//
//        // json 관련 도움을 준 사이트 : https://cchoimin.tistory.com/entry/JAVA-JSON-%EB%8B%A4%EB%A3%A8%EA%B8%B0-%EC%A0%95%EB%A6%AC-JACKSON-ObjectMapper
//        Map<String, Object> map = objectMapper.convertValue(instance, Map.class);
//        System.out.println(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(map));
//    }
//
//    @Test
//            @Transactional
//        // 사용자 정보를 저장 or 업데이트하는 rest api
//    void setUserData(){
//        int userID = 12345;
//        Membera a = Membera.builder().userProfileImgURL("http://localhost/img").build();
//
//        if (a == null) return;
//
//
//        JPAUpdateClause updateQ = queryFactory
//                .update(often)
//                .where(often.id.eq(userID));
//
//        if (a.getFcmToken() != null)
//            updateQ.set(often.fcmToken, a.getFcmToken());
//
//        if (a.getStatus_message() != null)
//            updateQ.set(often.status_message, a.getStatus_message());
//
//        if (a.getUserProfileImgURL() != null)
//            updateQ.set(often.userProfileImgURL, a.getUserProfileImgURL());
//
//        if (a.getPreferTime() != null)
//            updateQ.set(often.preferTime, a.getPreferTime());
//        System.out.println(updateQ);
//        updateQ.execute();
//        entityManager.flush(); entityManager.clear();
//
//        System.out.println("끗");
//    }
//
//    @Test
//        // 사용자가 선호하는 운동 목록을 추가하는 rest api
//    void addUserPreferActivities(){
//    }
//
//    @Test
//        // 사용자가 선호하는 운동 목록을 제거하는 rest api
//    void removeUserPreferActivities(){
//    }

}
