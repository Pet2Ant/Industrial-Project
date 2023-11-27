package com.example.demo.controllers;

import com.example.demo.Models.Data;
import com.example.demo.Services.LoginService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/login")
public class LoginController {
    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/api/login")
    public ResponseEntity<?> loginUser (@RequestBody Data data)
    {
        Data dbUser = loginService.findByUsernameOrEmail(data.getUsername(),data.getEmail());
        if(dbUser == null || !dbUser.getPassword().equals(data.getPassword()))
        {
            return new ResponseEntity<>("Invalid username/email or password", HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>("Login successful",HttpStatus.OK );
    }
}
