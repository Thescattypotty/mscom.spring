package org.simpleEcom.product.Payload.Request;

public record ProductRequest(
    String name,
    String description,
    String imageUrl,
    Double price
){

}
