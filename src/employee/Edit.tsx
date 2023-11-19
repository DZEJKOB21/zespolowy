import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router';
import { Auth } from '../context/AuthContext';
import DegreesOfEducation from '../enum/DegreesOfEducation';
import degreesSelect from '../options/degreesSelect';
import Candidate from '../objects/Candiate';
import Select from 'react-select';
import { send } from 'process';
import SpinnerLoading from '../lib/SpinnerLoading';
import axios from 'axios';
import JobOffer from '../objects/JobOffer';
import JobInterview from '../objects/JobInterview';

const Edit = () => {

  const navigate = useNavigate();
  const { getUser } = Auth();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const state = location.state as any;
  const [jobInterview, setJobInterview] = useState<JobInterview>(state.interview);
  const [notes, setNotes] = useState();

// if(isLoading) {
//     return (
//         <SpinnerLoading/>
//     );
// }

useEffect(() => {
    console.log(jobInterview)
}, [])

  async function sendData() {

    let jobInterviewRequest = new JobInterview(jobInterview.candidate,jobInterview.jobOffer, true, notes, jobInterview.id)

    axios.put(`http://localhost:8080/api/interviews/${jobInterview.id}`, jobInterviewRequest).then(res => { 
        console.log(res.data);
        navigate('/panel');
    })
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
        <button type="submit" className="btn btn-warning mt-2" onClick={(e) => { navigate(-1) }}>
                  Wróć
                </button>
          <div className="card mt-2">
            <div className="card-header">Podaj informację dla składającego</div>
            <div className="card-body">
             
             
                <div className="form-group mt-2">
                  <label htmlFor="email">Podaj notatkę: </label>
                  <textarea
                    className="form-control"
                    id="text"
                    required
                    cols={30} rows={10}
                    onChange={(e: any) => {setNotes(e.target.value)}}
                  />
                </div>
                <button type="submit" className="btn btn-primary mt-2" onClick={(e) => {sendData()}}>
                  Prześlij
                </button>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Edit
