package com.ssafy.fcmservice.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.firebase.messaging.*;
import com.ssafy.fcmservice.fcmDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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
    ResponseEntity sendByToken(@RequestBody fcmDTO json) throws Exception {
        if (json.getToken_list() == null || json.getToken_list().isEmpty()) throw new Exception();
        System.out.println(json);
        MulticastMessage.Builder packet = MulticastMessage.builder();

        if (json.getData() != null) {
            packet.putAllData(json.getData());
        }

        if (json.getBody() != null)
        {
            String title = json.getTitle() == null ? "" : json.getTitle();

            packet.setNotification(
                                            Notification
                                .builder()
                                .setTitle(title)
                                .setBody(json.getBody())
                                .build()
            );
        }

        packet.addAllTokens(json.getToken_list());




        BatchResponse response = FirebaseMessaging.getInstance().sendMulticast(packet.build());

        List<String> tokenList = json.getToken_list().stream().toList();
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



        try
        {

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
            return new ResponseEntity<Void>(HttpStatus.BAD_REQUEST);
        }
    }
}
