package com.workintech.TwitterBackend.controller;

import com.workintech.TwitterBackend.dto.LoginRequest;
import com.workintech.TwitterBackend.dto.LoginResponse;
import com.workintech.TwitterBackend.user.User;
import com.workintech.TwitterBackend.service.AuthenticationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/profile")
public class AuthController {

    private AuthenticationService authenticationService;

    @Autowired
    public AuthController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return authenticationService.register(user.getFirstName(), user.getLastName(),
                user.getEmail(), user.getPassword(), user.getBirthDate());
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest loginRequest) {
        return authenticationService.login(loginRequest.getEmail(), loginRequest.getPassword());
    }
}
