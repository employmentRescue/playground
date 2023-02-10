package com.ssafy.fcmservice.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.IOException;

@Configuration
public class FCMConfig {
    @PostConstruct
    public void initialize() throws IOException {
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(new ClassPathResource("fcm_for_th.json").getInputStream()))
                .setDatabaseUrl("https://fir-fdef7-default-rtdb.asia-southeast1.firebasedatabase.app")
                .build();

        if (FirebaseApp.getApps().isEmpty())	FirebaseApp.initializeApp(options);
    }
}
