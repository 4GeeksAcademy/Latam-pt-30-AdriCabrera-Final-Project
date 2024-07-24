import React, { useContext } from "react";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import { Link } from "react-router-dom";


export const ModalMovieDescription = ({ modalId, type, movie}) => {

    return (
        <>
            <div className="modal" id={modalId} tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content text-light bg-dark">
                        <div className="modal-header">
                            <h5 className="modal-title">Recomiendame una peli</h5>
                            <button type="button" className="btn-close text-light" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <nav className="nav nav-pills nav-fill">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="dropdown">
                                            <button className="btn btn-outline-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                Categoria
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item" href="#">Animadas</a></li>
                                                <li><a className="dropdown-item" href="#">Comedia</a></li>
                                                <li><a className="dropdown-item" href="#">Drama</a></li>
                                                <li><a className="dropdown-item" href="#">Terror</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="col mt-2">
                                        <img src={movie?.img_url} className="img-fluid" alt="pelicula" />
                                    </div>
                                    <div className="col">
                                        <h3>{movie?.title}</h3>
                                        <p>{movie?.description}</p>
                                        <h6>Elenco principal</h6>
                                        <div className="d-flex justify-content-between card__elenco">
                                            {movie && movie?.actors?.slice(0, 3).map(actor => <img src={rigoImageUrl} className="img-thumbnail" alt={actor.name} title={actor.name} />)}
                                        </div>
                                        <h6 className="mt-2">Puntuacion</h6>
                                        <div className="card border-success mb-3 w-100">
                                            <div className="card-header text-dark fs-6 text"> {movie?.rating}</div>
                                            <div className="card-body text-success">
                                                <p className="card-text">Director:  {movie && movie.directors && movie.directors.length > 0 && movie.directors[0].name}</p>
                                                <p className="card-text">Categoria: {movie?.genres[0].genre_name} </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="alert alert-warning text-center" role="alert">
                                        Si deseas una búsqueda más personalizada, <Link to="/SpecificInformation" className="alert-link">click aquí.</Link>
                                    </div>
                                </div>
                            </nav>
                            {type == "random" && <div className="d-grid">
                                <button type="button" className="btn btn-outline-success fs-4">Generar otra película aleatoria 🎲</button>
                            </div>}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}