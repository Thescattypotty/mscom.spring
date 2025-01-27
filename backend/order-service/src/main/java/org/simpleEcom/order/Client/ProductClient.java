package org.simpleEcom.order.Client;

import org.simpleEcom.order.Configuration.FeignClientConfiguration;
import org.simpleEcom.order.Payload.Response.ProductResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(
    name = "product-service",
    configuration = FeignClientConfiguration.class
)
public interface ProductClient {
    @GetMapping("/api/v1/products/{id}")
    ProductResponse getProductById(@PathVariable String id);
}
