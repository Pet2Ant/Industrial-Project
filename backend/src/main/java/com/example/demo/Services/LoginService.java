package com.example.demo.Services;
import com.example.demo.Util.JwtUtil;
import com.example.demo.Models.Data;
import com.example.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LoginService {

        @Autowired
        private final UserRepository userRepository;
        @Autowired
        private JwtUtil jwtUtil;

        public LoginService(UserRepository userRepository) {
            this.userRepository = userRepository;
        }

    public String login(String username, String password) {
        Data user = userRepository.findByUsernameOrEmail(username, username);
        System.out.println("User: " + user);
        if (user != null && user.getPassword().equals(password)) {
            System.out.printf("User %s logged in successfully!\n", username);
            return jwtUtil.generateToken(username);
        } else {
            return null;
        }
    }
}
