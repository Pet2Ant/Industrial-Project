package com.example.demo.Services;

import com.example.demo.DTO.CommentDTO;
import com.example.demo.DTO.SeminarsDTO;
import com.example.demo.Models.Comment;
import com.example.demo.Models.Seminars;
import com.example.demo.Repository.CommentsRepository;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Type;
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


    public List<CommentDTO> getComments(Long userId, Long seminarId) {
        ModelMapper modelMapper = new ModelMapper();
        List<Comment> comments = commentsRepository.findByUserIdAndSeminarId(userId, seminarId);
        Type listType = new TypeToken<List<CommentDTO>>(){}.getType();
        return modelMapper.map(comments, listType);
    }





}
