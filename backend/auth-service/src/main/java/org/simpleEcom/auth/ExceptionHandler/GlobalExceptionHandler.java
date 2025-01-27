package org.simpleEcom.auth.ExceptionHandler;

import org.simpleEcom.auth.Exception.JwtMissingException;
import org.simpleEcom.auth.Exception.LoginFailedException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(JwtMissingException.class)
    public ResponseEntity<String> handleException(JwtMissingException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(LoginFailedException.class)
    public ResponseEntity<String> handleException(LoginFailedException e) {
        return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
