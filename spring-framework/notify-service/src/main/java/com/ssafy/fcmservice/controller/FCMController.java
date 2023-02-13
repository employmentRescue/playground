package com.ssafy.fcmservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.firebase.messaging.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/notify")
public class FCMController {
    ObjectMapper objectMapper;

    @Autowired
    FCMController(ObjectMapper objectMapper){
        this.objectMapper = objectMapper;
    }


    @RequestMapping("/hello")
    @ResponseBody
    String hello(){
        System.out.println("FCMController hello");

        return "hello";
    }


    @PostMapping("/send/token-list")
    ResponseEntity sendByToken(@RequestBody Map<String, Object> json){
        String title = (String) json.get("title");
        if (title != null) title = title.substring(0, Math.min(1000, title.length()));
        String body = (String) json.get("body");
        if (body != null) body = body.substring(0, Math.min(1000,body.length()));
        List<String> tokenList = objectMapper.convertValue(json.get("token-list"), Set.class).stream().toList();


        try
        {
            MulticastMessage.Builder message = MulticastMessage
                    .builder()
                    .setNotification(
                            Notification
                                    .builder()
                                    .setTitle(title)
                                    .setBody(body)
                                    .build()
                    )
                    .addAllTokens(tokenList);

//            if (fcm_data != null && fcm_data.size() > 0) message.putAllData(fcm_data);


            BatchResponse response = FirebaseMessaging.getInstance().sendMulticast(message.build());
            List<String> failedTokens = new ArrayList<>();
            if (response.getFailureCount() > 0) {
                List<SendResponse> responses = response.getResponses();
                for (int i = 0; i < responses.size(); i++) {
                    if (!responses.get(i).isSuccessful()) {
                        // The order of responses corresponds to the order of the registration tokens.
                        failedTokens.add(tokenList.get(i));
                    }
                }

                System.out.println("List of tokens that caused failures: " + failedTokens);
            }

            System.out.println("sucess cnt : " + (tokenList.size() - failedTokens.size()));

            return new ResponseEntity(
                    Map.of(
                            "total", tokenList.size(),
                            "success", tokenList.size() - failedTokens.size(),
                            "fail", failedTokens.size()
                    )
                    , HttpStatus.OK
            );
        }
        catch (Throwable e){
            return new ResponseEntity<Void>(HttpStatus.METHOD_FAILURE);
        }
    }
}
