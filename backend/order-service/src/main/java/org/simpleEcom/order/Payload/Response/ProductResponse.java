package org.simpleEcom.order.Payload.Response;

public record ProductResponse(
    String id,
    String name,
    String description,
    String category,
    String imageUrl,
    Double price,
    String createdAt,
    String updatedAt
) {
    
}
