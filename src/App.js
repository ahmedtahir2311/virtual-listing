import { useState } from "react";
import VirtualListComponent from "./VirtualListComponent";

import VirtualList from "./VirtualList";

function App() {
  const [toggle, setToggle] = useState(true);
  const [scrollTOp, setScrollTop] = useState(true);
  return (
    <>
      <div style={{ display: "flex" }}>
        <div
          style={{
            height: "100vh",
            width: toggle ? "30%" : "0px",
            backgroundColor: "grey",
            transition: "all 2s ease-in-out",
          }}
        >
          This is the side bar menu
        </div>
        <div
          style={{
            height: "100vh",
            width: toggle ? "70%" : "100%",
            transition: "all 2s ease-in-out",
            backgroundColor: "purple",
          }}
        >
          {scrollTOp && (
            <div
              style={{
                width: "auto",
                background: "#e5e5e5",
                padding: " 10px 30px",
              }}
            >
              <button onClick={() => setToggle((pre) => !pre)}> Toogle</button>
            </div>
          )}

          <div style={{ height: "94vh", overflow: "hidden" }}>
            <VirtualList setListAtTop={setScrollTop} />
          </div>

          {/* <VirtualListComponent /> */}
        </div>
      </div>
    </>
  );
}

export default App;
