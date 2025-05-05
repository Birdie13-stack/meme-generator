import { useEffect, useState } from "react";

export default function Main() {
  const [memeInfo, setMemeInfo] = useState({
    topText: "One does not simply",
    bottomText: "Walk into Mordor",
    imgUrl: "http://i.imgflip.com/1bij.jpg",
  });

  const [memes, setMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setMemes(data.data.memes));
  }, []);

  //   console.log(memes);

  /**
   * Challenge: Get a random image fr om the array of
   * allMemes when the user clicks the button. Once
   * you've gotten a random image from the array, make
   * sure to write the code that will display that
   * random meme image to the page.
   */

  function getImage() {
    const randomIndex = Math.floor(Math.random() * memes.length);
    let randomImageURL = memes[randomIndex].url;
    setMemeInfo((prev) => ({
      ...prev,
      imgUrl: randomImageURL,
    }));
  }

  //   getImage();

  function handleChange(e) {
    const { value, name } = e.currentTarget;
    setMemeInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <main>
      <div className="form">
        <label>
          Top Text
          <input
            type="text"
            placeholder="One does not simply"
            name="topText"
            value={memeInfo.topText}
            onChange={handleChange}
          />
        </label>

        <label>
          Bottom Text
          <input
            type="text"
            placeholder="Walk into Mordor"
            name="bottomText"
            value={memeInfo.bottomText}
            onChange={handleChange}
          />
        </label>
        <button onClick={getImage}>Get a new meme image 🖼</button>
      </div>
      <div className="meme">
        <img src={memeInfo.imgUrl} />
        <span className="top">{memeInfo.topText}</span>
        <span className="bottom">{memeInfo.bottomText}</span>
      </div>
    </main>
  );
}
