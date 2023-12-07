package com.example.demo.Filters;
import com.example.demo.Util.JwtUtil;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
@Component
public class JwtRequestFilter  extends OncePerRequestFilter {

     @Autowired
     private JwtUtil jwtUtil;
     @Override
     protected void doFilterInternal(HttpServletRequest request, @NonNull HttpServletResponse response,@NonNull FilterChain chain) throws ServletException, IOException {
         final String authorizationHeader = request.getHeader("Authorization");
         String username = null;
         String jwt = null;
         if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
             jwt = authorizationHeader.substring(7);
             username = jwtUtil.extractUsername(jwt);
         }
         if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
             UserDetails userDetails = new User(username, "", new ArrayList<>());
             if (jwtUtil.validateToken(jwt, username)) {
                 UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
                         userDetails, null, userDetails.getAuthorities());
                 usernamePasswordAuthenticationToken
                         .setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                 SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
             }
         }
         chain.doFilter(request, response);
     }
}
