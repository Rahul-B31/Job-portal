package com.jobportal.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.jobportal.model.Job;

public interface JobRepository extends MongoRepository<Job,String> {

}
