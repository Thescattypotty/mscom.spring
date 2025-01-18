
package org.simpleEcom.product.Service;

import java.util.List;
import java.util.UUID;

import org.simpleEcom.product.Entity.Product;
import org.simpleEcom.product.EntityRepository.ProductRepository;
import org.simpleEcom.product.IService.IProductService;
import org.simpleEcom.product.Payload.Mapper.ProductMapper;
import org.simpleEcom.product.Payload.Request.ProductRequest;
import org.simpleEcom.product.Payload.Response.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService implements IProductService {
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    @Override
    @Transactional
    public void createProduct(ProductRequest productRequest) {
        productRepository.save(productMapper.toProduct(productRequest));
    }

    @Override
    @Transactional
    public void updateProduct(String id, ProductRequest productRequest) {
        Product product = productRepository.findById(UUID.fromString(id))
            .orElseThrow();
        product.setName(productRequest.name());
        product.setDescription(productRequest.description());
        product.setPrice(productRequest.price());
        productRepository.save(product);
    }

    @Override
    @Transactional
    public void deleteProduct(String id) {
        productRepository.deleteById(UUID.fromString(id));
    }

    @Override
    public Page<ProductResponse> getAllProducts(int page, int size, String sortBy, String order) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.fromString(order), sortBy));
        return productRepository.findAll(pageable)
            .map(productMapper::fromProduct);
    }

    @Override
    public ProductResponse getProductById(String id) {
        Product product = productRepository.findById(UUID.fromString(id)).orElseThrow();
        return productMapper.fromProduct(product);
    }
}