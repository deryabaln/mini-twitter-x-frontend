package com.workintech.TwitterBackend.service;

import com.workintech.TwitterBackend.entity.Comment;
import com.workintech.TwitterBackend.entity.Tweet;
import com.workintech.TwitterBackend.exceptions.TweetException;
import com.workintech.TwitterBackend.repository.TweetRepository;
import com.workintech.TwitterBackend.user.User;
import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class TweetServiceImpl implements TweetService {

    private TweetRepository tweetRepository;
    private EntityManager entityManager;

    @Autowired

    public TweetServiceImpl(TweetRepository tweetRepository, EntityManager entityManager) {
        this.tweetRepository = tweetRepository;
        this.entityManager = entityManager;
    }

    @Override
    public List<Tweet> find() {
        return tweetRepository.findAll();
    }

    @Override
    public Tweet findById(int id) {
        Optional<Tweet> optionalTweet = tweetRepository.findById(id);
        if (optionalTweet.isPresent()) {;
            return optionalTweet.get();
        }
        throw new TweetException("Tweet with given id is not exist: " + id, HttpStatus.BAD_REQUEST);
    }


    @Override
    public Tweet save(Tweet tweet) {
        return tweetRepository.save(tweet);
    }

    @Override
    public Tweet delete(int id) {
        Optional<Tweet> optionalTweet = tweetRepository.findById(id);
        if (optionalTweet.isPresent()) {
            tweetRepository.delete(optionalTweet.get());
            return optionalTweet.get();
        }
        throw new TweetException("Tweet with given id is not exist: " + id, HttpStatus.BAD_REQUEST);
    }

    @Override
    @Transactional
    public Set<User> saveLikes(User user, int id) {
        Optional<Tweet> tweetOptional = tweetRepository.findById(id);
        if (tweetOptional.isPresent()) {
            Tweet tweet = tweetOptional.get();
            for (User userLike : tweet.getLikes()) {
                if (userLike.getId() == user.getId()) {
                    throw new TweetException("This user is already on the like list: " + id, HttpStatus.BAD_REQUEST);
                }
            }
            tweet.getLikes().add(user);
            return tweet.getLikes();
        }
        throw new TweetException("Tweet with given id is not exist: " + id, HttpStatus.BAD_REQUEST);
    }

    @Override
    @Transactional
    public Set<User> deleteLikes(User user, int id) {
        Optional<Tweet> tweetOptional = tweetRepository.findById(id);
        if (tweetOptional.isPresent()) {
            Tweet tweet = tweetOptional.get();
            boolean removed = tweet.getLikes().removeIf(like -> like.getId() == user.getId());
            if (!removed) {
                throw new TweetException("This user is not in the likes list: " + id, HttpStatus.BAD_REQUEST);
            }
            return tweet.getLikes();
        }
        throw new TweetException("Tweet with given id is not exist: " + id, HttpStatus.BAD_REQUEST);
    }

    @Override
    @Transactional
    public Set<User> saveRetweets(User user, int id) {
        Optional<Tweet> tweetOptional = tweetRepository.findById(id);
        if (tweetOptional.isPresent()) {
            Tweet tweet = tweetOptional.get();
            for (User userRetweet : tweet.getRetweets()) {
                if (userRetweet.getId() == user.getId()) {
                    throw new TweetException("This user is already on the retweet list: " + id, HttpStatus.BAD_REQUEST);
                }
            }
            tweet.getRetweets().add(user);
            return tweet.getRetweets();
        }
        throw new TweetException("Tweet with given id is not exist: " + id, HttpStatus.BAD_REQUEST);
    }

    @Override
    @Transactional
    public Set<User> deleteRetweets(User user, int id) {
        Optional<Tweet> tweetOptional = tweetRepository.findById(id);
        if (tweetOptional.isPresent()) {
            Tweet tweet = tweetOptional.get();
            boolean removed = tweet.getRetweets().removeIf(retweet -> retweet.getId() == user.getId());
            if (!removed) {
                throw new TweetException("This user is not in the retweets list: " + id, HttpStatus.BAD_REQUEST);
            }
            return tweet.getRetweets();
        }
        throw new TweetException("Tweet with given id is not exist: " + id, HttpStatus.BAD_REQUEST);
    }

    @Override
    @Transactional
    public Comment saveComment(User user, int id, String text) {
        Optional<Tweet> tweetOptional = tweetRepository.findById(id);
        if (tweetOptional.isPresent()) {
            Tweet tweet = tweetOptional.get();
            Comment comment = new Comment();
            comment.setUser(user);
            comment.setTweet(tweet);
            comment.setText(text);
            tweet.getComments().add(comment);
            user.getComments().add(comment);
            return comment;
        }
        throw new TweetException("Tweet with given id is not exist: " + id, HttpStatus.BAD_REQUEST);
    }
    @Override
    public Comment findCommentById(int id) {
        Optional<Comment> optionalTweet = tweetRepository.findCommentById(id);
        if (optionalTweet.isPresent()) {;
            return optionalTweet.get();
        }
        throw new TweetException("Tweet comment given id is not exist: " + id, HttpStatus.BAD_REQUEST);
    }
    @Override
    @Transactional
    public Comment deleteComment(int commentId) {
        Comment comment = findCommentById(commentId);
        if (comment != null){
            tweetRepository.deleteComment(commentId);
            return comment;
        }
        throw new TweetException("Tweet comment given id is not exist: " + commentId, HttpStatus.BAD_REQUEST);

    }

    @Override
    @Transactional
    public List<Comment> getComments(int id) {
      Tweet tweet = findById(id);
      return tweet.getComments();
    }


}

