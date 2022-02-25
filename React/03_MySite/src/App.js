import './App.css';
import FirstScreen from "./Components/FirstScreen/FirstScreen";
import SecondScreen from "./Components/SecondScreen/SecondScreen";
import ThirdScreen from "./Components/ThirdScreen/ThirdScreen";
import FourthScreen from "./Components/FourthScreen/FourthScreen";
import FifthScreen from "./Components/FifthScreen/FifthScreen";
import SixthScreen from "./Components/SixthScreen/SixthScreen";

function App() {
  return (
    <div className="App">
      <FirstScreen/>
        <SecondScreen/>
        <ThirdScreen/>
      <FourthScreen/>
        <FifthScreen/>
        <SixthScreen/>
    </div>
  );
}

export default App;
