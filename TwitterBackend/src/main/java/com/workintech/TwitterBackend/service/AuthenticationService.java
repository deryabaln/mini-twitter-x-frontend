package com.workintech.TwitterBackend.service;

import com.workintech.TwitterBackend.dto.LoginResponse;
import com.workintech.TwitterBackend.user.Role;
import com.workintech.TwitterBackend.user.User;
import com.workintech.TwitterBackend.repository.RoleRepository;
import com.workintech.TwitterBackend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;
@Service
public class AuthenticationService {
    private UserRepository userRepository;
    private RoleRepository roleRepository;
    private PasswordEncoder passwordEncoder;
    private AuthenticationManager authenticationManager;
    private TokenService tokenService;

    @Autowired
    public AuthenticationService(UserRepository userRepository, RoleRepository roleRepository, PasswordEncoder passwordEncoder,
                                 AuthenticationManager authenticationManager, TokenService tokenService) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenService = tokenService;
    }

    public User register(String firstName, String lastName,
                         String email, String password, LocalDate birthDate) {
        Optional<User> existingUser = userRepository.findUserByEmail(email);
        if (existingUser.isPresent()) {
            throw new RuntimeException("This email address is already registered.");
        }

        String encodedPassword = passwordEncoder.encode(password);
        Role userRole = roleRepository.findByAuthority("USER").get();
        Set<Role> authorities = new HashSet<>();
        authorities.add(userRole);

        User user = new User();
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setEmail(email);
        user.setBirthDate(birthDate);
        user.setPassword(encodedPassword);
        user.setAuthorities(authorities);
        return userRepository.save(user);
    }


    public LoginResponse login(String email, String password) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password));
            String token = tokenService.generateJwtToken(auth);
            return new LoginResponse(userRepository.findUserByEmail(email).get(), token);
        } catch (AuthenticationException ex) {
            throw new RuntimeException("User credentials are not valid");
        }
    }
}
