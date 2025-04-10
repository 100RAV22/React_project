import { use, useEffect, useState } from "react"
import './styles.css'



export default function LoadMoreData(){

    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [products, setProducts] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);
    const [disableButton, setDisableButton] = useState(false);

    async function fetchProducts(){
        try{
            setLoading(true);
            const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${count === 0 ? 0 : count*20}`);
            const data = await response.json();

            if(data && data.products && data.products.length){
                setProducts((prevData)=>[...prevData, ...data.products]);
                setLoading(false);
            }
        }catch (e){
            setErrorMsg(e.message);
            setLoading(false);
        }
    }

    useEffect(()=>{
        fetchProducts();
            }, [count]);
    useEffect(()=>{
        if(products && products.length === 100) setDisableButton(true);
    }, [products])

    if(loading){
        return <div>Loading...</div>;
    }
    if(errorMsg){
        return <div>Error: {errorMsg}</div>;
    }



    return (<div className="productLoader-container">
        <div className="product-container">
        {
            products && products.length 
            ?   products.map((productItem)=>(
                <div className='product' 
                    key={productItem.id}>
                    <img 
                        src={productItem.thumbnail}
                        alt={productItem.title}
                    />
                        <p>{productItem.title}</p>
                </div>))
                : null
        }
        </div>
        <div className="button-container">
            <button disabled={disableButton} onClick={()=>setCount(count+1)}>Load More products</button>
            {disableButton ? <p>You have reached to 100 products</p> : null}
        </div>
    </div>
    );
}

