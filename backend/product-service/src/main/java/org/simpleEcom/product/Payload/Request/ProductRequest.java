package org.simpleEcom.product.Payload.Request;

import org.simpleEcom.product.Enum.ECategory;

public record ProductRequest(
    String name,
    String description,
    ECategory category,
    String imageUrl,
    Double price
){

}
