package com.websocket.chat.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/chat")
public class testController {

    @GetMapping("/hello")
    @ResponseBody
    String hello(){
        return "hello";
    }

    @GetMapping("/roomD")
    public String goRoomlList(Model model){
        return "roomDoyeol";
    }

    @GetMapping("/room/enter/{roomId}")
    public String roomDetail(Model model, @PathVariable String roomId) {
        model.addAttribute("roomId", roomId);
        return "roomdetailDoyeol";
    }

}
