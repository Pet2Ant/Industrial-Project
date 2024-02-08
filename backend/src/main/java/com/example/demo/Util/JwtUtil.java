package com.example.demo.Util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.function.Function;
import javax.crypto.SecretKey;

@Component
public class JwtUtil {
    private SecretKey key = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String extractUsername(String token){
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token){
        return extractClaim(token,Claims::getExpiration);
    }

    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver){
        final Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public List<String> extractRoles(String token){
        return extractClaim(token, claims -> claims.get("roles", List.class));
    }
    private Claims extractAllClaims(String token){
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }

    private Boolean isTokenExpired(String token){
        return extractExpiration(token).before(new Date());
    }

//    public String generateToken(String username){
//        return createToken(username);
//    }

public String generateToken(String username, String role){
    List<String> roles = Collections.singletonList(role);
    return Jwts.builder()
            .setSubject(username)
            .claim("roles", roles)
            .setIssuedAt(new Date(System.currentTimeMillis()))
            .setExpiration(new Date(System.currentTimeMillis()+1000*60*60*10))
            .signWith(key).compact();
}
    private String createToken(String subject){
        return Jwts.builder().setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis()+1000*60*60*10))
                .signWith(key).compact();
    }

    public Boolean validateToken(String token,String username){
        final String username1 = extractUsername(token);
        return (username1.equals(username) && !isTokenExpired(token));
    }
}
