package com.workintech.TwitterBackend.exceptions;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HollywoodErrorResponse {
    private int status;
    private String message;
    private long timestamp;
}
