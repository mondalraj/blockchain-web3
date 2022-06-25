import { useState } from "react";
import { Web3Storage } from "web3.storage";

function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [IPFSUrl, setIPFSUrl] = useState(null);
  const [file, setFile] = useState(null);

  const client = new Web3Storage({
    token: process.env.WEB3_STORAGE_API_KEY,
  });

  const changeHandler = (event) => {
    setSelectedFile(event.target.files);
  };

  const uploadFile = async () => {
    const rootCid = await client.put(selectedFile, {
      name: selectedFile[0].name,
    });
    setIPFSUrl(
      `https://${rootCid}.ipfs.dweb.link/${encodeURI(selectedFile[0].name)}`
    );
    const res = await client.get(rootCid); // Web3Response
    const files = await res.files(); // Web3File[]
    console.log(files[0]);
    setFile(files[0]);
  };

  return (
    <div className="App">
      <h1>IPFS with Web3.storage</h1>
      <input type="file" name="file" onChange={changeHandler} />
      <button onClick={uploadFile}>Upload File</button>
      <br />
      {IPFSUrl && (
        <a href={IPFSUrl} target="_blank">
          View Uploaded Document
        </a>
      )}
      {file && (
        <>
          <h3>Uploaded File details</h3>
          <p>File CID: {file.cid}</p>
          <p>File Name: {file.name}</p>
          <p>File Size: {file.size}</p>
        </>
      )}
    </div>
  );
}

export default App;
