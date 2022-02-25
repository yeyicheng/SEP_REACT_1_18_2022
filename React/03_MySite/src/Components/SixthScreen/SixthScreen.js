import Icon1 from '../../images/facebook.svg';
import Icon2 from '../../images/linkedin.svg';
import Icon3 from '../../images/pinterest.svg';
import Icon4 from '../../images/email.svg';

export default function SixthScreen() {
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
                    <div className={'px-5'}>Home</div>
                    <div className={'position-relative px-5'}>
                        <div>Portfolio</div>
                        <div>Project1</div>
                        <div>Project2</div>
                        <div>Project3</div>
                        <div>See All</div>
                    </div>
                    <div className={'position-relative px-5'}>
                        <div>Resume</div>
                        <div>Download</div>
                    </div>
                    <div className={'px-5'}>Contact</div>
                </div>
            </div>
        </div>
    )
}