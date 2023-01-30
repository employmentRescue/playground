package com.ssafy.userservice.controller;

import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.querydsl.jpa.impl.JPAUpdateClause;
import com.ssafy.userservice.dto.Membera;
import com.ssafy.userservice.dto.QMembera;
import com.ssafy.userservice.dto.QMemberb;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class testController {
    @PersistenceContext
    EntityManager em ;

    @Autowired
    JPAQueryFactory queryFactory;

    @Transactional
    @RequestMapping("/insert")
    @ResponseBody
    String delete(){
        QMembera often = new QMembera("often");
        QMemberb some = new QMemberb("some");


//queryFactory.insert(often)
//                .columns(often.id, often.fcmToken)
//                        .values(12345,"fcm-token")
//                                .execute();
//queryFactory.insert(some)
//                .columns(some.id,some.name)
//                        .values(12345,"name")
//                                .execute();

        int userID = 12345;
        Membera a = Membera.builder().userProfileImgURL("http://localhost/img").build();

        if (a == null) return "";


        JPAUpdateClause updateQ = queryFactory
                .update(often)
                .where(often.id.eq(userID));

        if (a.getFcmToken() != null)
            updateQ.set(often.fcmToken, a.getFcmToken());

        if (a.getStatus_message() != null)
            updateQ.set(often.status_message, a.getStatus_message());

        if (a.getUserProfileImgURL() != null)
            updateQ.set(often.userProfileImgURL, a.getUserProfileImgURL());

        if (a.getPreferTime() != null)
            updateQ.set(often.preferTime, a.getPreferTime());
        System.out.println(updateQ);
        updateQ.execute();
        em.flush(); em.clear();

        System.out.println("끗");

        System.out.println("aaaaaaaa : ");

        return "";
    }
}
