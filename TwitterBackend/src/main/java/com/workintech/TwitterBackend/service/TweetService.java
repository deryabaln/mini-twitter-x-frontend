package com.workintech.TwitterBackend.service;

import com.workintech.TwitterBackend.entity.Comment;
import com.workintech.TwitterBackend.entity.Tweet;
import com.workintech.TwitterBackend.user.User;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface TweetService {
    List<Tweet> find();
    Tweet findById(int id);
    Tweet save(Tweet tweet);
    Tweet delete(int id);
    Set<User> saveLikes (User user, int id);
    Set<User> deleteLikes (User user, int id);
    Set<User> saveRetweets (User user, int id);
    Set<User> deleteRetweets(User user, int id);
    Comment saveComment (User user, int id, String comment);
    Comment deleteComment(int id);
    Comment findCommentById(int id);
    List <Comment> getComments(int id);
}
