import './App.css';
import Main from "./Components/FirstScreen/Main";
import Info from "./Components/SecondScreen/Info";
import Summary from "./Components/ThirdScreen/Summary";
import Portfolio from "./Components/FourthScreen/Portfolio";
import Contact from "./Components/FifthScreen/Contact";
import Footer from "./Components/SixthScreen/Footer";

function App() {
  return (
    <div className="App">
      <Main/>
        <Info/>
        <Summary/>
      <Portfolio/>
        <Contact/>
        <Footer/>
    </div>
  );
}

export default App;
