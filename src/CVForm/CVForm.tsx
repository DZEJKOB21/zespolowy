import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Auth } from '../context/AuthContext';
import DegreesOfEducation from '../enum/DegreesOfEducation';
import degreesSelect from '../options/degreesSelect';
import Candidate from '../objects/Candiate';
import Select from 'react-select';
import { send } from 'process';
import SpinnerLoading from '../lib/SpinnerLoading';
import axios from 'axios';

const CVForm = () => {


  const navigate = useNavigate();
  const { getUser } = Auth();
  const [isLoading, setIsLoading] = useState(true);
  const [cv, setCV] = useState<File>();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState(getUser().email)
  const [numberPhone, setNumberPhone] = useState("");
  const [degrees, setDegrees] = useState<DegreesOfEducation>(DegreesOfEducation.DOCTORATE);
  const [experience, setExperience] = useState("");
  const [preferences, setPreferences] = useState("");
  const [candidate, setCandidate] = useState<Candidate>();


  useEffect(() => {
    if (getUser().email != null) {
        setIsLoading(false);
        setEmail(getUser().email);
    }
}, [getUser])

if(isLoading) {
    return (
        <SpinnerLoading/>
    );
}


  async function sendData() {
    
    let candidate = new Candidate(firstName,lastName,email,numberPhone,degrees,experience,preferences);
    console.log(candidate);

    axios.post(`http://localhost:8080/api/candidates`, candidate).then(res => { 
        console.log(res.data);
        navigate('/dashboard');
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
            <div className="card-header">Złóż formularz rekrutacyjny</div>
            <div className="card-body">
             
             
                <div className="form-group mt-2">
                  <label htmlFor="email">Podaj imię: </label>
                  <input
                    type="text"
                    className="form-control"
                    id="text"
                    onChange={(e) => { setFirstName(e.target.value) }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Podaj nazwisko: </label>
                  <input
                    type="text"
                    className="form-control"
                    id="text"
                    onChange={(e) => { setLastName(e.target.value) }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Podaj numer telefonu: </label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => { setNumberPhone(e.target.value) }}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Wybierz wykształcenie: </label>
                  <Select options={degreesSelect} onChange={(e) => {setDegrees(e!.value)}}></Select>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Podaj swoje doświadczenie: </label>
                  <textarea id="" cols={10} rows={2}  className="form-control" onChange={(e) => {setExperience(e.target.value)}}></textarea>
                </div>
                <div className="form-group">
                  <label htmlFor="password">Podaj swoje preferencje: </label>
                  <textarea id="" cols={10} rows={2}  className="form-control" onChange={(e) => {setPreferences(e.target.value)}}></textarea>
                </div>
                <div className="form-group">
                  <label><h6>Możesz również przesłąć do nas dokument w formie pliku (opcjonalne)</h6></label>
                  <input type="file" id="image" className="form-control-file" onChange={(e) => { setCV(e.target.files![0]) }} />
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

export default CVForm
