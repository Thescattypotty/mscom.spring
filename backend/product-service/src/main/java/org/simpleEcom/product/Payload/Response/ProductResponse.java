package org.simpleEcom.product.Payload.Response;

import org.simpleEcom.product.Enum.ECategory;

public record ProductResponse(
    String id,
    String name,
    String description,
    ECategory category,
    String imageUrl,
    Double price,
    String createdAt,
    String updatedAt
) {
    
}
