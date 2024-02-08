package com.example.demo.Services;
import com.example.demo.Util.JwtUtil;
import com.example.demo.Models.Data;
import com.example.demo.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


@Service
public class LoginService {

        @Autowired
        private final UserRepository userRepository;
        @Autowired
        private JwtUtil jwtUtil;

        public LoginService(UserRepository userRepository) {
            this.userRepository = userRepository;
        }

    public String login(String username, String email, String password) {
        Data user = userRepository.findByUsernameOrEmail(username, email);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            System.out.printf("User %s logged in successfully!\n with username:", username , "and password:", password);
            return jwtUtil.generateToken(username);
        } else {
            return null;
        }
    }



}
