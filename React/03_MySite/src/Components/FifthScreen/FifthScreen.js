import {Form} from "react-bootstrap";

export default function FifthScreen() {
    return (<div className={'w-100 d-flex flex-column justify-content-center align-items-center text-white px-5'}
    style={{height: '100vh', background: '#3a3a3a'}}>
        <p style={{fontSize: '28pt'}} className={'mb-5'}>Contact</p>
        <div className={'d-flex justify-content-between px-5'}>
            <div className={'col-sm-6 text-sm-start px-5'}>
                <h2>Reaching out to me
                </h2>
                <p>Don't be afraid to contact me! I'm happy to answer any questions, provide more information, or just have a nice conversation! Fill out the form below to being reaching out to me. If you prefer another email client other than your default, which will appear after clicking the button and have all of the information you just entered, you can email me at XXXXX.
                </p>
                <h2>Contact Information
                </h2>
                <p className={'mb-1'}>XXXX</p>
                <p className={'mb-1'}>XXXX</p>
                <p className={'mb-1'}>(XXXX)-445-7747</p>
                <p className={'mb-1'}>XXXXXX@gmail.com</p>
            </div>
            <div className={'d-flex justify-content-between px-5'}>
                <div className={'text-sm-start px-5'}>
                    <div className={'d-flex'}>
                        <Form.Group className="mb-3 col-sm-6 me-1" controlId="formBasicFirst">
                            <Form.Label>First Name *</Form.Label>
                            <Form.Control type="text" placeholder="" />
                        </Form.Group>
                        <Form.Group className="mb-3 col-sm-6 ms-1" controlId="formBasicLast">
                            <Form.Label>Last Name *</Form.Label>
                            <Form.Control type="text" placeholder="" />
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Group className="mb-3 col-sm-12" controlId="formBasicEmail">
                            <Form.Label>Email *</Form.Label>
                            <Form.Control type="text" placeholder="" />
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Group className="mb-3 col-sm-12" controlId="formBasicMessage">
                            <Form.Label>Message *</Form.Label>
                            <textarea rows={2} className={'w-100'} style={{borderRadius: '.25rem'}}/>
                        </Form.Group>
                    </div>
                    <div className={'d-flex justify-content-center'}>
                        <button className={'text-white mt-5 px-3 py-2 bg-transparent'}
                                style={{fontSize: '16pt', width: '90pt', border: "solid 2px white", outline: "none"}}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    </div>)
}