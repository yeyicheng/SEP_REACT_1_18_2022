import Logo from '../../images/logo.svg';
import {useEffect, useState} from "react";

export default function Header() {
    const [anchorTarget1, setAnchorTarget1] = useState(null);
    const [anchorTarget2, setAnchorTarget2] = useState(null);
    const [anchorTarget3, setAnchorTarget3] = useState(null);
    useEffect(() => {
        setAnchorTarget1(document.getElementById("main"));
        setAnchorTarget2(document.getElementById("portfolio"));
        setAnchorTarget3(document.getElementById("contact"));
    }, []);

    return (<div className={'d-flex justify-content-between align-items-center ps-3 pe-5 py-2'}>
        <div><img src={Logo} alt=""/></div>
        <div className={'d-flex'}>
            <button
                onClick={() => {anchorTarget1.scrollIntoView({ behavior: 'auto', block: 'start' });}}
                className={'mx-3 my-1 text-white bg-transparent'}
                style={{outline: "none", border: "none"}}>Home</button>
            <button
                onClick={() => {anchorTarget2.scrollIntoView({ behavior: 'auto', block: 'start' });}}
                className={'mx-3 my-1 text-white bg-transparent'}
                style={{outline: "none", border: "none"}}>Portfolio</button>
            <button
                onClick={() => {anchorTarget3.scrollIntoView({ behavior: 'auto', block: 'start' });}}
                className={'mx-3 my-1 text-white bg-transparent'}
                style={{outline: "none", border: "none"}}>Contact</button>
        </div>
    </div>)
}