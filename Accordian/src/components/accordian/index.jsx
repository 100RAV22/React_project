import { useState } from 'react'
import data from './data'
import './style.css'

export default function Accordian() {
    const [selected, setSelected] = useState(null);
    const [multiSelected, setMultiSelected] = useState([]);
    const [enableMultipleSelection, setEnableMultipleSelection] = useState(false);

    function handleSingleSelected(getCurrentId){
        console.log(getCurrentId);
        setSelected(getCurrentId === selected ? null : getCurrentId);
    }

    function handleMultiSelected(getCurrentId){
        let cpyMultiSelected = [...multiSelected];
        const findIndexOfCurrId = cpyMultiSelected.indexOf(getCurrentId);
        if(findIndexOfCurrId === -1){
            cpyMultiSelected.push(getCurrentId);
        }else{
            cpyMultiSelected.splice(findIndexOfCurrId, 1);
        }
        setMultiSelected(cpyMultiSelected);
    }

     return <div className='wrapper'>
        <button onClick={()=>setEnableMultipleSelection(!enableMultipleSelection)}>Enable multiple selection</button>
        <div className='accordian'>
            {
                data && data.length > 0 ?
                data.map((dataItem)=><div>{
                        <div className='item'>
                            <div className='title' onClick={enableMultipleSelection ?
                                ()=>handleMultiSelected(dataItem.id)
                                : ()=>handleSingleSelected(dataItem.id)}>
                                <h2>{dataItem.question}</h2>
                                <span>+</span>
                            </div>
                            {
                                enableMultipleSelection ?
                                    multiSelected.indexOf(dataItem.id) !== -1 && (<div className='content'>{dataItem.answer}</div>) :
                                    selected === dataItem.id && (<div className='content'>{dataItem.answer}</div>)
                            }
                            {/* {
                                selected === dataItem.id ? <div className='content'>{dataItem.answer}</div>: null
                            } */}
                        </div>
                    }</div>) 
                :
                <div>data not found</div>
            }
        </div>
     </div>

}