package com.ssafy.fcmservice.controller;

import com.google.firebase.messaging.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notify")
public class FCMController {
    @RequestMapping("/hello")
    @ResponseBody
    String hello(){
        return "hello";
    }


    @PostMapping("/send/token-list")
    ResponseEntity sendByToken(String title, String body/*, @RequestParam("data") Map<String, String> fcm_data*/, @RequestBody List<String> tokenList){
        title = title.substring(0, Math.min(1000, title.length()));
        body = body.substring(0, Math.min(1000,body.length()));


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
