package org.simpleEcom.product.Exception;

public class ProductNotFoundException extends RuntimeException{
    public ProductNotFoundException(){
        super("Product not found");
    }
}
