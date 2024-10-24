import { useReducer, useEffect } from "react";
import "./styles.css";

const colors = [
  "red",
  "green",
  "blue",
  "yellow",
  "orange",
  "purple",
  "pink",
  "brown",
  "gray",
  "cyan",
  "magenta",
  "lime",
  "indigo",
  "violet",
  "teal",
];
const initialState = [
  // {
  //   id: 0,
  //   color: "red",
  //   isDrag: false,
  //   posX: 10,
  //   posY: 10,
  // },
];

const reducer = (state, action) => {
  switch (action.type) {
    case "addelement":
      let newElement = {
        id: state.length + 1,
        isDrag: false,
        color: colors[Math.floor(Math.random() * colors.length)],
        posX: Math.random() * 200,
        posY: Math.random() * 200,
      };
      return [...state, newElement];

    case "updatePos":
      let { posX, posY } = action.payload;
      return [
        ...state.map((item) =>
          item.isDrag === true ? { ...item, posX, posY } : item
        ),
      ];
    case "dragStart":
      let { id, isDrag } = action.payload;
      if (!id)
        return [
          ...state.map((item) =>
            item.isDrag === true ? { ...item, isDrag } : item
          ),
        ];

      return [
        ...state.map((item) => (item.id === id ? { ...item, isDrag } : item)),
      ];

    default:
      return state;
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleDragStart = (id) => {
    console.log("drag started");
    dispatch({
      type: "dragStart",
      payload: { id, isDrag: true },
    });
  };

  const handleDragStop = () => {
    console.log("drag stoped");
    dispatch({
      type: "dragStart",
      payload: { isDrag: false },
    });
  };

  const handleMouseMove = (e) => {
    dispatch({
      type: "updatePos",
      payload: { posX: e.clientX, posY: e.clientY },
    });
  };

  const handleAddElement = () => {
    dispatch({ type: "addelement" });
  };

  return (
    <div
      onMouseUp={handleDragStop}
      onMouseMove={handleMouseMove}
      className="App"
    >
      <button onClick={() => handleAddElement()}>Add element</button>

      {state.length > 0
        ? state.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: `${item.color}`,
                top: `${item.posY}px`,
                left: `${item.posX}px`,
              }}
              onMouseDown={() => handleDragStart(item.id)}
              className="circle"
            ></div>
          ))
        : ""}
    </div>
  );
}
