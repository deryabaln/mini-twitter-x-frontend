package com.workintech.TwitterBackend.repository;

import com.workintech.TwitterBackend.entity.Comment;
import com.workintech.TwitterBackend.entity.Tweet;
import com.workintech.TwitterBackend.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.Set;

public interface TweetRepository extends JpaRepository <Tweet, Integer> {
    @Query("SELECT c FROM Comment c WHERE c.id = :id")
    Optional<Comment> findCommentById(int id);
    @Modifying
    @Query("DELETE FROM Comment c WHERE c.id = :id")
    void deleteComment(@Param("id") int id);

}
