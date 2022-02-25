import Background from '../../images/aboutbackground.jpg';
import {useEffect, useState} from "react";

export default function SecondScreen() {
    const [anchorTarget, setAnchorTarget] = useState(null);
    useEffect(() => {
        setAnchorTarget(document.getElementById("contact"));
    }, []);

    return (<div id="info" className={'w-100 d-flex flex-column justify-content-center align-items-center'}
                 style={{padding: '3% 0',
                     background: `linear-gradient( rgba(225, 225, 225, 0.94), rgba(225, 225, 225, 0.94) ), url(${Background})`,
                     backgroundRepeat: 'no-repeat',
                     backgroundAttachment: 'fixed',
                     backgroundPosition: 'center center',
                     height: '100vh'}}>
        <p style={{fontSize: '34pt'}}>About Me</p>
        <h3 className={'mb-5 fst-italic'}>Sharing a little bit of my story...</h3>
        <p className={'text-sm-start col-sm-8'} style={{fontSize: '24pt'}}>General Overview</p>
        <p style={{fontSize: '12pt'}} className={'text-sm-start d-flex justify-content-center col-sm-8 mb-5'}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>

        <p className={'text-sm-start col-sm-8'} style={{fontSize: '24pt'}}>Statistics</p>
        <h6 className={'text-sm-start col-sm-8 fst-italic mb-4'}>And for those that don't fancy reading:</h6>

        <p className={'text-sm-start col-sm-8 mb-2'} style={{fontSize: '12pt'}}>Male, 200 years old.</p>
        <p className={'text-sm-start col-sm-8 mb-2'} style={{fontSize: '12pt'}}>Five feet 110 inches</p>
        <p className={'text-sm-start col-sm-8 mb-2'} style={{fontSize: '12pt'}}>Favorite fonts:Roboto</p>
        <p className={'text-sm-start col-sm-8 mb-2'} style={{fontSize: '12pt'}}>Loves to learn new things</p>

        <div>
            <button
                onClick={() => {anchorTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });}}
                className={'text-black px-3 py-2 me-2 bg-transparent col-sm-8'}
                style={{fontSize: '16pt', width: '90pt', border: "solid 2px black", outline: "none"}}>Contact</button>
        </div>
    </div>)
}