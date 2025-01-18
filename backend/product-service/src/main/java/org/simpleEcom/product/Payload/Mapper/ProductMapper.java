package org.simpleEcom.product.Payload.Mapper;

import java.time.format.DateTimeFormatter;

import org.simpleEcom.product.Entity.Product;
import org.simpleEcom.product.Payload.Request.ProductRequest;
import org.simpleEcom.product.Payload.Response.ProductResponse;
import org.springframework.stereotype.Service;

@Service
public class ProductMapper {
    
    public Product toProduct(ProductRequest productRequest){
        return Product.builder()
            .name(productRequest.name())
            .description(productRequest.description())
            .imageUrl(productRequest.imageUrl())
            .price(productRequest.price())
            .build();
    }
    public ProductResponse fromProduct(Product product){
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm");
        return new ProductResponse(
            product.getId().toString(),
            product.getName(),
            product.getDescription(),
            product.getImageUrl(),
            product.getPrice(),
            product.getCreatedAt().format(formatter),
            product.getUpdatedAt().format(formatter)
        );
    }
}
