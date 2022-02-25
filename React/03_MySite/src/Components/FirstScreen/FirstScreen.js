import Header from "./Header";
import Background from '../../images/apple-1838564_1920-main.jpg';

export default function FirstScreen() {
    return (<div className={'w-100'}
    style={{background: `linear-gradient(rgba(20, 20, 20, 0.7), rgba(20, 20, 20, 0.7)), url(${Background})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundAttachment: 'fixed',
        height: '100vh'}}>
        <Header/>
        <div className={'text-white d-flex flex-column justify-content-center align-items-center'}
        style={{height: '500px'}}>
            <p style={{fontSize: '28pt'}}>Hello, I'm</p>
            <p style={{fontSize: '100pt'}}>Yicheng Ye</p>
            <p style={{fontSize: '33pt'}}>UI Developer. UX Desinger. Problem Solver.</p>
        </div>
        <div>
            <button className={'text-white px-3 py-2 me-2 bg-transparent'}
                    style={{fontSize: '16pt', width: '90pt', border: "solid 2px white", outline: "none"}}>Info</button>
            <button className={'text-white px-3 py-2 me-2 bg-transparent'}
                    style={{fontSize: '16pt', width: '90pt', border: "solid 2px white", outline: "none"}}>Portfolio</button>
        </div>
    </div>)
}