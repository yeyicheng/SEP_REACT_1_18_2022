import {useEffect, useState} from "react";

export default function Block2({title, text}) {
    const [anchorTarget, setAnchorTarget] = useState(null);
    useEffect(() => {
        setAnchorTarget(document.getElementById("portfolio"));
    }, []);

    return (<div className={'py-5 d-flex col-sm-4 me-3 p-3 flex-column align-items-center justify-content-center bg-black'}>
        <div className={'pt-2 py-5'}>
            <h3 className={'text-white'}>{title}</h3>
            <p className={'text-white'}>{text}</p>
            <div className={'mt-3'}>
                <button
                    onClick={() => {anchorTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });}}
                    className={'text-white px-3 py-2 me-2 bg-transparent'}
                    style={{fontSize: '16pt', width: '90pt', border: "solid 2px white", outline: "none"}}>More</button>
            </div>
        </div>
    </div>)
}