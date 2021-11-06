//check if its playing
export const playSong = (isPlaying, setIsPlaying, audioref) => {
  if (true) {
    const playPromise = audioref.current.play();
    if (playPromise !== undefined) {
      playPromise.then((audio) => {
        audioref.current.play();
        setIsPlaying(true);
      });
    }
  }
};
