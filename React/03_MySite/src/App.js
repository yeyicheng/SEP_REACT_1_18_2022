import './App.css';
import FirstScreen from "./Components/FirstScreen/FirstScreen";
import SecondScreen from "./Components/SecondScreen/SecondScreen";
import ThirdScreen from "./Components/ThirdScreen/ThirdScreen";
import FourthScreen from "./Components/FourthScreen/FourthScreen";
import FifthScreen from "./Components/FifthScreen/FifthScreen";

function App() {
  return (
    <div className="App">
      <FirstScreen/>
        <SecondScreen/>
        <ThirdScreen/>
      <FourthScreen/>
        <FifthScreen/>
    </div>
  );
}

export default App;
