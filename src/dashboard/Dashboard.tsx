import React, { useEffect, useState } from 'react'
import { Auth } from '../context/AuthContext';
import { useNavigate } from 'react-router';
import SpinnerLoading from '../lib/SpinnerLoading';
import axios from 'axios';
import { SlCheck } from "react-icons/sl";
import JobOffer from '../objects/JobOffer';
import MyDialog from '../dialogs/MyDialog';
import { Dialog } from '@headlessui/react'
import AlertDialogSlide from '../dialogs/MyDialog';
import Candidate from '../objects/Candiate';
import { Pagination } from '../utils/Pagination';


const Dashboard = () => {

    const { logout, getUser } = Auth();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [username, setUsername] = useState<string>();
    const [isSendedCV, setIsSendedCV] = useState(false);
    const [jobOffers, setJobOffers] = useState<any>([]);
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

    useEffect(() => {
        if (getUser().email != null) {
            let email: string = getUser().email;
            setUsername(email.split('@')[0])
            console.log(email);
            axios.get(`http://localhost:8080/api/candidates/email/${email}`).then(res => {

                // for (let i = 0; i < res.data.length; i++) {
                //     if (res.data[i].email === getUser().email) {
                //         setIsSendedCV(true);
                //         setCandidate(res.data);
                //         setIdCv(res.data[i].id);
                //     }

                // }

                if (res.status == 200) {
                    setIsSendedCV(true);
                    setCandidate(res.data);
                    setIdCv(res.data.id);
                } else {
                    setIsSendedCV(false);
                }

            })
            console.log(isSendedCV);



            // axios.get(`http://localhost:8080/api/joboffer`).then(res => {
            //     for (let i = 0; i < res.data.length; i++) {
            //         setJobOffers((jobOffers: any) => [...jobOffers, new JobOffer(
            //             res.data[i].job_name,
            //             res.data[i].description,
            //             res.data[i].requirements,
            //             res.data[i].location,
            //             res.data[i].salary,
            //             res.data[i].id,
            //         )]);
            //     }

            // })
            setIsLoading(false);
        }


    }, [getUser])

    useEffect(() => {
        const fetchJobOffers = async () => {

            let baseUrl = `http://localhost:8080/api/joboffer`;

            let url: string = '';

            if (searchUrl === '') {
                url = `${baseUrl}/getJobOffers?page=${currentPage - 1}&size=${jobOffersPerPage}`;
            } else {
                url = baseUrl + searchUrl;
            }
            console.log(url);
            await axios.get(url).then(res => {
                setTotalAmountOfJobOffers(res.data.totalElements);
                setTotalPages(res.data.totalPages);
                setJobOffers(res.data.content);
                console.log(res.data.content);
                // for (let i = 0; i < res.data.length; i++) {
                //     console.log(res.data.content[i].job_name)
                //     setJobOffers((jobOffers: any) => [...jobOffers, new JobOffer(
                //         res.data[i].job_name,
                //         res.data[i].description,
                //         res.data[i].requirements,
                //         res.data[i].location,
                //         res.data[i].salary,
                //         res.data[i].id,
                //     )]);
                // }

            })

            setIsLoading(false);
        }
        fetchJobOffers();
    }, [getUser, currentPage, searchUrl])


    if (isLoading) {
        return (
            <SpinnerLoading />
        );
    }


    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login');
        }
        catch (error: any) {
            console.log(error);
        }
    }

    async function deleteCV() {
        await axios.delete(`http://localhost:8080/api/candidates/${idCV}`).then(res => {
            window.location.reload();
        })
    }

    async function deleteJobOffer(value: any) {
        await axios.delete(`http://localhost:8080/api/joboffer/${value}`).then(res => {
            window.location.reload();
        })
    }

    const searchHandleChange = () => {
        if (search === '') {
            setSearchUrl('');
        } else {
            setSearchUrl(`/search/findByTitleContaining?title=${search}&page=0&size=${jobOffersPerPage}`)
        }
    }

    const indexOfLastOffer: number = currentPage * jobOffersPerPage;
    const indexOfFirstOffer: number = indexOfLastOffer - jobOffersPerPage;
    let lastItem = jobOffersPerPage * currentPage <= totalAmountOfJobOffers ?
        jobOffersPerPage * currentPage : totalAmountOfJobOffers;

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <div className="container">
            <div className='row justify-content-end'>
                <div className='col-2 mt-2'>
                    <a className="btn btn-primary" onClick={(e) => { handleLogout() }}>Wyloguj się</a>
                </div>
                <h2>Witaj, {username}</h2>
            </div>

            <h1 className="my-4"></h1>
            <div className="row">
                <div className="col-md-12">
                    <div className="card mb-4">
                        <div className="card-body">
                            {
                                isSendedCV ?
                                    <><h4>Już złożyłeś CV <SlCheck /></h4> <button className='btn btn-danger' onClick={(e) => { deleteCV() }}>Usuń CV</button> </>
                                    :
                                    <>
                                        <h3>Nie złożyłeś CV? Nie szkodzi, poniżej możesz uzupełnić formularz z danymi</h3>
                                        <button className='btn btn-primary' onClick={(e) => { navigate('/form') }}>Przejdź do formularza</button>
                                    </>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <h6 className='mx-4'>Chcesz wprowadzić swoją ofertę pracy? <button className='btn btn-primary' onClick={(e) => { navigate('/joboffer') }}>Kliknij tutaj</button></h6>
                <div className='d-flex col-8 mt-1'>
                    <input className='form-control mx-2' type="search" onChange={(e) => { setSearch(e.target.value) }} />
                    <button className='btn btn-primary' onClick={(e) => { searchHandleChange() }}>Szukaj</button>
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
                                        totalAmountOfJobOffers > 0 ?
                                            jobOffers.map((item: JobOffer) => (
                                                <tr>
                                                    <th scope="row">{item.id}</th>
                                                    <td>{item.job_name}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.requirements}</td>
                                                    <td>{item.location}</td>
                                                    <td>{item.salary}</td>
                                                    <td>
                                                    {
                                                        item.autorEmail === getUser().email ?
                                                            <button type="button" className="btn btn-danger" onClick={(e) => { deleteJobOffer(item.id) }}>Usuń</button>
                                                            :
                                                            <h3></h3>
                                                    }
                                                    </td>
                                                    {isSendedCV ?
                                                        <td><AlertDialogSlide
                                                            props1={candidate}
                                                            props2={new JobOffer(item.job_name, item.description, item.requirements, item.location, item.salary, item.autorEmail, item.id)}
                                                            props3={isSendedCV}
                                                        /></td> : <h3></h3>
                                                    }
                                                </tr>

                                            ))
                                            :
                                            <h3>Nie ma nic</h3>

                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                    {totalPages > 1 &&
                        <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />
                    }
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
    )
}

export default Dashboard
