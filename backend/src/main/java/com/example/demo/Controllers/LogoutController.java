package com.example.demo.Controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class LogoutController {

    @PostMapping("/api/logout")
    public void logout(HttpSession session) {
        session.invalidate();
    }
}

