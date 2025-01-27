package org.simpleEcom.order.Payload.Request;

import org.simpleEcom.order.Enum.EOrder;

public record OrderRequest(
    String productId,
    Integer quantity,
    EOrder status
) {
    
}
