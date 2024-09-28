package com.jobportal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ConfigurableApplicationContext;

import com.jobportal.model.User;
import com.jobportal.repository.UserRepository;
import com.jobportal.utility.AccountType;

@SpringBootApplication
public class JobPortalApplication {
	
	
	

	public static void main(String[] args) {
	 SpringApplication.run(JobPortalApplication.class, args);
		
	  
		

	}

}
