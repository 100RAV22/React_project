import { useEffect, useState } from "react";
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from 'react-icons/bs'
import './styles.css'

export default function ImageSlider({url, limit, page}){

    const [images, setImages] = useState([]);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [errorMsg, setErrorMsg] = useState(null);
    const [loading, setLoding] = useState(false);
    
    async function fetchImages(getUrl){
        try{
            setLoding(true);
            const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
            const data = await response.json();

            if(data){
                setImages(data);
                setLoding(false);
            }
        }catch(e){
            setErrorMsg(e.message);
            setLoding(false);
        }
    }

    function handlePrevious(){
        setCurrentSlide(currentSlide === 0 ? images.length-1 : currentSlide-1);
    }
    function handleNext(){
        setCurrentSlide(currentSlide === images.length-1 ? 0 : currentSlide+1);
    }

    useEffect(()=>{
        if (url !== ""){
            fetchImages(url);
        } 
    }, [url])

    if(loading){
        return <div>Loading...</div>;
    }
    if(errorMsg){
        return <div>Error: {errorMsg}</div>;
    }

    return <div className="container">
        <BsArrowLeftCircleFill className='arrow arrow-left' onClick={handlePrevious}/>
        {
            images && images.length > 0 
            ? images.map((imageItem,index) =>(
                <img
                key = {imageItem.id}
                alt = {imageItem.download_url}
                src = {imageItem.download_url}
                className = {
                     currentSlide === index ? "current-image" : "current-image hide-current-image"
                 }
                />
            ))
            : null
        }
        <BsArrowRightCircleFill className='arrow arrow-right' onClick={handleNext}/>
        <span className="circle-indictors">
            {
                images && images.length > 0 
                ? images.map((_, index)=>(
                    <button
                        key={index}
                        className={
                            currentSlide === index ? "current-indicator " : "current-indicator inactive-indicator"
                        }
                        onClick={()=>setCurrentSlide(index)}
                    ></button>
                ))
                : null
            }
        </span>
    </div>
}


