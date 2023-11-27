package com.example.demo.Controllers;
import com.example.demo.Models.Data;
import com.example.demo.Services.LoginService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/login")
public class LoginController {
    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping
    public ResponseEntity<?> loginUser (@RequestBody Data data, HttpSession session)
    {
        Map<String,Object> response = new HashMap<>();
        Data dbUser = loginService.findByUsernameOrEmail(data.getUsername(),data.getEmail());
        if(dbUser == null || !dbUser.getPassword().equals(data.getPassword()))
        {
            response.put("message", "Invalid username/email or password");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        session.setAttribute("user", dbUser);
        System.out.println("Session created with user: " + session.getAttribute("user")); // TODO: Remove this
        response.put("user", dbUser);
        response.put("message", "Login successful");
        return new ResponseEntity<>(response,HttpStatus.OK );
    }
}
