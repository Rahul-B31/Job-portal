package com.jobportal.services;

import java.io.IOException;
import java.nio.file.CopyOption;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.jobportal.dto.JobDetails;
import com.jobportal.exception.JobNotFound;
import com.jobportal.exception.UserException;
import com.jobportal.model.Application;
import com.jobportal.model.Company;
import com.jobportal.model.Job;
import com.jobportal.model.User;
import com.jobportal.repository.ApplicationRepository;
import com.jobportal.repository.CompanyRepository;
import com.jobportal.repository.JobRepository;
import com.jobportal.repository.UserRepository;


@Service
public class JobServiceImpl implements IJobService {

	
	@Autowired
	CompanyRepository companyRepository;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	JobRepository jobRepository;
	
	@Autowired
	ApplicationRepository applicationRepository;
	
	@Value("${candidate.resume-dir}")
	String uploadResumeDir;
	
	
	
	
	
	@Override
	public Job createJob(JobDetails jobDetails) throws Exception {
		
		
		Company company = companyRepository.findById(jobDetails.getCompany_id()).get();
		User recruiter = userRepository.findById(jobDetails.getRecruiter_id()).get();
		
	
		Job job = new Job();
		
		job.setCompany(company);
		job.setRecruiter(recruiter);
		job.setCreatedAt(LocalDateTime.now());
		job.setJobDescription(jobDetails.getDescription());
		job.setLocation(jobDetails.getLocation());
		job.setOpen(true);
		job.setRequirements(jobDetails.getRequirements());
		job.setTitle(jobDetails.getTitle());
		
		Job save = jobRepository.save(job);
		if(save==null)
			throw new Exception("Erorr while creating the job");
		return save;
	}



	@Override
	public List<Job> fetchAllJobs() {
	     List<Job> jobs = jobRepository.findAll();
		return jobs;
	}



	@Override
	public Job fetchJobById(String id) {
		
		Optional<Job> job = jobRepository.findById(id);
		return job.orElseThrow(()-> new JobNotFound("Job Not Found for the id "+id));
	}



	@Override
	public Application applyToJob(
			MultipartFile file,String candidate_id,
			String jobId,
			String name,
			String skills,
			String status,
			String education,
			Integer experience
			) throws IOException {
		
		
		Path uploadPath = Paths.get(uploadResumeDir);
		
		if(!Files.exists(uploadPath))
		{
			Files.createDirectories(uploadPath);
		}
		
		String filename = file.getOriginalFilename();
		String uid = UUID.randomUUID().toString();
		String uniquefilename = uid + filename.substring(filename.lastIndexOf("."));
		
		Path filepath = uploadPath.resolve(uniquefilename);
		Files.copy(file.getInputStream(),filepath,StandardCopyOption.REPLACE_EXISTING);
		
		String resume = filepath.toString();
		User user = userRepository.findById(candidate_id).orElseThrow(()->new UserException("User Not Found"));
		Job job =   jobRepository.findById(jobId).orElseThrow(()->new JobNotFound("job not found"));
		
		Application application = new Application();
		
		application.setEducation(education);
		application.setExperience(experience);
		application.setJob(job);
		application.setName(name);
		application.setResume(resume);
		application.setSkills(skills);
		application.setStatus(status);
		application.setUser(user);
		application.setCreatedAt(LocalDateTime.now());
		
		// increment the job application count
		
		job.setApplicationCount(job.getApplicationCount()+1);	
		jobRepository.save(job);
		
		Application app = applicationRepository.save(application);
		
		return app;
	}



	@Override
	public Boolean isApplied(String userId,String jobId) {
		
		Job job = jobRepository.findById(jobId).get();
		User user = userRepository.findById(userId).get();

		boolean existsByJobAndUser = applicationRepository.existsByJobAndUser(job,user);
		return existsByJobAndUser;
	}



	@Override
	public List<Application> getApplicationsByUser(String userId) {
		   User user = userRepository.findById(userId).get();
		   return applicationRepository.findByUser(user);
	
	}
	
	
	public Path getResumeById(String appId) {
		
		Application application = applicationRepository.findById(appId).get();
		String filepath = application.getResume();
		Path path = Paths.get(filepath);
		
		return path;
	    
	}

}
