class JobOffer {
    id?: number;
    autorEmail: string;
    job_name: string;
    description: string;
    requirements: string;
    location: string;
    salary: number;

    constructor(
        job_name: string,
        description: string,
        requirements: string,
        location: string,
        salary: number,
        autorEmail: string,
        id?: number
    ) {
        this.id = id;
        this.autorEmail = autorEmail;
        this.job_name = job_name;
        this.description = description;
        this.requirements = requirements;
        this.location = location;
        this.salary = salary;
    }
}

export default JobOffer;