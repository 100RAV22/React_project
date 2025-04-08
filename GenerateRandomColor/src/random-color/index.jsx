import { useEffect, useState } from "react"

export default function RandomColor() {
    const [typeOfColor, setTypeOfColor] = useState('hex');
    const [color, setColor] = useState('#ffffff');

    useEffect(()=>{
        if(typeOfColor === 'hex'){
            handleCreateRandomHexColor();
        }else {
            handleCreateRandomRgbColor();
        }
    },[typeOfColor]);

    function randomColorUtility(length) {
        return Math.floor(Math.random() * length);
    }

    function handleCreateRandomHexColor() {
        const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
        let hexColor = '#';
        for (let i = 0; i < 6; i++) {
            hexColor += hex[randomColorUtility(hex.length)];
        }
        setColor(hexColor);
    }

    function handleCreateRandomRgbColor() {
        let r = randomColorUtility(256);
        let g = randomColorUtility(256);
        let b = randomColorUtility(256);
        setColor(`rgb(${r}, ${g}, ${b})`);
    }

    return <div className="container"
        style={{
            backgroundColor: color,
            height: "100vh",
            width: "100vw",
        }}
    >
        <button onClick={() => setTypeOfColor('rgb')}>Generate RGB color</button>
        <button onClick={() => setTypeOfColor('hex')}>Generate HEX color</button>
        <button onClick={typeOfColor === 'hex' ? handleCreateRandomHexColor : handleCreateRandomRgbColor}>Generate Random color</button>

        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#ffffff',
            fontSize: '50px',
            marginTop: '50px',
        }}>
            <h3>{typeOfColor === 'rgb' ? 'RGB Color' : 'HEX Color'}</h3>
            <h2>{color}</h2>
        </div>
    </div>
}