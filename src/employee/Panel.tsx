import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import JobOffer from '../objects/JobOffer';
import axios from 'axios';
import { Auth } from '../context/AuthContext';
import Candidate from '../objects/Candiate';
import AlertDialogSlide from '../dialogs/MyDialog';
import JobInterview from '../objects/JobInterview';
import { Link } from 'react-router-dom';


const Panel = () => {

    const { logout, getUser } = Auth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState<string>();
    const [isSendedCV, setIsSendedCV] = useState(false);
    const [jobOffers, setJobOffers] = useState<any[]>([]);
    const [jobOffersArray, setJobOffersArray] = useState<any[]>([]);
    const [idCV, setIdCv] = useState();
    const [candidate, setCandidate] = useState<Candidate>()
    const [open, setOpen] = React.useState(false);
    let [isOpen, setIsOpen] = useState(true)
    const [search, setSearch] = useState('');
    const [searchUrl, setSearchUrl] = useState('');
    const [jobOffersPerPage, setJobOffersPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalAmountOfJobOffers, setTotalAmountOfJobOffers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [interviews, setInterviews] = useState<any[]>([]);

    // useEffect(() => {
    //     const fetchJobOffers = async () => {

    //         let baseUrl = `http://localhost:8080/api/joboffer`;

    //         let url: string = '';

    //         if (searchUrl === '') {
    //             url = `${baseUrl}/getJobOffers?page=${currentPage - 1}&size=${jobOffersPerPage}`;
    //         } else {
    //             url = baseUrl + searchUrl;
    //         }
    //         console.log(url);
    //         await axios.get(url).then(res => {
    //             setTotalAmountOfJobOffers(res.data.totalElements);
    //             setTotalPages(res.data.totalPages);
    //             setJobOffers(res.data.content);
    //             console.log(res.data.content);
    //         })

    //         setIsLoading(false);
    //     }
    //     fetchJobOffers();
    // }, [getUser, currentPage, searchUrl])

    useEffect(() => {
        const fetchInterviews = async () => {

            let baseUrl = `http://localhost:8080/api/interviews`;

            let url: string = '';

            if (searchUrl === '') {
                url = `${baseUrl}/interviews?page=${currentPage - 1}&size=${jobOffersPerPage}`;
            } else {
                url = baseUrl + searchUrl;
            }
            console.log(url);
            await axios.get(url).then(res => {
                setInterviews(res.data.content);
                console.log(res.data.content);
                for (let i = 0; i < res.data.content.length; i++) {
                    setJobOffers((jobOffers: any) => [...jobOffers, new JobOffer(
                        res.data.content[i].jobOffer.job_name,
                        res.data.content[i].jobOffer.description,
                        res.data.content[i].jobOffer.requirements,
                        res.data.content[i].jobOffer.location,
                        res.data.content[i].jobOffer.salary,
                        res.data.content[i].jobOffer.autorEmail,
                        res.data.content[i].jobOffer.id,
                    )]);
                }
            })
            setIsLoading(false);

        }
        fetchInterviews();
    }, [getUser, currentPage, searchUrl])

    useEffect(() => {
        const uniqueData = Array.from(new Set(jobOffers.map(item => item.id))).map(id => {
            return jobOffers.find(item => item.id === id);
        });

        setJobOffersArray(uniqueData);
    }, [jobOffers])

    async function deleteJobOffer(value: any) {
        await axios.delete(`http://localhost:8080/api/joboffer/${value}`).then(res => {
            window.location.reload();
        })
    }

    return (
        <div className="container">
            <div className='row justify-content-end'>
                <div className='col-2 mt-2'>
                </div>
                <h2>Witaj, Pracodawco!</h2>
            </div>

            <h1 className="my-4"></h1>
            <div className="row">
                <div className='d-flex col-8 mt-1'>
                </div>
                <div className="col-md mt-3">
                    <div className="card mb-4">
                        <div className="card-body">
                            <h5 className="card-title">Oferty pracy</h5>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Stanowisko</th>
                                        <th scope="col">Opis</th>
                                        <th scope="col">Wymagania</th>
                                        <th scope="col">Lokalizacja</th>
                                        <th scope="col">Pensja (per miesiąc)</th>
                                        <th scope="col"></th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    <td><button className='btn btn-primary' onClick={(e) => {getAll()}}>Umów się</button></td>
                                </tr> */}
                                    {
                                        jobOffers.length > 0 ?
                                            jobOffersArray.map((item: JobOffer) => (
                                                <tr>
                                                    <th scope="row">{item.id}</th>
                                                    <td>{item.job_name}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.requirements}</td>
                                                    <td>{item.location}</td>
                                                    <td>{item.salary}</td>
                                                    <td>
                                                        <button type="button" className="btn btn-danger" onClick={(e) => { deleteJobOffer(item.id) }}>Usuń</button>
                                                    </td>
                                                    <td>
                                                        {/* { interviews.find(interview => interview.jobOffer.id === item.id) } */}
                                                        <Link type="button" className='btn btn-primary' to='/panel/edit' state={{
                                                            interview: interviews.find(interview => interview.jobOffer.id === item.id) 
                                                        }}>Przyjmij ofertę</Link>
                                                    </td>
                                                </tr>
                                            ))
                                            :
                                            <h3>Nie ma nic</h3>

                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                {/* <div className="col-md-6">
                <div className="card mb-4">
                    <div className="card-body">
                        <h5 className="card-title">Panel 2</h5>
                        <p className="card-text">Treść panelu 2</p>
                    </div>
                </div>
            </div> */}
            </div>

        </div>
    );
}

export default Panel
