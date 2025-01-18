package org.simpleEcom.product.EntityRepository;

import java.util.UUID;

import org.simpleEcom.product.Entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, UUID>{
    
}
