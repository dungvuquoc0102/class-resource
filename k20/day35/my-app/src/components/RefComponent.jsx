import { useRef, useState } from "react";

// state:
// - Không bị reset mỗi lần re-render
// - Thay đổi giá trị của state sẽ làm component re-render lại
// ref:
// - Không bị reset mỗi lần re-render
// - Có thể trỏ tới một DOM element

export default function RefComponent() {
  const ref = useRef(0);
  let number = 0;
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <button
          onClick={() => {
            setCount(count + 1);
            number++;
            ref.current++;
            console.log("number: " + number);
            console.log("ref.current: " + ref.current);
          }}
        >
          Increament {count}
        </button>
      </div>
    </>
  );
}
