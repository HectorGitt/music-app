const Song = ({ currentSong, isPlaying }) => {
  return (
    <div className="song-cont">
      <img className={ `${isPlaying? "cover-animate": ""}`} alt={currentSong.name} src={currentSong.cover} />
      <h2>{currentSong.name}</h2>
      <h4>{currentSong.artist}</h4>
    </div>
  );
};
export default Song;
