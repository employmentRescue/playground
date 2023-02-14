package com.ssafy.userservice.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.userservice.dto.*;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
public class preferActivitiesService {
    @Autowired
    private ObjectMapper objectMapper;

    @PersistenceContext
    private EntityManager entityManager;




    public void updateUserPreferActivites(long userID, Set<activityDTO> req) throws Exception
    {
        MemberSometimesEntity parent = entityManager.find(MemberSometimesEntity.class, userID);


        if (parent == null) throw new Exception();


        for (activityDTO activity : req) {
            activitiesEntity child = entityManager.find(activitiesEntity.class, activitiesId.builder().memberSometimes(userID).activity(activity.getActivity()).build());

            if (child == null) continue;

            child.setLevel(activity.getLevel());

            entityManager.persist(child);
        }
    }

    public void deleteUserPeferActivites(long userID, Set<String> activities) throws Exception
    {
        for (String activity : activities) {
            activitiesEntity child = entityManager.find(activitiesEntity.class, activitiesId.builder().memberSometimes(userID).activity(activity).build());
            System.out.println(child);

            if (child == null) continue;

            entityManager.remove(child);
        }
    }

    public void insertUserPreferActivites(long userID, Set<activityDTO> req) throws Exception {
        MemberSometimesEntity parent = entityManager.find(MemberSometimesEntity.class, userID);


        if (parent == null) throw new Exception();

        for (activityDTO activity : req) {
            activitiesEntity child = activitiesEntity.builder()
                            .memberSometimes(parent)
                                    .activity(activity.getActivity())
                                            .level(activity.getLevel())
                                                    .build();

            entityManager.persist(child);
        }


    }
}
