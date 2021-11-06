//import state
import { useState, useRef } from "react";

//import styles
import "./styles/app.scss";

//import components
import Song from "./components/Song";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import Nav from "./components/Nav";
import data from "./data";

function App() {
  const timeUpdate = (e) => {
    const current = e.target.currentTime;
    const duration = e.target.duration;
    const animation = Math.round(
      (Math.round(current) / Math.round(duration)) * 100
    );
    setSongProp({
      ...songProp,
      currentTime: current,
      duration,
      animationPercent: animation,
    });
  };

  //Ref
  const audioref = useRef(null);

  //state
  const [Songs, setSongs] = useState(data());
  const [currentSong, setCurrentSong] = useState(Songs[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [songProp, setSongProp] = useState({
    currentTime: 0,
    duration: 0,
    animationPercent: 0,
  });
  const [libStatus, setLibStatus] = useState(false);

  const songEnd = async () => {
    let currentIndex = Songs.findIndex((song) => song.id === currentSong.id);
    await setCurrentSong(Songs[(currentIndex + 1) % Songs.length]);
    audioref.current.play();
  };
  return (
    <div className={`App ${libStatus ? "lib-active" : ""}`}>
      <Nav libStatus={libStatus} setLibStatus={setLibStatus} />
      <Song currentSong={currentSong} isPlaying={isPlaying} />
      <Player
        audioref={audioref}
        currentSong={currentSong}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        songProp={songProp}
        setSongProp={setSongProp}
        Songs={Songs}
        setCurrentSong={setCurrentSong}
        setSongs={setSongs}
      />
      <Sidebar
        Songs={Songs}
        setCurrentSong={setCurrentSong}
        audioref={audioref}
        isPlaying={isPlaying}
        setSongs={setSongs}
        libStatus={libStatus}
        setIsPlaying={setIsPlaying}
      />
      <audio
        onTimeUpdate={timeUpdate}
        ref={audioref}
        onLoadedMetadata={timeUpdate}
        src={currentSong.audio}
        onEnded={songEnd}
      ></audio>
    </div>
  );
}

export default App;
