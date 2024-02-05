package com.example.demo.Controllers;

import com.example.demo.DTO.CommentDTO;
import com.example.demo.Models.Comment;
import com.example.demo.Services.CommentsService;

import com.example.demo.Services.DataService;
import com.example.demo.Util.JwtUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/comments")
public class CommentsController {
    private final CommentsService commentService;
    @Autowired
    private DataService dataService;
    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    public CommentsController(CommentsService commentService) {
        this.commentService = commentService;
    }
    @PostMapping
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment, @RequestHeader("Authorization") String token) {
        String username = jwtUtil.extractUsername(token.replace("Bearer ", ""));
        comment.setUsername(username);
        comment.setManagerId(dataService.getUserId(username).getId());
        System.out.println(comment.getId());
        Comment savedComment = commentService.saveComment(comment);
        return new ResponseEntity<>(savedComment, HttpStatus.CREATED);
    }
    @GetMapping
    public ResponseEntity<List<CommentDTO>> getComments(@RequestParam Long userId, @RequestParam Long seminarId) {
        List<CommentDTO> comments = commentService.getComments(userId, seminarId);
        return ResponseEntity.ok(comments);
    }

}
