import './App.css';
import DrumPad from './components/drumpad.jsx';
import SwitchButton from './components/switch';
import Display from './components/display.jsx';
import {useState, useEffect} from 'react';

function App() {

  const[power, setPower] = useState(true);
  const[display, setDisplay] = useState(" ");
  const [volumen, changeVolume] = useState(15);
  const[bank, setBank] = useState(false);
  
  const regex = /[qweasdzxc]/gi;

  useEffect(() => {
    if(!bank && power){
      document.getElementById("bank").style.float = "left";
    }else if(bank && power){
      document.getElementById("bank").style.float = "right";
    }}, [bank, power, volumen])

  const  triggerKey = (e) =>{
    try{
    let btn = document.getElementById(e.key.toUpperCase()).parentElement;
    if(power){
      if(regex.test(e.key)){
        setDisplay(btn.id);
        btn.style.cssText ="background-color:orange;box-shadow:orange 0px 3px";
        btn.lastElementChild.volume = (volumen / 100);
        btn.lastElementChild.currentTime = 0;
        btn.lastElementChild.play();
        setTimeout(() =>{
          btn.style.cssText ="background-color:gray;box-shadow:black 3px 3px 5px";
        }, 100)
      }
    }}catch(err){
      console.clear()
    }
  }

    document.addEventListener("keyup", triggerKey, true)
    

    const click =(e) =>{
     if(power){
      let sound = e.target.lastElementChild;
      setDisplay(e.target.id);
      e.target.style.cssText ="background-color:orange;box-shadow:orange 0px 3px"
      sound.volume = (volumen / 100);
      sound.currentTime = 0;
      sound.play();
       setTimeout(() =>{
        e.target.style.cssText ="background-color:gray;box-shadow:black 3px 3px 5px"
       }, 100)
       }
    }

  return (
    <div id="drum-machine">
      <div id="pad-bank">
        <DrumPad index="q" ident={!bank ? "Heater 1" : "Chord 1"} handleKey={triggerKey}  handleClick={click} sounds={!bank ? "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3" 
        :"https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"}>
          Q
        </DrumPad>
        <DrumPad index="2" ident={!bank ? "Heater 2" : "Chord 2"} handleKey={triggerKey} handleClick={click} sounds={!bank ? "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3" 
        :"https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"}>
          W
        </DrumPad>
        <DrumPad index="3" ident={!bank ? "Heater 3" : "Chord 3"} handleKey={triggerKey} handleClick={click} sounds={!bank ? "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3" 
        :"https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"}>
          E
        </DrumPad>
        <DrumPad index="4" ident={!bank ? "Heater 4" : "Shaker"} handleKey={triggerKey} handleClick={click} sounds={!bank ? "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3" 
        :"https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"}>
          A
        </DrumPad>
        <DrumPad ident={!bank ? "Clap" : "Open HH"} handleKey={triggerKey} handleClick={click} sounds={!bank ? "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3" 
        :"https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"}>
          S
        </DrumPad>
        <DrumPad ident={!bank ? "Open HH" : "Closed HH"} handleKey={triggerKey} handleClick={click} sounds={!bank ? "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3" 
        :"https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"}>
          D
        </DrumPad>
        <DrumPad ident={!bank ? "Kick n' Hat" : "Punchy Kick"} handleKey={triggerKey} handleClick={click} sounds={!bank ? "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" 
        :"https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"}>
          Z
        </DrumPad>
        <DrumPad ident={!bank ? "Kick" : "Side Stick"} handleKey={triggerKey} handleClick={click} sounds={!bank ? "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3" 
        :"https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"}>
          X
        </DrumPad>
        <DrumPad ident={!bank ? "Closed HH" : "Snare"} handleKey={triggerKey} handleClick={click} sounds={!bank ? "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3" 
        :"https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"}>
          C
        </DrumPad>
      </div>

      <div id='controls-container'>
        <SwitchButton estilo={power ? {float: "right"} : {float: "left"}} status={()=>{
          if(power){
            setPower(false); 
            setDisplay("");
          }else{
            setPower(true);
            setDisplay("");
          };
  
          }}>Power</SwitchButton>
      <Display>{display}</Display>
      <div className='volumen-slider'>
        <input type="range" step="1" min="0" max="100" value={volumen} 
            onChange={e => {
              changeVolume(e.target.value);
              setDisplay(e.target.value);
              setTimeout(() =>{
                setDisplay(" ")
              }, 2000)
              clearTimeout()
            }} />
      </div>
      <SwitchButton ident="bank" 
      status={()=> {
        if(bank && power){
          setBank(false);
          setDisplay("Heater Kit");
            }else if(!bank && power){
              setBank(true); 
              setDisplay("Smooth Piano Kit");
                }}}>Bank</SwitchButton>
      </div>
      </div>
  );
}

export default App;
