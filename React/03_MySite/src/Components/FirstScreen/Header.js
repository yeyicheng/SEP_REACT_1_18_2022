import Logo from '../../images/logo.svg';

export default function Header() {
    return (<div className={'d-flex justify-content-between align-items-center ps-3 pe-5 py-2'}>
        <div><img src={Logo} alt=""/></div>
        <div className={'d-flex'}>
            <div className={'mx-3 my-1 text-white'}>Home</div>
            <div className={'mx-3 my-1 text-white'}>Portfolio</div>
            <div className={'mx-3 my-1 text-white'}>Contact</div>
        </div>
    </div>)
}