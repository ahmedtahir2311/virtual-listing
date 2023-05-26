import React, { useRef } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";

import { AutoSizer } from "react-virtualized";

import { faker } from "@faker-js/faker";

const randomNumber = (min, max) => faker.number.int({ min, max });

const sentences = new Array(10000)
  .fill(true)
  .map(() => faker.lorem.sentence(randomNumber(20, 70)));

function VirtualList({ setListAtTop }) {
  const parentRef = useRef();

  const count = sentences.length;
  const virtualizer = useVirtualizer({
    count,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
  });

  const items = virtualizer.getVirtualItems();

  const handleListScroll = () => {
    const scrollTop = parentRef.current.scrollTop;
    setListAtTop(scrollTop === 0);
  };

  const Row = ({ virtualRow }) => {
    return (
      <div
        key={virtualRow.key}
        data-index={virtualRow.index}
        ref={virtualizer.measureElement}
        className={virtualRow.index % 2 ? "ListItemOdd" : "ListItemEven"}
      >
        <div style={{ padding: "10px 0" }}>
          <div>Row {virtualRow.index}</div>
          <div>{sentences[virtualRow.index]}</div>
        </div>
      </div>
    );
  };

  return (
    <AutoSizer
      onResize={({ width, height }) => {
        console.log({ height, width });
      }}
    >
      {({ height, width }) => (
        <div
          ref={parentRef}
          className="List"
          style={{
            height: height,
            width: width,
            overflowY: "auto",
            contain: "strict",
          }}
          onScroll={handleListScroll}
        >
          <div
            style={{
              height: virtualizer.getTotalSize(),
              width: "100%",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${items[0].start}px)`,
              }}
            >
              {items.map((virtualRow) => (
                <Row virtualRow={virtualRow} key={virtualRow.key} />
              ))}
            </div>
          </div>
        </div>
      )}
    </AutoSizer>
  );
}

export default VirtualList;
