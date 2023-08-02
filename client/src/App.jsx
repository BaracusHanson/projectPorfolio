import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import Navbar from "./components/Navbar";
import { useState, createContext } from "react";
import { ScrollControls } from "@react-three/drei";

export const ctx = createContext(null);
function App() {
  const [theme, setTheme] = useState("light");
  function handleTheme() {
    console.log(theme);
    setTheme((preTheme) => (preTheme === "light" ? "dark" : "light"));
  }
  return (
    <>
      <ctx.Provider value={{ theme, handleTheme }}>
        {/* <div id={theme}>
          <Navbar />
        </div> */}
        <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
          <color
            attach="background"
            args={[`${theme === "light" ? "#fefefe" : "#222222"}`]}
          />

          <Experience />
        </Canvas>
      </ctx.Provider>
    </>
  );
}

export default App;
