package com.workintech.TwitterBackend.exceptions;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
@ControllerAdvice
public class HollywoodExceptions {
    @ExceptionHandler
    public ResponseEntity<HollywoodErrorResponse> handleException(TweetException exception) {

        HollywoodErrorResponse response = new HollywoodErrorResponse(exception.getCode().value(),
                exception.getMessage(), System.currentTimeMillis());
        return new ResponseEntity<>(response, exception.getCode());
    }

    @ExceptionHandler
    public ResponseEntity<HollywoodErrorResponse> handleException(Exception exception) {
        log.error(exception.getMessage());
        HollywoodErrorResponse response = new HollywoodErrorResponse(HttpStatus.BAD_REQUEST.value(),
                exception.getMessage(), System.currentTimeMillis());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
