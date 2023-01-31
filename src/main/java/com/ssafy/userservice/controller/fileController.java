package com.ssafy.userservice.controller;

import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.userservice.dto.QfileEntity;
import com.ssafy.userservice.dto.fileEntity;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.servlet.ServletContext;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.*;

@RestController
@RequestMapping("/file")
public class fileController {
    @Autowired
    ServletContext servletContext;

    @PersistenceContext
    private EntityManager entityManager;
    @Autowired
    private JPAQueryFactory queryFactory;

    private final static QfileEntity QFILE_DTO = new QfileEntity("file-1");

    public String getURLBase(HttpServletRequest request) throws MalformedURLException {

        URL requestURL = new URL(request.getRequestURL().toString());
        String port = requestURL.getPort() == -1 ? "" : ":" + requestURL.getPort();
        return requestURL.getProtocol() + "://" + requestURL.getHost() + port;

    }

    @RequestMapping("/upload/test/{user_id}")
    @PostMapping("/upload/{user_id}")
    @Transactional
    ResponseEntity uploadFile(@PathVariable("user_id") String userID, String type, @RequestParam("files") MultipartFile[] files, HttpServletRequest request) throws IOException {
//        Resource resource = resourceLoader.getResource("file:/resources/");
        String baseURL = getURLBase(request);
        String baseFolder = servletContext.getRealPath("/resources");
        String folder = "/files/" + type;


        File rootDir = new File(baseFolder + "/" + folder);
        if (!rootDir.exists()) rootDir.mkdirs();
        System.out.println(rootDir);

        Map<String, String> result = new HashMap();

        for (MultipartFile file : files){
//            File tmpFile = file.getResource().getFile();
            String unique_original_file_name = Base64.getEncoder().encodeToString(UUID.randomUUID().toString().getBytes(StandardCharsets.UTF_8))

                                            + file.getOriginalFilename()
                                                .substring(file .getOriginalFilename().lastIndexOf('.'));

            file.transferTo(new File(rootDir + "/" + unique_original_file_name));

            fileEntity fileEntity = com.ssafy.userservice.dto.fileEntity.builder()
                    .file_name(unique_original_file_name)
                    .origin_file_name(file.getOriginalFilename())
                    .userID(userID)
                    .build();

            entityManager.persist(fileEntity);


            result.put(file.getOriginalFilename()
                    , baseURL
                            + "/file/download/"
                            + type + "/"
                            + unique_original_file_name);
        }

        entityManager.flush(); entityManager.clear();

        return new
                ResponseEntity(
                        Map.of(
                        "file-path", result
                                    ),
                HttpStatus.OK);
    }

    @RequestMapping("/download/{type}/{fileName}")
    ResponseEntity downloadFile(@PathVariable String type, @PathVariable String fileName, HttpServletResponse response
    ){
        String baseFolder = servletContext.getRealPath("/resources");
        String folder = "/files/" + type;

        File file = new File(baseFolder + "/" + folder + "/" + fileName);
        System.out.println(file);
        if (!file.exists()) return new ResponseEntity(HttpStatus.BAD_REQUEST);

        fileEntity fileEntity = entityManager.find(fileEntity.class, file.getName());
        String originFileName = fileEntity.getOrigin_file_name();
        if (originFileName == null) originFileName = fileName;


//        System.out.println(originFileName);
//        System.out.println(fileEntity);

        response.setContentType("application/download");
        response.setContentLength((int)file.length());
        response.setHeader("Content-disposition", "attachment;filename=\"" + originFileName + "\"");


        try (OutputStream os = response.getOutputStream(); FileInputStream fis = new FileInputStream(file); ) {



            FileCopyUtils.copy(fis, os);
            fis.close();
            os.close();
        }
        catch (Throwable e){
            e.printStackTrace();
            return new ResponseEntity(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity(HttpStatus.OK);
    }
}
