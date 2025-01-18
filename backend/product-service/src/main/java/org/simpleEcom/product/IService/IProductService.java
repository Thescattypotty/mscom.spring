package org.simpleEcom.product.IService;

import org.simpleEcom.product.Payload.Request.ProductRequest;
import org.simpleEcom.product.Payload.Response.ProductResponse;
import org.springframework.data.domain.Page;

public interface IProductService {
    void createProduct(ProductRequest productRequest);
    void updateProduct(String id , ProductRequest productRequest);
    void deleteProduct(String id);
    Page<ProductResponse> getAllProducts(int page, int size, String sortBy, String order);
    ProductResponse getProductById(String id);    
}
