package com.ssafy.userservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.jpa.impl.JPAUpdateClause;
import com.ssafy.userservice.dto.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/user")
public class UserInfoController {


    @Autowired
    private ObjectMapper objectMapper;

    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private JPAQueryFactory queryFactory;


    final private static QMemberOftenEntity qMemberOften = new QMemberOftenEntity("MEM_OFTEN");
    final private static QMemberSometimesEntity qMemberSometimes = new QMemberSometimesEntity("MEM_SOME");


    @GetMapping("/check/nickname/{nickname}")
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

    @PostMapping("/search/{user_id}")
    ResponseEntity searchUserInfo(@PathVariable("user_id") long userID , @RequestBody Set<String> req){
        System.out.println("req : " + req);

            Map<String, Object> searchResult = new HashMap<>();

            // db로부터 데이터 가져옴 --> MemberOftenEntity, MemberSometimesEntity 객체에 데이터 할당하기
            Tuple ret = (Tuple)queryFactory
                    .select(qMemberOften, qMemberSometimes)
                    .from(qMemberOften)
                    .join(qMemberSometimes)
                    .where(qMemberOften.id.eq(qMemberSometimes.id), qMemberOften.id.eq(userID))
                    .fetchOne();
            // ================================================================================================================

            Map<String, Object> requestSearchList = null;



            // MemberOftenEntity 객체에 대해서 검색한 값만 searchResult에 넣기

            requestSearchList = objectMapper.convertValue(ret.get(0, MemberOftenEntity.class), Map.class);


            for (String key : req){
                if (key != String.valueOf(userID) && requestSearchList.get(key) != null) searchResult.put(key, requestSearchList.get(key));
            }
            // ================================================================================================================

            // MemberSometime 객체에 대해 검색한 값만 searchResult에 넣기
            requestSearchList = objectMapper.convertValue(ret.get(1, MemberSometimesEntity.class), Map.class);
            for (String key : req){
                if (key != String.valueOf(userID) && requestSearchList.get(key) != null) searchResult.put(key, requestSearchList.get(key));
            }
        try {

            // ================================================================================================================

            // searchResult를 <key,value>값 형식의 json으로 반환
            return new ResponseEntity(objectMapper.writerWithDefaultPrettyPrinter().writeValueAsString(searchResult), HttpStatus.OK);
            // ================================================================================================================

        }
        catch (Throwable e){
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    @PostMapping("/regist/{user_id}")
    ResponseEntity registUserInfo(@PathVariable("user_id") long userID, @RequestBody Map<String, Object> json) throws IOException {
//        MemberOftenEntity memOften = new MemberOftenEntity();


        MemberOftenEntity memOften = objectMapper.convertValue(json, MemberOftenEntity.class);
        MemberSometimesEntity memSome = objectMapper.convertValue(json, MemberSometimesEntity.class);
        memOften.setId(userID); memSome.setId(userID);

//        System.out.println(memOften);
//        System.out.println(memSome);

        // ===================================================================================================
        try
        {

            // MemberOftenEntity 객체에 대해 not null 인 값만 update(단, memOften != null인 경우만 실행)
            if (memOften != null && userID > 0){

                entityManager.persist(memOften);
                entityManager.persist(memSome);


                // EntityManager clear
                entityManager.flush(); entityManager.flush();
            }

            // 응답값으로 HttpStatus.OK 보내기
            return new ResponseEntity(
                    HttpStatus.OK);
        }
        catch (Throwable e){
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Transactional
    @PostMapping("/update/{user_id}")
    ResponseEntity updateUserInfo(@PathVariable("user_id") long userID, MemberOftenEntity memOften, MemberSometimesEntity memSome, @RequestBody MultipartFile profile_img){
        System.out.println(userID);
        System.out.println(memOften);
        System.out.println(memSome);


        // ===================================================================================================
        try
        {
            memOften.setId(userID); memSome.setId(userID);

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

    @GetMapping("/get/prefer_activities/{user_id}")
    ResponseEntity getUSerPreferActivities(@PathVariable("user_id") long userID){

        try {
            List<activitiesEntity> prefer_activites = queryFactory
                    .select(qMemberOften)
                    .from(qMemberOften)
                    .where(qMemberOften.id.eq(userID))
                    .fetchOne()
                    .getPreferActivities();

            return new ResponseEntity(prefer_activites, HttpStatus.OK);
        }
        catch (Throwable e){
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    @PutMapping("/put/prefer_activities/{user_id}")
    ResponseEntity putUSerPreferActivities(@PathVariable("user_id") long userID, @RequestBody List<activitiesEntity> plusPreferActivities){
        System.out.println(plusPreferActivities);

        MemberOftenEntity memOften = queryFactory.selectFrom(qMemberOften).where(qMemberOften.id.eq(userID)).fetchOne();

        if (memOften.getPreferActivities().isEmpty()){
            memOften.setPreferActivities(plusPreferActivities);
        }
        else{
            List<activitiesEntity> preferActivities = memOften.getPreferActivities();

            for (activitiesEntity activity : plusPreferActivities){

                int idx = -1;

                for (int i = 0;i < preferActivities.size();i++){
                    if (preferActivities.get(i).getMember_id() == activity.getMember_id()
                            && preferActivities.get(i).getActivity().equals(activity.getActivity())){
                        idx = i;
                        break;
                    }
                }


                if (idx == -1){
                    preferActivities.add(activity);
                }
                else {
                    preferActivities.get(idx).setLevel(activity.getLevel());
                }


            }
            memOften.setPreferActivities(preferActivities);
        }


        entityManager.persist(memOften);

        entityManager.flush(); entityManager.clear();
        try {

            return new ResponseEntity(HttpStatus.OK);
        }
        catch (Throwable e){
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    @DeleteMapping("/delete/prefer_activities/{user_id}")
    ResponseEntity deleteUSerPreferActivities(@PathVariable("user_id") long userID, @RequestBody List<activitiesEntity> plusPreferActivities){
        System.out.println(plusPreferActivities);

        MemberOftenEntity memOften = queryFactory.selectFrom(qMemberOften).where(qMemberOften.id.eq(userID)).fetchOne();
        List<activitiesEntity> preferActivities = memOften.getPreferActivities();

        for (activitiesEntity activity : plusPreferActivities){
            for (int i = 0;i < preferActivities.size();i++){
                if (activity.getActivity().equals(preferActivities.get(i).getActivity()) && activity.getMember_id() == preferActivities.get(i).getMember_id())
                {
                    preferActivities.remove(i--);
                }
            }
        }
        entityManager.persist(memOften);

        entityManager.flush(); entityManager.clear();

        try {

            return new ResponseEntity(HttpStatus.OK);
        }
        catch (Throwable e){
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
