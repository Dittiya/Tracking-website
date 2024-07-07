import { useState } from "react";
const cmsConfigUrl = process.env.PUBLIC_URL + "/cms.json";

function Home() {
  const [image, setImage] = useState("Waiting...");

  async function fetchImage(url) {
    return (await fetch(url)).json();
  }

  fetchImage(cmsConfigUrl).then((resp) => { setImage(resp.showcase.image.url) });

  return (
    <div className='container m-4'>
      Showcase! <br/>

      Try putting this image into the History tab
      <div id="showcase-image">
        <img src={image} alt="showcase"/>
      </div>
    </div>
  );
}

export default Home;
