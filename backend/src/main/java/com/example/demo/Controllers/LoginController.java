package com.example.demo.Controllers;
import com.example.demo.Models.Data;
import com.example.demo.Services.LoginService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/login")
public class LoginController {
    private final LoginService loginService;

    @Autowired
    public LoginController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping
    public ResponseEntity<?> loginUser (@RequestBody Data data, HttpServletRequest request, HttpServletResponse response )
    {
        Map<String,Object> responseMap = new HashMap<>();
        Data dbUser = loginService.findByUsernameOrEmail(data.getUsername(),data.getEmail());
        if((dbUser == null || !dbUser.getPassword().equals(data.getPassword())))
        {
            responseMap.put("message", "Invalid username/email or password");
            return new ResponseEntity<>(response, HttpStatus.UNAUTHORIZED);
        }
        HttpSession session = request.getSession(false);
        if(session!=null)
        {
            Data sessionUser = (Data) session.getAttribute("user");
            if(sessionUser != null && sessionUser.getUsername().equals(dbUser.getUsername()))
            {
                //user is already logged in
                responseMap.put("message", "User already logged in");
                return new ResponseEntity<>(responseMap,HttpStatus.OK );
            }
        }
        session = request.getSession(true); // Create new session
        session.setAttribute("user", dbUser);
        System.out.println("Session created with user: " + session.getAttribute("user")); // TODO REMOVE THIS
        //set cookies
        Cookie sessionCookie = new Cookie("session_id", session.getId());
        sessionCookie.setPath("/");
        response.addCookie(sessionCookie);
        responseMap.put("user", dbUser);
        responseMap.put("message", "Login successful");
        return new ResponseEntity<>(responseMap,HttpStatus.OK );
    }
}
