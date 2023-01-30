package com.ssafy.userservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.querydsl.core.Tuple;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.jpa.impl.JPAUpdateClause;
import com.ssafy.userservice.dto.MemberOften;
import com.ssafy.userservice.dto.MemberSometimes;
import com.ssafy.userservice.dto.QMemberOften;
import com.ssafy.userservice.dto.QMemberSometimes;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/user")
public class UserInfoController {
    final private static ObjectMapper objectMapper = new ObjectMapper();

    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private JPAQueryFactory queryFactory;

    final private static QMemberOften qMemberOften = new QMemberOften("MEM_OFTEN");
    final private static QMemberSometimes qMemberSometimes = new QMemberSometimes("MEM_SOME");


    @GetMapping("/check/nickname/{nickname}")
    ResponseEntity checkNicname(@PathVariable String nickname){

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

    @GetMapping("/search/{user_id}")
    ResponseEntity searchUserInfo(@PathVariable("user_id") String userID , @RequestBody Set<String> req){
        System.out.println("req : " + req);

        try {
            Map<String, Object> searchResult = new HashMap<>();

            // db로부터 데이터 가져옴 --> MemberOften, MemberSometimes 객체에 데이터 할당하기
            Tuple ret = (Tuple)queryFactory
                    .select(qMemberOften, qMemberSometimes)
                    .from(qMemberOften)
                    .join(qMemberSometimes)
                    .where(qMemberOften.id.eq(qMemberSometimes.id), qMemberOften.id.eq(Integer.parseInt(userID)))
                    .fetchOne();

            // ================================================================================================================

            Map<String, Object> requestSearchList = null;



            // MemberOften 객체에 대해서 검색한 값만 searchResult에 넣기

            requestSearchList = objectMapper.convertValue(ret.get(0, MemberOften.class), Map.class);


            for (String key : req){
                if (key != userID && requestSearchList.get(key) != null) searchResult.put(key, requestSearchList.get(key));
            }
            // ================================================================================================================

            // MemberSometime 객체에 대해 검색한 값만 searchResult에 넣기
            requestSearchList = objectMapper.convertValue(ret.get(1, MemberSometimes.class), Map.class);
            for (String key : req){
                if (key != userID && requestSearchList.get(key) != null) searchResult.put(key, requestSearchList.get(key));
            }
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
    ResponseEntity registUserInfo(@PathVariable("user_id") int userID,  MemberOften memOften, MemberSometimes memSome){
        memOften.setId(userID); memSome.setId(userID);

        System.out.println(userID);
        System.out.println(memOften);
        System.out.println(memSome);


        // ===================================================================================================
        try
        {

            // MemberOften 객체에 대해 not null 인 값만 update(단, memOften != null인 경우만 실행)
            if (memOften != null && userID > 0){

                entityManager.persist(memOften);
                entityManager.persist(memSome);


                // EntityManager clear
                entityManager.flush(); entityManager.flush();
            }

            // 응답값으로 HttpStatus.OK 보내기
            return new ResponseEntity(HttpStatus.OK);
        }
        catch (Throwable e){
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @Transactional
    @PostMapping("/update/{user_id}")
    ResponseEntity updateUserInfo(@PathVariable("user_id") int userID,  MemberOften memOften, MemberSometimes memSome){
        System.out.println(userID);
        System.out.println(memOften);
        System.out.println(memSome);


        // ===================================================================================================
        try
        {
            memOften.setId(userID); memSome.setId(userID);

            // MemberOften 객체에 대해 not null 인 값만 update(단, memOften != null인 경우만 실행)
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
    ResponseEntity getUSerPreferActivities(@PathVariable int userID){

        try {
            Set<String> prefer_activites = queryFactory
                    .select(qMemberOften.preferActivities)
                    .from(qMemberOften)
                    .where(qMemberOften.id.eq(userID))
                    .fetchFirst();

            return new ResponseEntity(prefer_activites, HttpStatus.OK);
        }
        catch (Throwable e){
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    @PostMapping("/insert/prefer_activities/{user_id}")
    ResponseEntity insertUSerPreferActivities(@PathVariable("user_id") int userID, @RequestBody Set<String> plusPreferActivities){

        Set<String> prefer_activites = queryFactory
                .select(qMemberOften.preferActivities)
                .from(qMemberOften)
                .where(qMemberOften.id.eq(userID))
                .fetchFirst();

        if (prefer_activites == null){
            prefer_activites = new HashSet<>();

            prefer_activites.addAll(plusPreferActivities);

            queryFactory.update(qMemberOften).set(qMemberOften.preferActivities, prefer_activites).execute();
        }
        else{

        }


        System.out.println(prefer_activites);



//        if (prefer_activites.size() > 0) queryFactory.update(qMemberOften).set(qMemberOften.preferActivities, plusPreferActivities).execute();

        try {

            // EntityManager clear
            entityManager.flush(); entityManager.flush();

            return new ResponseEntity(HttpStatus.OK);
        }
        catch (Throwable e){
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Transactional
    @PostMapping("/delete/prefer_activities/{user_id}")
    ResponseEntity deleteUSerPreferActivities(@PathVariable int userID, @RequestBody Set<String> plusPreferActivities){

        try {
            Set<String> prefer_activites = queryFactory
                    .select(qMemberOften.preferActivities)
                    .from(qMemberOften)
                    .where(qMemberOften.id.eq(userID))
                    .fetchFirst();

            if (prefer_activites == null) prefer_activites = new HashSet<>();

            prefer_activites.removeAll(plusPreferActivities);

            queryFactory.update(qMemberOften).set(qMemberOften.preferActivities, plusPreferActivities);


            // EntityManager clear
            entityManager.flush(); entityManager.flush();

            return new ResponseEntity(HttpStatus.OK);
        }
        catch (Throwable e){
            return new ResponseEntity<Void>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
