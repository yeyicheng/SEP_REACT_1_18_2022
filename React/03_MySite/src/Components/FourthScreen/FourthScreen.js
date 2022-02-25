import Icon1 from '../../images/developerdesign.svg';
import Icon2 from '../../images/responsivedesign.svg';
import Icon3 from '../../images/innovativesolutions.svg';
import Icon4 from '../../images/passion.svg';
import Block from "../SecondScreen/Block";
import Block2 from "./Block";

export default function FourthScreen() {
    return (<div className={'w-100 d-flex flex-column justify-content-center align-items-center px-5'}
    style={{height: '100vh', background: '#59585d'}}>
        <div style={{fontSize: '28pt'}}
        className={'text-white'}>Projects and Portfolio</div>
        <h3 className={'fst-italic text-white mb-5'}>Sharing my endeavors and passions...</h3>
        <h1 className={'fst-italic text-white mb-5'}/>
        <div className={'d-flex justify-content-center px-5'}>
            <Block2 title={'LUV TALK Website'}
                    text={'Website, created during my first internship, which utilized HTML, CSS, PHP, Ajax, Javascript/jQuery, and Wordpress.'}/>
            <Block2 title={'Personal Website'}
                    text={'Enjoyable side project that was created to experiment with more HTML and CSS, but also provided an outlet to showcase my abilities and interests.'}/>
            <Block2 title={'Strike Zone Analysis'}
                    text={'Data analytics project completed during my time at the Illinois Math and Science Academy which studied the baseball strike zone based on the state of the game.'}/>

        </div>
        <div className={'my-5'}>
            <button className={'text-white px-3 py-2 me-2 bg-transparent'}
                    style={{fontSize: '16pt', width: '140pt', border: "solid 2px white", outline: "none"}}>More Projects</button>
        </div>
    </div>)
}