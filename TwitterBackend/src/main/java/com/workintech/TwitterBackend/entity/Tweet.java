package com.workintech.TwitterBackend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.workintech.TwitterBackend.user.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "tweets", schema = "spring")
public class Tweet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "content")
    @NotNull
    @NotEmpty
    private String content;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "tweet_likes", schema = "spring",
            joinColumns = @JoinColumn(name = "tweet_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> likes = new HashSet<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "tweet_retweets", schema = "spring",
            joinColumns = @JoinColumn(name = "tweet_id"),
            inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<User> retweets = new HashSet<>();
    @JsonIgnore
    @OneToMany(mappedBy = "tweet", cascade = CascadeType.ALL)
    private List<Comment> comments = new ArrayList<>();

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.DETACH,
            CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinColumn (name = "user_id")
    private User user;
}


