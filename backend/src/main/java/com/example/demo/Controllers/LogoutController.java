package com.example.demo.Controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpSession;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
public class LogoutController {

    @PostMapping("/api/logout")
    public void logout(HttpSession session) {
        System.out.println("Session destroyed with user: " + session.getAttribute("user")); // TODO: Remove this
        session.invalidate();

    }
}

