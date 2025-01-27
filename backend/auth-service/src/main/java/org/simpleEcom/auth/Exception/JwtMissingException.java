package org.simpleEcom.auth.Exception;

public class JwtMissingException extends RuntimeException {
    public JwtMissingException(String message) {
        super(message);
    }
    
}
