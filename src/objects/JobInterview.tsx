import Candidate from "./Candiate";
import JobOffer from "./JobOffer";

class JobInterview {
    id?: number;
    candidate: Candidate;
    jobOffer: JobOffer;
    notes?: string;
    result?: boolean;

    constructor(candidate: Candidate, jobOffer: JobOffer, result?: boolean, notes?: string, id?: number) {
      this.candidate = candidate;
      this.jobOffer = jobOffer;
      this.notes = notes;
      this.result = result;
      this.id = id;
    }

  }
  
  export default JobInterview;