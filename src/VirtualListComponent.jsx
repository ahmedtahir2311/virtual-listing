import React from "react";
import { data } from "./JsonData";

import { AutoSizer, List } from "react-virtualized";

const VirtualListComponent = () => {
  const rowRenderer = ({ key, index, style }) => {
    return (
      <div key={key} style={style}>
        {data[index].first_name}
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "100%",

              // margin: 10px auto;
              borderTop: "1px solid rgb(203, 210, 217)",
            }}
          />
        </div>
      </div>
    );
  };

  return (
    <div style={{ height: "94vh", overflowY: "auto" }}>
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            rowCount={data.length}
            rowHeight={50}
            rowRenderer={rowRenderer}
            width={width}
          />
        )}
      </AutoSizer>
    </div>
  );
};

export default VirtualListComponent;
