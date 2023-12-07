package com.example.demo.Controllers;
import com.example.demo.Models.Data;
import com.example.demo.Services.LoginService;
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
    ResponseEntity<?> login(@RequestBody Data data) {
        String token = loginService.login(data.getUsername(), data.getPassword());
        System.out.println("Token: " + token);
        if (token != null) {
            Map<String, String> map = new HashMap<>();
            map.put("token", token);
            return ResponseEntity.ok(map);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
