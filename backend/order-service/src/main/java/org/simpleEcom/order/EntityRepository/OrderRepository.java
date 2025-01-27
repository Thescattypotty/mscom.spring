package org.simpleEcom.order.EntityRepository;

import java.util.UUID;

import org.simpleEcom.order.Entity.Order;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface OrderRepository extends JpaRepository<Order, UUID> {
    Page<Order> findByUser(Pageable pageable, String user);
    List<Order> findByStatus(String status);
    List<Order> findByProductIdAndUser(String productId, String user);
    List<Order> findByProductIdAndStatus(String productId, String status);
}
