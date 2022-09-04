import { useState } from "react";

function PreviewImage() {
  const [currentImg, setCurrentImg] = useState();

  const changeImg = (e) => {
    if (e.target.files && e.target.files.length > 0)
      setCurrentImg(e.target.files[0]);
  }

  return (
    <div className="container m-4">
      <label for="image-file" className="mr-4">Upload image</label>
      <input id="image-file" type="file" onChange={changeImg}></input>
      {currentImg && (
        <div className="container w-1/2">
          <label className="text-2xl">Preview Image</label>
          <img src={URL.createObjectURL(currentImg)} alt="alt" />
        </div>
      )}
    </div>
  );
}

export default PreviewImage;
