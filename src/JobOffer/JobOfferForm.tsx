import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import JobOffer from '../objects/JobOffer';
import axios from 'axios';
import { Auth } from '../context/AuthContext';

const JobOfferForm = () => {

    const { logout, getUser } = Auth();
    const navigate = useNavigate();
    const [jobName, setJobName] = useState("");
    const [description, setDescription] = useState("");
    const [requirements, setRequirements] = useState("");
    const [location, setLocation] = useState("");
    const [salary, setSalary] = useState(0);
    const [autorEmail, setAutorEmail] = useState(getUser().email);

    const changeSalary = (value: any) => {
        setSalary(value);
    }

    async function sendData() {

        let jobOffer = new JobOffer(jobName, description, requirements, location, salary, getUser().email);
        console.log(jobOffer);

        axios.post(`http://localhost:8080/api/joboffer`, jobOffer).then(res => {
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
                        <div className="card-header">Uzupełnij formularz</div>
                        <div className="card-body">

                            
                            <div className="form-group mt-2">
                                <label htmlFor="email">Podaj nazwę stanowiska: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="text"
                                    onChange={(e) => { setJobName(e.target.value) }}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Podaj opis: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="text"
                                    onChange={(e) => { setDescription(e.target.value) }}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Podaj wymagania: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => { setRequirements(e.target.value) }}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Podaj lokalizacje: </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    onChange={(e) => { setLocation(e.target.value) }}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Podaj pensje: </label>
                                <input
                                    type="number"
                                    className="form-control"
                                    onChange={(e) => { changeSalary(e.target.value) }}
                                    required
                                />
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary mt-2" onClick={(e) => { sendData() }}>
                            Prześlij
                        </button>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default JobOfferForm
