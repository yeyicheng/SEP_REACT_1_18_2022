import Icon1 from '../../images/developerdesign.svg';
import Icon2 from '../../images/responsivedesign.svg';
import Icon3 from '../../images/innovativesolutions.svg';
import Icon4 from '../../images/passion.svg';
import Block from "../SecondScreen/Block";

export default function ThirdScreen() {
    return (<div className={'w-100 d-flex flex-wrap justify-content-center align-items-center bg-black'}
    style={{height: '75vh'}}>
        <div className={'w-100 d-flex justify-content-center'}>
        <Block title={'Development and Design'}
    text={'I aim to put my creativity to the test, designing and building unique, meaningful products for clients or merely for my own interests.'}
        icon={Icon1}/>
        <Block title={'Responsive Layouts'}
               text={'Development and design isn\'t merely putting information on the site or preferred media outlet. I organize content and present information in an engaging fashion, driving new and unique layouts in tandem with novel solutions and cool animations.'}
               icon={Icon2}/>
        </div>
        <div className={'w-100 d-flex justify-content-center'}>
        <Block title={'Ideas and Solutions'}
               text={'There are still many problems that exist in today\'s society, including laziness. Luckily, I hope to combat these issues by innovating, developing easy-to-use programs, solutions, or products.'}
               icon={Icon3}/>
        <Block title={'Passion and Dedication'}
               text={'With my profound interest and commitment to my field of study, my projects rarely go unfinished and my problems are never left unresolved.'}
               icon={Icon4}/>
        </div>
    </div>)
}