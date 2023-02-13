package com.ssafy.userservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.jpa.impl.JPAUpdateClause;
import com.ssafy.userservice.dto.*;
import com.ssafy.userservice.service.preferActivitiesService;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/user")
public class UserInfoController {


    @Autowired
    private ObjectMapper objectMapper;

    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private JPAQueryFactory queryFactory;

    @Autowired
    preferActivitiesService prefer_activity_service;


    final private static QMemberOftenEntity qMemberOften = new QMemberOftenEntity("MEM_OFTEN");
    final private static QMemberSometimesEntity qMemberSometimes = new QMemberSometimesEntity("MEM_SOME");

    @RequestMapping("/hello")
    @ResponseBody
    String hello(){
        System.out.println("hello");
        return "hello - user service";
    }

    @PostMapping("/check/nickname/{nickname}")
    ResponseEntity checkNickname(@PathVariable String nickname){

        try{
            return new ResponseEntity<Map<String, Boolean>>(
                    Map.of(
                    "isExist",
                    queryFactory
                            .selectFrom(qMemberSometimes)
                            .where(qMemberSometimes.nickname.eq(nickname))
                            .fetchFirst() != null
                    ),
                    HttpStatus.OK);
        }
        catch (Throwable e){
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }



    @Transactional
    @PostMapping("/search/id")
    ResponseEntity searchUserInfoByNickname(@RequestBody Set<String> nicknames){
        System.out.println(nicknames);
        List<Object> searchResult = new LinkedList<>();

        for (Tuple t : queryFactory.select(qMemberSometimes.id, qMemberSometimes.nickname)
                .from(qMemberSometimes)
                .where(qMemberSometimes.nickname.in(nicknames))
                .fetch()){
            Map<String, Object> member = new HashMap<>();
            member.put("id", t.get(0, Long.class));
            member.put("nickname", t.get(1, String.class));

            searchResult.add(member);
        }

        try {
        }
        catch (Throwable e){
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity(searchResult, HttpStatus.OK);
    }


    @Transactional
    @PostMapping("/search")
    ResponseEntity searchUserInfo(@RequestHeader("x-forwarded-for-user-id") long userID , @RequestBody Set<String> req){
        System.out.println("req : " + req);
        Map<String, Object> searchResult = new HashMap<>();

        Map<String, Object> memOften = objectMapper.convertValue(entityManager.find(MemberOftenEntity.class, userID), Map.class);
        for (String attr : req) {
            attr = attr.toLowerCase();
            if  (memOften.containsKey(attr)) searchResult.put(attr, memOften.get(attr));
        }

        Map<String, Object> memSome = objectMapper.convertValue(entityManager.find(MemberSometimesEntity.class, userID), Map.class);
        for (String attr : req) {
            attr = attr.toLowerCase();
            if  (memSome.containsKey(attr)) searchResult.put(attr, memSome.get(attr));
        }



        try {
        }
        catch (Throwable e){
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        searchResult.put("user-id",userID);
        return new ResponseEntity(searchResult, HttpStatus.OK);
    }

//    Map<String, Object>

    @Transactional
    @PostMapping("/regist/{user_id}")
    ResponseEntity registUserInfo(@PathVariable("user_id") long userID, @RequestBody Map<String, Object> json) throws IOException {
        // MemberOften Entity를 입력받는다.
        // prefer_activites를 입력받는다.
        // MemberSome Entity를 입력받는다.
        // prefer_activity가 null이 아니면, 중복제거후 MemberOften Entity에 넣는다.
        //


        MemberOftenEntity memberOftenEntity = objectMapper.convertValue(json, MemberOftenEntity.class);
        memberOftenEntity.setId(userID);


//        List<activitiesEntity> arr = new LinkedList();
        Map<String, activityDTO> unique_req = new HashMap<>();

        for (Object obj : objectMapper.convertValue(json.get("prefer_activities"),            List.class)) {
            activityDTO activity = objectMapper.convertValue(obj, activityDTO.class);
            unique_req.put(activity.getActivity(), activity);
        }

        List<activitiesEntity> chidren = new LinkedList<>();
        for (activityDTO activity : unique_req.values().stream().toList()) {
            chidren.add(
                    activitiesEntity.builder()
                            .memberOften(memberOftenEntity)
                            .activity(activity.getActivity())
                            .level(activity.getLevel())
                            .build()
            );
        }

        memberOftenEntity.setPrefer_activities(chidren);
        entityManager.persist(memberOftenEntity);

        // ********************************************* memberSome *********************************************
        MemberSometimesEntity memberSometimes = objectMapper.convertValue(json, MemberSometimesEntity.class);
        memberSometimes.setId(userID);
        entityManager.persist(memberSometimes);




//        MemberOftenEntity memberOften = objectMapper.convertValue(json, MemberOftenEntity.class);
//        MemberSometimesEntity memberSometimes = objectMapper.convertValue(json, MemberSometimesEntity.class);
//
//        memberOften.setId(userID); memberSometimes.setId(userID);
//
//
//
//        Map<String, activitiesEntity> result = new HashMap<>();
//        List<Object> arr = objectMapper.convertValue(json.get("prefer_activities"),            List.class);
//
//
//
//
//
//        for (Object obj : arr) {
//
//            activityDTO activity = objectMapper.convertValue(obj, activityDTO.class);
////            result.put(activity.getActivity(), activity);
//            entityManager.persist(activitiesEntity.builder().activity(activity.getActivity()).level(activity.getLevel()).memberOften(memberOften).build());
//        }
//
//
//        memberOften.setPreferActivities(result.values().stream().toList());
//        entityManager.persist(memberOften);

        return new ResponseEntity(
                HttpStatus.OK);
    }


    @Transactional
    @PostMapping("/update")
    ResponseEntity updateUserInfo(@RequestHeader("x-forwarded-for-user-id") long userID, @RequestBody Map<String, Object> json){
        if (json.containsKey("prefer_activities")) json.remove("prefer_activities");

        MemberOftenEntity memOften = objectMapper.convertValue(json, MemberOftenEntity.class);
        MemberSometimesEntity memSome = objectMapper.convertValue(json, MemberSometimesEntity.class);

        // ===================================================================================================
        try
        {
            // MemberOftenEntity 객체에 대해 not null 인 값만 update(단, memOften != null인 경우만 실행)
            if (memOften != null && userID > 0){
                int cnt = 0;

                JPAUpdateClause updateQ = queryFactory.update(qMemberOften).where(qMemberOften.id.eq(userID));

                if (memOften.getStatus_message() != null){
                    updateQ.set(qMemberOften.status_message, memOften.getStatus_message());
                    cnt++;
                }

                if (memOften.getPrefer_time() != null){
                    updateQ.set(qMemberOften.prefer_time, memOften.getPrefer_time());
                    cnt++;
                }

                if (memOften.getWeb_fcm_token() != null){
                    updateQ.set(qMemberOften.web_fcm_token, memOften.getWeb_fcm_token());
                    cnt++;
                }

                if (memOften.getMobile_fcm_token() != null){
                    updateQ.set(qMemberOften.mobile_fcm_token, memOften.getMobile_fcm_token());
                    cnt++;
                }

                if (memOften.getUser_profile_img_url() != null)
                {
                    updateQ.set(qMemberOften.user_profile_img_url, memOften.getUser_profile_img_url());
                    cnt++;
                }

                if (cnt > 0) updateQ.execute();
            }


            // MemberSometime 객체에 대해 not null 인 값만 update(단, memSome != null인 경우만 실행)
            if (memSome != null && userID > 0){
                int cnt = 0;

                JPAUpdateClause updateQ = queryFactory.update(qMemberSometimes).where(qMemberSometimes.id.eq(userID));

                if (memSome.getName() != null){
                    updateQ.set(qMemberSometimes.name, memSome.getName());
                    cnt++;
                }

                if (memSome.getNickname() != null){
                    updateQ.set(qMemberSometimes.nickname, memSome.getNickname());
                    cnt++;
                }

                if (cnt > 0) updateQ.execute();
            }
            // ===================================================================================================

            // EntityManager clear
            entityManager.flush(); entityManager.flush();


            System.out.println(queryFactory.selectFrom(qMemberOften));


            // 응답값으로 HttpStatus.OK 보내기
            return new ResponseEntity(HttpStatus.OK);
        }
        catch (Throwable e){
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    // 처음에는 자식일것같았는데, orphan이라는 옵션이 존재한다면 부모를 지우는게 맞을것같다는 느낌이 듬

    // [{사용자 id, 좋아하는 운동명, 운동능력치}, ...] 객체 배열을 입력받는다.
    // 요청값을 전처리한다.
    // -- 복합키가 같은 것이면 가장 마지막값으로 초기화한다.
    // -- activity가 null이면 넣지 않는다.
    // -- id가 0의 값이면, 사용자 id를 넣어준다.
    // -- level이 null인 것은 상관하지 않는다.
    // 부모 엔티티를 업데이트한다. <- 예상 : cascade에 의해 자식을 업데이트하면, 부모에 있는 자식 인스턴트도 같이 업데이트 될 것으로 예상함
    @Transactional
    @PostMapping("/update/prefer_activities")
    ResponseEntity updateUserPreferActivites(@RequestHeader("x-forwarded-for-user-id") long userID, @RequestBody Set<activityDTO> req) throws Exception {
        prefer_activity_service.updateUserPreferActivites(userID, req);
        try {
        }
        catch (Throwable e) {
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity(HttpStatus.OK);
    }

    // [{사용자 id, 좋아하는 운동명, 운동능력치}, ...] 객체 배열을 입력받는다.
    // 부모 엔티티를 삭제한다. <- 부모에 적혀져 있는 자식도 삭제..?
    @Transactional
    @PostMapping("/delete/prefer_activities")
    ResponseEntity deleteUserPeferActivites(@RequestHeader("x-forwarded-for-user-id") long userID, @RequestBody Set<String> activities) throws Exception {
        prefer_activity_service.deleteUserPeferActivites(userID, activities.stream().map(s -> s.toLowerCase(Locale.ROOT)).collect(Collectors.toSet()));

        try {
        }
        catch (Throwable e) {
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

    // [{사용자 id, 좋아하는 운동명, 운동능력치}, ...] 객체 배열을 입력받는다.
    // 부모 엔티티에서 삽입을 한다.
    @Transactional
    @PostMapping("/add/prefer_activities")
    ResponseEntity insertUserPreferActivites(@RequestHeader("x-forwarded-for-user-id") long userID, @RequestBody Set<activityDTO> req) throws Exception {
        prefer_activity_service.insertUserPreferActivites(userID, req);


        try {
        }
        catch (Throwable e) {
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

}
