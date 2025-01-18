package org.simpleEcom.product.Payload.Response;

public record ProductResponse(
    String id,
    String name,
    String description,
    String imageUrl,
    Double price,
    String createdAt,
    String updatedAt
) {
    
}
