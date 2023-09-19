package com.workintech.TwitterBackend.dto;

import com.workintech.TwitterBackend.user.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CommentRequest {
    private User user;
    private String comment;
}
