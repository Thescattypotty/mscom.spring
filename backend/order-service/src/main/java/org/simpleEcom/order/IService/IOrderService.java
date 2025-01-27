package org.simpleEcom.order.IService;

import java.util.List;

import org.simpleEcom.order.Payload.Request.OrderRequest;
import org.simpleEcom.order.Payload.Response.OrderResponse;
import org.springframework.data.domain.Page;

public interface IOrderService {
    void createOrder(OrderRequest orderRequest);
    void updateOrder(String id, OrderRequest orderRequest);
    OrderResponse getOrder(String id);
    Page<OrderResponse> getOrders(int page, int size, String sortBy, String order);
}