# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



// Table schema of the application 


user table:
     -user_id primary key
     -name:String
     -email:string
     -password:string
     -Account-Type:enum

     
companies table:
    -:comp_id   :number
    -name       :text
    -logo_url   :text
    -createdAt  :timestamp

job table:
    -job_id       :number
    -createdAt    :timestamp 
    -rec_id       :number
    -title        :text

    
--company_id foreignkey link company (comp_id) 

    -job descrpition :text
    -location        :text
    -requirements    :text
    -isOpen          :bool

applications table:
    -app_id  :number 
    // cascade all if the job is remove the
    // All the application of the automatically remove   
    --job_id foreign key link jobs (job_id)
    -user_id 
    -status  :enum
    -resume  :text
    -skills
    -exaperiance
    -education
    -name



saved job table:
  user_id  :
  // casecade
  job_id: foreign key jobs job_id   


 
