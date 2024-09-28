package com.jobportal.services;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.jobportal.dto.JobDetails;
import com.jobportal.model.Application;
import com.jobportal.model.Job;
import com.jobportal.model.User;



public interface IJobService {
	
	public Job createJob(JobDetails jobDetails) throws Exception;
	public List<Job> fetchAllJobs();
	public Job fetchJobById(String id);
	
	public List<Application> getApplicationsByUser(String userId);
	
	public Boolean isApplied(String userId,String jobId); 
	public Path getResumeById(String appId); 
	
	public Application applyToJob(
			MultipartFile file,
			String candidate_id,
			String jobId,
			String name,
			String skills,
			String status,
			String education,
			Integer experience
			)throws IOException;

}
