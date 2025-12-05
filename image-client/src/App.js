import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const searchImage = async () => {
    const res = await fetch(`/api/getImage?name=${name}`);
    const data = await res.json();
    setImage(data.url);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(`/api/upload?name=${name}`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setMsg(data.msg);
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Search for an Image</h2>

      <input
        placeholder="tom"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button onClick={searchImage}>Show Image</button>

      <br /><br />
      {image && <img src={image} width="250" alt="" />}

      <hr />

      <h2>Upload / Replace Image</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadImage}>Upload</button>

      <p>{msg}</p>
    </div>
  );
}

export default App;
