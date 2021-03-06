import React, {useContext} from "react";
import PropTypes from "prop-types";
import API from '../../API';
//styles
import { Wrapper, Content, Text, Mask } from './MovieInfo.styles';
//components
import Thumb from '../Thumb';
import Rate from '../Rate';
//config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../../config';
//images
import EmptyImage from '../../images/no_image.jpg';
import Movie from "../Movie";
//context
import {Context} from '../../context';
const MovieInfo = ({movie})=>{
    const [user] = useContext(Context);

    const handleRating = async (value) =>{
        const rate = await API.rateMovie(user.sessionId, movie.id, value);
        console.log(rate);
    };

    return (
    <Wrapper backdrop={movie.backdrop_path}>
        <Content>
            <Mask>
                <Thumb
                    image={movie.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`:EmptyImage}
                    clickable={false}
                    alt='movie-thumb'
                />
            
            
                <Text>
                    <h1> {movie.title} </h1>
                    <h3>PLOT</h3>
                    <p> {movie.overview} </p>

                    <div className='rating-directors'>
                        <div>
                            <h3>RATING</h3>
                            <div className='score'> {movie.vote_average} </div>
                        </div>
                        <div className='director'>
                            <h3>DIRECTOR {movie.directors.lenth > 1 ? 'S' : ''} </h3>
                            {movie.directors.map(e=>(
                                <p key={e.credit_id}> {e.name} </p>
                            ))}
                        </div>
                    </div>
                    {user &&(
                        <div>
                            <p>Rate Movie</p>
                            <Rate callback={handleRating} />
                        </div>
                    )} 
                    {/* if user not exist, cant rate */}
                    
                </Text>
            </Mask>
        </Content>
    </Wrapper>)
}

MovieInfo.propTypes = {
    movie: PropTypes.object,
}

export default MovieInfo;