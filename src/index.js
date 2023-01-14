import "./styles.css";
import { debounce } from "./debounce";

const getToolTipPosition = (
  type,
  clientX,
  clientY,
  toolTipWidth,
  toolTipHeight,
  offset
) => {
  let top = clientY;
  let left = clientX;
  let widthHalf = parseInt(toolTipWidth / 2, 10);
  let heightHalf = parseInt(toolTipHeight / 2, 10);
  switch (type) {
    case "TOP": {
      top = top - toolTipHeight - offset;
      left = left - widthHalf;
      break;
    }
    case "BOTTOM": {
      top = top + offset;
      left = left - widthHalf;
      break;
    }
    case "LEFT": {
      top = top - heightHalf;
      left = left - toolTipWidth - offset;
      break;
    }
    case "RIGHT": {
      top = top - heightHalf;
      left = left + offset;
      break;
    }
    default: {
      break;
    }
  }

  return {
    top,
    left
  };
};

const mouseOutHandle = (event, position) => {
  console.log("mouseout event", event);
  const tooltip = document.getElementById("toolTip");
  tooltip.style.visibility = "hidden";
};
const mouseMoveHandle = (event, position) => {
  console.log("mouse move event", event);
  const tooltip = document.getElementById("toolTip");
  tooltip.style.visibility = "visible";
  const { top, left } = getToolTipPosition(
    position,
    event.clientX,
    event.clientY,
    tooltip.offsetWidth,
    tooltip.offsetHeight,
    10
  );
  tooltip.style.top = top + "px";
  tooltip.style.left = left + "px";
};

(() => {
  let btn1 = document.getElementById("button1");
  let btn2 = document.getElementById("button2");
  let btn3 = document.getElementById("button3");
  let btn4 = document.getElementById("button4");
  // btn1.addEventListener("mouseover", mouseHoverHandle);
  btn1.addEventListener(
    "mouseout",
    debounce((event) => mouseOutHandle(event, "TOP"), 500)
  );
  btn1.addEventListener(
    "mousemove",
    debounce((event) => mouseMoveHandle(event, "TOP"), 10)
  );

  btn2.addEventListener(
    "mouseout",
    debounce((event) => mouseOutHandle(event, "BOTTOM"), 10)
  );
  btn2.addEventListener(
    "mousemove",
    debounce((event) => mouseMoveHandle(event, "BOTTOM"), 10)
  );

  btn3.addEventListener(
    "mouseout",
    debounce((event) => mouseOutHandle(event, "RIGHT"), 10)
  );
  btn3.addEventListener(
    "mousemove",
    debounce((event) => mouseMoveHandle(event, "RIGHT"), 10)
  );

  btn4.addEventListener(
    "mouseout",
    debounce((event) => mouseOutHandle(event, "LEFT"), 10)
  );
  btn4.addEventListener(
    "mousemove",
    debounce((event) => mouseMoveHandle(event, "LEFT"), 10)
  );
})();
