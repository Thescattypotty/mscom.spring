package org.simpleEcom.order.Configuration;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import feign.RequestInterceptor;

@Configuration
public class FeignClientConfiguration {

    @Value("${spring.application.name}")
    private String serviceName;

    @Bean
    public RequestInterceptor serviceNameInterceptor() {
        return requestTemplate -> {
            requestTemplate.header("X-Service-Name", serviceName);
        };
    }
}
