const LibrarySong = ({
  setSongs,
  song,
  Songs,
  setCurrentSong,
  audioref,
  isPlaying,
  setIsPlaying,
}) => {
  //event
  const selectSong = async () => {
    await setCurrentSong(song);

    //Add Active State
    const newsongs = Songs.map((eachSong) => {
      if (eachSong.id === song.id) {
        return { ...eachSong, active: true };
      } else {
        return { ...eachSong, active: false };
      }
    });
    setSongs(newsongs);
    //check if is playing
    audioref.current.play();
    setIsPlaying(true);
  };

  return (
    <div
      onClick={selectSong}
      className={`lib-song ${song.active ? "selected" : ""}`}
    >
      <img alt={song.name} src={song.cover} />
      <div className="song-description">
        <h3>{song.name}</h3>
        <h4>{song.artist}</h4>
      </div>
    </div>
  );
};
export default LibrarySong;
