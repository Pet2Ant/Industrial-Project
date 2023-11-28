package com.example.demo.Controllers;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.servlet.http.HttpSession;
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
public class SessionController {

    @GetMapping("/api/check-session")
    public ResponseEntity<?> checkSession(HttpSession session) {
        if (session.getAttribute("user") != null) {
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
