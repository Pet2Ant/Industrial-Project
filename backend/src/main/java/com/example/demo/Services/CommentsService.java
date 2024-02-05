package com.example.demo.Services;

import com.example.demo.DTO.CommentDTO;
import com.example.demo.Models.Comment;
import com.example.demo.Repository.CommentsRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentsService {
    private final CommentsRepository commentsRepository;

    @Autowired
    public CommentsService(CommentsRepository commentsRepository) {
        this.commentsRepository = commentsRepository;
    }
    public Comment saveComment(Comment comment) {
        return commentsRepository.save(comment);
    }

    public void deleteComment(Long id) {
        commentsRepository.deleteById(id);
    }
    //get comments from DTO
    public List<CommentDTO> getComments(Long userId, Long applicationId) {
        ModelMapper modelMapper = new ModelMapper();
        List<Comment> comments = commentsRepository.findByUserIdAndApplicationId(userId, applicationId);

        if (comments.isEmpty()) {
            throw new RuntimeException("No comments found");
        }

        return comments.stream()
                .map(comment -> modelMapper.map(comment, CommentDTO.class))
                .collect(Collectors.toList());
    }





}
