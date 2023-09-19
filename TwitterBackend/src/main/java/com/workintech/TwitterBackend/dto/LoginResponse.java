package com.workintech.TwitterBackend.dto;

import com.workintech.TwitterBackend.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {

    private User user;
    private String jwt;
}

