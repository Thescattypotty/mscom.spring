package org.simpleEcom.order.Service;

import java.util.List;
import java.util.UUID;

import org.simpleEcom.order.Client.ProductClient;
import org.simpleEcom.order.Component.CurrentUserComponent;
import org.simpleEcom.order.Entity.Order;
import org.simpleEcom.order.EntityRepository.OrderRepository;
import org.simpleEcom.order.Enum.EOrder;
import org.simpleEcom.order.Exception.OrderNotFoundException;
import org.simpleEcom.order.IService.IOrderService;
import org.simpleEcom.order.Payload.Mapper.OrderMapper;
import org.simpleEcom.order.Payload.Request.OrderRequest;
import org.simpleEcom.order.Payload.Response.OrderResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class OrderService implements IOrderService{

    private final OrderMapper orderMapper;
    private final CurrentUserComponent currentUserComponent;
    private final OrderRepository orderRepository;
    private final ProductClient productClient;

    @Override
    public void createOrder(OrderRequest orderRequest) {
        Order order = orderMapper.toOrder(orderRequest);
        order.setStatus(EOrder.PENDING);
        order.setTotalPrice(orderRequest.quantity() * productClient.getProductById(orderRequest.productId()).price());
        orderRepository.save(order);
    }

    @Override
    public void updateOrder(String id, OrderRequest orderRequest) {
        Order order = orderRepository.findById(UUID.fromString(id))
            .orElseThrow(() -> new OrderNotFoundException("Order not found"));
        order.setStatus(orderRequest.status());
    }

    @Override
    public OrderResponse getOrder(String id) {
        return orderRepository.findById(UUID.fromString(id))
            .map(orderMapper::fromOrder)
            .orElseThrow(() -> new OrderNotFoundException("Order not found"));
    }

    @Override
    public Page<OrderResponse> getOrders(int page, int size, String sortBy, String order) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(order), sortBy));
        return currentUserComponent.getCurrentUser()
            .map(user -> orderRepository.findByUser(pageable, user).map(orderMapper::fromOrder))
            .orElse(Page.empty(pageable));
    }
    
}
