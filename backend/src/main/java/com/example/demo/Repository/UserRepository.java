package com.example.demo.Repository;

import com.example.demo.Models.Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<Data, Long> {
    Data findByUsernameOrEmail(String username, String email);

}
