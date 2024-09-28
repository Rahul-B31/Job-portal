package com.jobportal.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.jobportal.model.Job;
import com.jobportal.model.User;

import java.util.List;


public interface JobRepository extends MongoRepository<Job,String> {
	
	List<Job> findByRecruiter(User recruiter);

}
