package org.simpleEcom.product.Configuration;

import java.util.stream.IntStream;

import org.simpleEcom.product.Entity.Product;
import org.simpleEcom.product.EntityRepository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class DatabaseInitializer implements CommandLineRunner {
    
    private final ProductRepository productRepository;
    @Override
    public void run(String... args) throws Exception {
        IntStream.rangeClosed(1, 40).forEach(i -> {
            Product product = Product.builder()
                    .name("Product " + i)
                    .description("Description du produit " + i)
                    .price(i * 10.0)
                    .build();
            productRepository.save(product);
        });
    }
}
