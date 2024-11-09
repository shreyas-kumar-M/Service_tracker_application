package org.shreyas.servicemanagement;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

@SpringBootApplication(exclude = { SecurityAutoConfiguration.class })
public class ServiceManagementApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServiceManagementApplication.class, args);
	}

}
