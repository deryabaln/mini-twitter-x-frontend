package com.workintech.TwitterBackend.controller;

import com.workintech.TwitterBackend.dto.CommentRequest;
import com.workintech.TwitterBackend.entity.Comment;
import com.workintech.TwitterBackend.entity.Tweet;
import com.workintech.TwitterBackend.service.TweetService;
import com.workintech.TwitterBackend.service.UserService;
import com.workintech.TwitterBackend.user.User;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.Positive;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/tweet")
public class TweetController {
    private TweetService tweetService;
    private EntityManager entityManager;
    private UserService userService;

    @Autowired
    public TweetController(TweetService tweetService, EntityManager entityManager, UserService userService) {
        this.tweetService = tweetService;
        this.entityManager = entityManager;
        this.userService = userService;
    }
    @GetMapping("/")
    public List<Tweet> get(){
        return tweetService.find();
    }

    @GetMapping("/{id}")
    public Tweet getById(@Positive @PathVariable int id){
        return tweetService.findById(id);
    }

    @PostMapping("/")
    @Transactional
    public Tweet save(@RequestBody Tweet tweet){
        User user = entityManager.merge(tweet.getUser());
        tweet.setUser(user);
        return tweetService.save(tweet);
    }
    @PutMapping("/{id}")
    @Transactional
    public Tweet editTweet(@RequestBody Tweet tweet, @PathVariable int id){
        Tweet foundTweet = tweetService.findById(id);
        foundTweet.setId(id);
        tweetService.save(tweet);
        return tweet;
    }
    @DeleteMapping("/{id}")
    @Transactional
    public Tweet deleteTweet(@Positive @PathVariable int id){
        return tweetService.delete(id);
    }

    @PostMapping("/like/{id}")
    @Transactional
    public ResponseEntity<Set<User>> like(@PathVariable int id, @RequestBody User user) {
        Set<User> updatedLikes = tweetService.saveLikes(user, id);
        if (updatedLikes != null) {
            return ResponseEntity.ok(updatedLikes);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @DeleteMapping("/like/{id}")
    @Transactional
    public ResponseEntity<Set<User>> unlike(@PathVariable int id, @RequestBody User user) {
        Set<User> updatedLikes = tweetService.deleteLikes(user, id);
        if (updatedLikes != null) {
            return ResponseEntity.ok(updatedLikes);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/retweet/{id}")
    @Transactional
    public ResponseEntity<Set<User>> retweet(@PathVariable int id, @RequestBody User user) {
        Set<User> updateRetweets = tweetService.saveRetweets(user, id);
        if (updateRetweets != null) {
            return ResponseEntity.ok(updateRetweets);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    @DeleteMapping("/retweet/{id}")
    @Transactional
    public ResponseEntity<Set<User>> unRetweets(@PathVariable int id, @RequestBody User user) {
        Set<User> updateRetweets = tweetService.deleteRetweets(user, id);
        if (updateRetweets != null) {
            return ResponseEntity.ok(updateRetweets);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/comment/{id}/{userId}")
    @Transactional
    public ResponseEntity<String> comment(@PathVariable int id, @PathVariable int userId, @RequestBody String comment) {
        User user = userService.findById(userId);
        tweetService.saveComment(user, id, comment);
        if (comment != null) {
            return ResponseEntity.ok(comment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/comment/{id}")
    @Transactional
    public List <Comment> comment(@PathVariable int id) {
        return tweetService.getComments(id);
    }

    @DeleteMapping("/commentDelete/{id}")
    @Transactional
    public Comment deleteComment(@PathVariable int id) {
        return tweetService.deleteComment(id);
    }


}
