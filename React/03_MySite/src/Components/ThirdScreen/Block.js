export default function Block({icon, title, text}) {
    return (<div className={'d-flex col-sm-4 align-items-start me-5'}>
        <div className={'me-4 col-sm-2'}><img src={icon} alt="" className={'w-100 h-100'}/></div>
        <div className={'pt-2 text-sm-start'}>
            <h3 className={'text-white'}>{title}</h3>
            <p className={'text-white'}>{text}</p>
        </div>
    </div>)
}