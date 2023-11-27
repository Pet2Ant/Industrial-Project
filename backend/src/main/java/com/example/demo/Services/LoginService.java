package com.example.demo.Services;

import com.example.demo.Models.Data;
import com.example.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

        @Autowired
        private final UserRepository userRepository;

        public LoginService(UserRepository userRepository) {
            this.userRepository = userRepository;
        }

       public Data findByUsernameOrEmail(String username, String email)
       {
         return  userRepository.findByUsernameOrEmail(username,email);
       }




}
