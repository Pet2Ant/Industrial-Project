package com.example.demo.Services;
import com.example.demo.Util.JwtUtil;
import com.example.demo.Models.Data;
import com.example.demo.Repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class LoginService {
        private final UserRepository userRepository;

        private final JwtUtil jwtUtil;

    public LoginService(UserRepository userRepository, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.jwtUtil = jwtUtil;
    }

    public String login(String username, String email, String password) {
        Data user = userRepository.findByUsernameOrEmail(username, email);
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        if (user != null && passwordEncoder.matches(password, user.getPassword())) {
            System.out.printf("User %s logged in successfully!\n with username:", username , "and password:", password);
            return jwtUtil.generateToken(username, user.getRole());
        } else {
            return null;
        }
    }
}
