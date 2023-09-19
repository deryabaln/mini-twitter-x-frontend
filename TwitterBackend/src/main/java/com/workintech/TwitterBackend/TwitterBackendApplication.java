package com.workintech.TwitterBackend;;
import com.workintech.TwitterBackend.user.Role;
import com.workintech.TwitterBackend.repository.RoleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class TwitterBackendApplication {
	public static void main(String[] args) {
		SpringApplication.run(TwitterBackendApplication.class, args);
	}
}
