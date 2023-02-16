package com.websocket.chat.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.websocket.chat.dto.GatheringChatroom;
import com.websocket.chat.dto.TeamChatroom;
import com.websocket.chat.repository.ChatRoomRepository;
import com.websocket.chat.service.ChatRoomService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Api(tags = "채팅방")
@RequiredArgsConstructor
@RestController
@RequestMapping("/chat")
public class ChatRoomController {

    private static final String SUCCESS = "success";
    private static final String FAIL = "fail";

    private final ChatRoomService chatRoomService;


    @ApiOperation(value = "전체 팀 채팅방 조회", notes = "회원의 팀 채팅방을 전부 가져온다.")
    @GetMapping("/TeamChatRoom/{memberId}")
    public ResponseEntity<List<TeamChatroom>> getTeamChatRoomList(@PathVariable long memberId){
        return new ResponseEntity<List<TeamChatroom>>(chatRoomService.getAllTeamChatroomByMemberId(memberId), HttpStatus.OK);
    }

    @ApiOperation(value = "팀 채팅방 1개 조회", notes = "회원이 입장하는 특정 팀 채팅방 1개를 가져온다.")
    @GetMapping("/TeamChatRoom/enter/{roomId}")
    public ResponseEntity<TeamChatroom> getTeamChatRoom(@PathVariable int roomId){
        return new ResponseEntity<TeamChatroom>(chatRoomService.getTeamChatroomByRoomId(roomId), HttpStatus.OK);
    }



//    @ApiOperation(value = "팀 채팅방 생성", notes = "팀 채팅방을 생성한다.")
//    @PostMapping("/TeamChatRoom")
//    public ResponseEntity<String> createTeamChatRoom(@RequestParam List<Long> memberIdList, @RequestBody TeamChatroom teamChatroom){
//        chatRoomService.createTeamChatroom(memberIdList, teamChatroom);
//        return new ResponseEntity<String>(SUCCESS, HttpStatus.CREATED);
//    }

    @ApiOperation(value = "팀 채팅방 생성", notes = "팀 채팅방을 생성한다.")
    @PostMapping("/TeamChatRoom")
    public ResponseEntity<String> createTeamChatRoom(@RequestBody Map<String, Object> map){
        ObjectMapper objectMapper = new ObjectMapper();
        TeamChatroom teamChatroom = objectMapper.convertValue(map.get("teamChatroom"), TeamChatroom.class);
        List<Long> memberIdList = objectMapper.convertValue(map.get("memberIdList"), new TypeReference<List<Long>>() {
        });
        chatRoomService.createTeamChatroom(memberIdList, teamChatroom);
        return new ResponseEntity<String>(SUCCESS, HttpStatus.CREATED);
    }


//    @ApiOperation(value = "팀 채팅방 생성", notes = "팀 채팅방을 생성한다.")
//    @PostMapping("/TeamChatRoom")
//    public ResponseEntity<String> createTeamChatRoom(@RequestBody TeamChatroom teamChatroom){
//
//        chatRoomService.createTeamChatroom(memberIdList, teamChatroom);
//        return new ResponseEntity<String>(SUCCESS, HttpStatus.CREATED);
//    }


    @ApiOperation(value = "팀 채팅방 삭제", notes = "회원이 특정 채팅방에서 나간다.")
    @DeleteMapping("/TeamChatRoom/{roomId}")
    public ResponseEntity<String> deleteTeamChatRoom(@PathVariable int roomId, @RequestParam long memberId) {
        chatRoomService.exitTeamChatroom(memberId, roomId);
        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }


//    ==================================================================================================================


    @ApiOperation(value = "전체 운동모임 채팅방 조회", notes = "회원의 운동모임 채팅방을 전부 가져온다.")
    @GetMapping("/GatheringChatRoom/{memberId}")
    public ResponseEntity<List<GatheringChatroom>> getGatheringChatRoomList(@PathVariable long memberId){
        return new ResponseEntity<List<GatheringChatroom>>(chatRoomService.getAllGatheringChatroomByMemberId(memberId), HttpStatus.OK);
    }

    @ApiOperation(value = "운동모임 채팅방 1개 조회", notes = "회원이 입장하는 특정 운동모임 채팅방 1개를 가져온다.")
    @GetMapping("/GatheringChatRoom/enter/{roomId}")
    public ResponseEntity<GatheringChatroom> getGatheringChatRoom(@PathVariable int roomId) {
        return new ResponseEntity<GatheringChatroom>(chatRoomService.getGatheringChatroomByRoomId(roomId), HttpStatus.OK);
    }

    @ApiOperation(value = "운동모임 채팅방 생성", notes = "운동모임 채팅방을 생성한다.")
    @PostMapping("/GatheringChatRoom")
    public ResponseEntity<String> createGatheringChatRoom(@RequestParam List<Long> memberIdList, @RequestBody GatheringChatroom gatheringChatroom){
        chatRoomService.createGatheringChatroom(memberIdList, gatheringChatroom);
        return new ResponseEntity<String>(SUCCESS, HttpStatus.CREATED);
    }

    @ApiOperation(value = "운동모임 채팅방 삭제", notes = "회원이 특정 채팅방에서 나간다.")
    @DeleteMapping("/GatheringChatRoom/{roomId}")
    public ResponseEntity<String> deleteGatheringChatRoom(@PathVariable int roomId, @RequestParam long memberId) {
        chatRoomService.exitGatheringChatroom(memberId, roomId);
        return new ResponseEntity<String>(SUCCESS, HttpStatus.OK);
    }



//    =================================================================================================================



//    @GetMapping("/room")
//    public String rooms(Model model) {
//        return "/chat/room";
//    }
//
//    @GetMapping("/rooms")
//    @ResponseBody
//    public List<ChatRoom> room() {
//        return chatRoomRepository.findAllRoom();
//    }
//
//    @PostMapping("/room")
//    @ResponseBody
//    public ChatRoom createRoom(@RequestParam String name) {
//        return chatRoomRepository.createChatRoom(name);
//    }
//
//    @GetMapping("/room/enter/{roomId}")
//    public String roomDetail(Model model, @PathVariable String roomId) {
//        model.addAttribute("roomId", roomId);
//        return "/chat/roomdetail";
//    }
//
//    @GetMapping("/room/{roomId}")
//    @ResponseBody
//    public ChatRoom roomInfo(@PathVariable String roomId) {
//        return chatRoomRepository.findRoomById(roomId);
//    }
}
