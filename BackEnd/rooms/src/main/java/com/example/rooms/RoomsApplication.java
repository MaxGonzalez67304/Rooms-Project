package com.example.rooms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableScheduling
public class RoomsApplication {

	public static void main(String[] args) {
		SpringApplication.run(RoomsApplication.class, args);
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				// Configure Cross-Origin Resource Sharing (CORS) settings
				registry.addMapping("/**")
						.allowedOrigins("http://localhost:4200") // Allow requests from this origin
						.allowedMethods("*") // Allow all HTTP methods
						.allowedHeaders("*"); // Allow all HTTP headers
			}
		};
	}
}
