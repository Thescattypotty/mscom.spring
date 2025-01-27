package org.simpleEcom.order.Payload.Mapper;

import java.time.format.DateTimeFormatter;

import org.simpleEcom.order.Entity.Order;
import org.simpleEcom.order.Payload.Request.OrderRequest;
import org.simpleEcom.order.Payload.Response.OrderResponse;
import org.springframework.stereotype.Service;

@Service
public class OrderMapper {

    public Order toOrder(OrderRequest orderRequest){
        return Order.builder()
            .productId(orderRequest.productId())
            .quantity(orderRequest.quantity())
            .build();
    }

    public OrderResponse fromOrder(Order order){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
        return new OrderResponse(
            order.getId().toString(),
            order.getProductId(),
            order.getTotalPrice(),
            order.getQuantity(),
            order.getStatus(),
            order.getUser(),
            order.getCreatedAt().format(formatter),
            order.getUpdatedAt().format(formatter)
        );
    }
}
