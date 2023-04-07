import Nav from "./components/Nav";
import Jumbotron from "./components/Jumbotron";
import SoundSection from "./components/SoundSection";
import DisplaySection from "./components/DisplaySection";
import WebGiViewer from "./components/WebgiViewer";
import { useRef } from "react";

function App() {

  const webgiViewerRef=useRef(); //used for the preview of mobile in display-section

  const handlePreview = () =>{
    webgiViewerRef.current.triggerPreview();
  }
  return (
    <div className="App">
      <Nav/>
      <Jumbotron/>
      <SoundSection/>
      <DisplaySection triggerPreview={handlePreview}/>
      <WebGiViewer ref={webgiViewerRef}/>
    </div>
  );
}

export default App;
