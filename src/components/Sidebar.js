import LibrarySong from "./LibrarySong";
const Sidebar = ({
  Songs,
  setCurrentSong,
  audioref,
  isPlaying,
  setSongs,
  libStatus,
  setIsPlaying,
}) => {
  return (
    <div className={`library ${libStatus ? "active-lib" : ""}`}>
      <h2>Library</h2>
      <div className="lib-songs">
        {console.log(Songs)}
        {Songs.map((song) => (
          <LibrarySong
            Songs={Songs}
            song={song}
            audioref={audioref}
            setCurrentSong={setCurrentSong}
            key={song.id}
            isPlaying={isPlaying}
            setSongs={setSongs}
            setIsPlaying={setIsPlaying}
          />
        ))}
      </div>
    </div>
  );
};
export default Sidebar;
