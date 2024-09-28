package com.jobportal.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.jobportal.model.SavedJob;

public interface SavedJobRepository extends MongoRepository<SavedJob,String> {

}
