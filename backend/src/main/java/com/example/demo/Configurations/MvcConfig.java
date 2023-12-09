package com.example.demo.Configurations;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
@Configuration
public class MvcConfig implements WebMvcConfigurer{
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("index");
        registry.addViewController("/api/login").setViewName("/login");
        registry.addViewController("/api/data").setViewName("/register");
        registry.addViewController("/403").setViewName("/403");
    }
}
