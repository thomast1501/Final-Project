import { useState, useEffect } from "react";
import "./App.css";

// ---- Minecraft Block Card ----
function Block({ name, image, description, hardness, stackSize }) {
  return (
    <div className="Minecraft-blocks">
      <h2>{name}</h2>
      <img src={image} alt={name} />
      <p>{description}</p>
      {hardness !== undefined && <p>Hardness: {hardness}</p>}
      {stackSize && <p>Stack Size: {stackSize}</p>}
    </div>
  );
}

// ---- Search Component ----
function Search() {
  const [name, setName] = useState("Cactus");
  const [block, setBlock] = useState(null);
  const [image, setimage] = useState("");
  const [description, setdescription] = useState("");
  const [hardness, sethardness] = useState("");
  const [stackSize, setstackSize] = useState("");

  async function fetchBlock() {
    try {
      const response = await fetch(
        `https://minecraft-api.vercel.app/api/blocks?name=${name}`
      );

      if (!response.ok) {
        throw new Error("Block not found");
      }

      const data = await response.json();
      const blockData = data[0];

      setBlock(blockData);

      
      setimage(
        blockData.image.startsWith("http")
          ? blockData.image
          : `https://minecraft-api.vercel.app${blockData.image}`
      );

      setdescription(blockData.description);
      sethardness(blockData.hardness);
      setstackSize(blockData.stackSize);
    } catch (error) {
      console.error(error);
      setBlock(null);
    }
  }

  useEffect(() => {
    fetchBlock();
  }, []);

  return (
    <div>
      <h1>Minecraft Block Finder</h1>
      <p>Make Sure to capitalize the first letter!</p>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter block name"
      />

      <button onClick={fetchBlock}>Search</button>

      <Block
        name={name}
        image={image}
        description={description}
        hardness={hardness}
        stackSize={stackSize}
      />
    </div>
  );
}

// ---- App Component ----
function App() {
  return (
    <div className="App">
      <header>
        <img src="MClogo.webp" alt="Minecraft Logo" width={400} />
      </header>
      <Search />
    </div>
  );
}

export default App;
