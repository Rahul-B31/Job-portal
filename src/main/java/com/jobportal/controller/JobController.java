package com.jobportal.controller;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.jobportal.dto.JobDetails;
import com.jobportal.model.Application;
import com.jobportal.model.Job;
import com.jobportal.services.IJobService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api")
public class JobController {
	
	
	@Autowired
	IJobService jobService;
	
	
	
	@PostMapping("/post-job")
	public ResponseEntity<Job> createJob(@RequestBody JobDetails jobDetails) throws Exception{
		
		    Job job = jobService.createJob(jobDetails);
		    return new ResponseEntity<Job>(job,HttpStatus.CREATED);	
	}
	
	
	@GetMapping("/jobs")
	public ResponseEntity<?> getAllJobs() throws Exception{
		
		List<Job> jobs = jobService.fetchAllJobs();
		return new ResponseEntity<List<Job>>(jobs,HttpStatus.OK);	
	}
	
	@GetMapping("/job/{id}")
	public ResponseEntity<?> getJobById(@PathVariable String id){
		Job job = jobService.fetchJobById(id);
		return new ResponseEntity<Job>(job,HttpStatus.OK);	
	}
	
	@PostMapping("/apply")
	public ResponseEntity<?> applyJob(
			@RequestParam("file") MultipartFile file,
			@RequestParam("candidate_id") String candidate_id,
			@RequestParam("jobId") String jobId,
			@RequestParam("name") String name,
			@RequestParam("skills") String skills,
			@RequestParam("status") String status,
			@RequestParam("education") String education,
			@RequestParam("experience") Integer experience
			
			) throws IOException{
		
		
		Application application = jobService.applyToJob(file, candidate_id, jobId, name, skills, status, education, experience);
		return new ResponseEntity<Application>(application,HttpStatus.OK);
	}
	
	@GetMapping("/isapply")
	public ResponseEntity<?> isApplyed (@RequestParam("userId") String userId,@RequestParam("jobId") String jobId)
	{
		  Boolean applied =  jobService.isApplied(userId, jobId);
		  return new ResponseEntity<Boolean>(applied,HttpStatus.OK);
	}
	
	@GetMapping("/my-applications/{userId}")
	public ResponseEntity<?> getUserApplications(@PathVariable String userId) {
		
		List<Application> applications = jobService.getApplicationsByUser(userId);
		return new ResponseEntity<List<Application>>(applications,HttpStatus.OK);
		
	}
	
	@GetMapping("/download-resume/{applicationId}")
	public ResponseEntity<Resource> getMethodName(@PathVariable String applicationId,HttpServletRequest request) throws IOException{
		
		Path path = jobService.getResumeById(applicationId);
		Resource resource = null;
		
		try {
			 resource = new UrlResource(path.toUri());
			 if (!resource.exists()) {
	                throw new FileNotFoundException("File not found ");
	            }
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		File file = new File(path.toUri());
	  String contentType = Files.probeContentType(file.toPath());
//		try {
//			
//			contentType = request.getServletContext().getMimeType(resource.getFile().getAbsolutePath());
//			
//		} catch (IOException e) {
//			contentType = "application/octet-stream";
//		}
		  if (contentType == null) {
	            contentType = "application/octet-stream";
	        }
		
		return ResponseEntity.ok()
				.contentType(MediaType.parseMediaType(contentType))
				.header(HttpHeaders.CONTENT_DISPOSITION,"attachment; filename=\""+resource.getFilename())
				.body(resource);
		
	}
	
	
	
	 
	

}
