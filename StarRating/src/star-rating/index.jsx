import { useState } from 'react';
import {FaStar} from 'react-icons/fa';
import './style.css';

export default function StarRating({NoOfStar=5}){

    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);

    function handleClick(getCurrentIndex){
        setRating(getCurrentIndex);
    }
    function handleMove(getCurrentIndex){
        setHover(getCurrentIndex);
    }
    function handleLeave(){
        setHover(rating);
    }

    return <div className='starRating'>
        {
            [...Array(NoOfStar)].map((_,index)=>{
                index += 1;
                return <FaStar 
                    key={index}
                    className= {index <= (hover || rating) ? 'active' : 'inactive' }
                    onClick={()=>handleClick(index)}
                    onMouseMove={()=>handleMove(index)}
                    onMouseLeave={()=>handleLeave()}
                    size={50}
                />
            })
        }
    </div>
}