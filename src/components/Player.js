import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlayCircle,
  faPauseCircle,
  faAngleLeft,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const Player = ({
  audioref,
  currentSong,
  isPlaying,
  setIsPlaying,
  songProp,
  setSongProp,
  Songs,
  setCurrentSong,
  setSongs,
}) => {
  //Events
  const activeLib = (newSong) => {
    const newsongs = Songs.map((eachSong) => {
      if (eachSong.id === newSong.id) {
        return { ...eachSong, active: true };
      } else {
        return { ...eachSong, active: false };
      }
    });
    setSongs(newsongs);
  };
  const play = () => {
    if (isPlaying) {
      audioref.current.pause();
      setIsPlaying(false);
    } else {
      audioref.current.play();
      setIsPlaying(true);
    }
  };

  const formatTime = (time) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const drag = (e) => {
    setSongProp({ ...songProp, currentTime: e.target.value });
    audioref.current.currentTime = e.target.value;
  };
  const SkipSong = async (param) => {
    let currentIndex = Songs.findIndex((song) => song.id === currentSong.id);
    if (param === "forward") {
      await setCurrentSong(Songs[(currentIndex + 1) % Songs.length]);
      activeLib(Songs[(currentIndex + 1) % Songs.length]);
    }
    if (param === "back") {
      if (currentIndex === 0) {
        await setCurrentSong(Songs[Songs.length - 1]);
        activeLib(Songs[(currentIndex - 1) % Songs.length]);
      } else {
        await setCurrentSong(Songs[(currentIndex - 1) % Songs.length]);
        activeLib(Songs[(currentIndex - 1) % Songs.length]);
      }
    }
    audioref.current.play();
    setIsPlaying(true);
  };
  //Add styles
  const trackAnime = {
    transform: `translateX(${songProp.animationPercent}%)`,
  };

  //State

  return (
    <div className="player">
      <div className="timecontrol">
        <p>{formatTime(songProp.currentTime)}</p>
        <div
          style={{
            background: `linear-gradient(to right, ${currentSong.color[0]},${currentSong.color[1]})`,
          }}
          className="track"
        >
          <input
            min={0}
            max={songProp.duration || 0}
            value={songProp.currentTime}
            type="range"
            name=""
            id=""
            onChange={drag}
          />
          <div style={trackAnime} className="animate-track"></div>
        </div>
        <p>{songProp.duration ? formatTime(songProp.duration) : "0:00"}</p>
      </div>
      <div className="playcontrol">
        <FontAwesomeIcon
          onClick={() => SkipSong("back")}
          className="Prev"
          icon={faAngleLeft}
          size="3x"
        />
        <FontAwesomeIcon
          onClick={play}
          className="Play"
          icon={isPlaying ? faPauseCircle : faPlayCircle}
          size="3x"
        />
        <FontAwesomeIcon
          onClick={() => SkipSong("forward")}
          className="Next"
          icon={faAngleRight}
          size="3x"
        />
      </div>
    </div>
  );
};
export default Player;
