package org.simpleEcom.order.Payload.Response;

import org.simpleEcom.order.Enum.EOrder;

public record OrderResponse(
    String id,
    String productId,
    Double totalPrice,
    Integer quantity,
    EOrder status,
    String user,
    String createdAt,
    String updatedAt
) {
    
}
