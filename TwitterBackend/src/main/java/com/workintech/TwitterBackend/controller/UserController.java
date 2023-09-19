package com.workintech.TwitterBackend.controller;

import com.workintech.TwitterBackend.entity.Tweet;
import com.workintech.TwitterBackend.service.UserService;
import com.workintech.TwitterBackend.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private UserService userService;
  @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public List<User> get(){
        return userService.find();
    }

}
