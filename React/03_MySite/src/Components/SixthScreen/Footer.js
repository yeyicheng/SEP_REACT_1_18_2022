import Icon1 from '../../images/facebook.svg';
import Icon2 from '../../images/linkedin.svg';
import Icon3 from '../../images/pinterest.svg';
import Icon4 from '../../images/email.svg';
import {useEffect, useState} from "react";

export default function Footer() {
    const [anchorTarget1, setAnchorTarget1] = useState(null);
    const [anchorTarget2, setAnchorTarget2] = useState(null);
    const [anchorTarget3, setAnchorTarget3] = useState(null);
    useEffect(() => {
        setAnchorTarget1(document.getElementById("main"));
        setAnchorTarget2(document.getElementById("portfolio"));
        setAnchorTarget3(document.getElementById("contact"));
    }, []);

    return (<div className={'w-100 d-flex flex-column justify-content-center align-items-center text-white px-5 bg-black'}
                 style={{height: '50vh', background: '#3a3a3a'}}>
            <div className={'d-flex mb-2'}>
                <a href="" className={'m-3'} style={{width: '20pt', background: '#8a8a8a'}}><img src={Icon1} className={'w-100 h-100'} alt=""/></a>
                <a href="" className={'m-3'} style={{width: '20pt', background: '#8a8a8a'}}><img src={Icon2} className={'w-100 h-100'} alt=""/></a>
                <a href="" className={'m-3'} style={{width: '20pt', background: '#8a8a8a'}}><img src={Icon3} className={'w-100 h-100'} alt=""/></a>
                <a href="" className={'m-3'} style={{width: '20pt', background: '#8a8a8a'}}><img src={Icon4} className={'w-100 h-100'} alt=""/></a>
            </div>
            <div>
                <p>Phone: XXXXXX Email: XXXXX@gmail.com</p>
            </div>
            <div className={'d-flex justify-content-between w-75 mt-4'}>
                <div>
                    <div>XXXX</div>
                    <div>Copyright © 2021</div>
                    <div>NY</div>
                </div>
                <div className={'d-flex'}>
                    <div onClick={() => {anchorTarget1.scrollIntoView({ behavior: 'smooth', block: 'start' });}}
                         className={'px-5'}
                         style={{cursor: 'pointer'}}>Home</div>
                    <div className={'position-relative px-5'} style={{cursor: 'pointer'}}>
                        <div style={{cursor: 'pointer'}} onClick={() => {anchorTarget2.scrollIntoView({ behavior: 'smooth', block: 'start' });}}>Portfolio</div>
                        <div style={{cursor: 'pointer'}} onClick={() => {anchorTarget2.scrollIntoView({ behavior: 'smooth', block: 'start' });}}>Project1</div>
                        <div style={{cursor: 'pointer'}} onClick={() => {anchorTarget2.scrollIntoView({ behavior: 'smooth', block: 'start' });}}>Project2</div>
                        <div style={{cursor: 'pointer'}} onClick={() => {anchorTarget2.scrollIntoView({ behavior: 'smooth', block: 'start' });}}>Project3</div>
                        <div style={{cursor: 'pointer'}} onClick={() => {anchorTarget2.scrollIntoView({ behavior: 'smooth', block: 'start' });}}>See All</div>
                    </div>
                    <div style={{cursor: 'pointer'}} className={'position-relative px-5'}>
                        <div style={{cursor: 'pointer'}}
                             onClick={() => {anchorTarget3.scrollIntoView({ behavior: 'smooth', block: 'start' });}}>Resume</div>
                        <div style={{cursor: 'pointer'}}
                             onClick={() => {anchorTarget3.scrollIntoView({ behavior: 'smooth', block: 'start' });}}>Download</div>
                    </div>
                    <div style={{cursor: 'pointer'}} className={'px-5'}
                         onClick={() => {anchorTarget3.scrollIntoView({ behavior: 'smooth', block: 'start' });}}>Contact</div>
                </div>
            </div>
        </div>
    )
}