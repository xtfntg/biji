import React, { useEffect, useRef, useState } from "react";

const CustomInput = React.forwardRef((props, ref) => {
  return <input ref={ref} {...props} />;
});

export function ReactCase() {
  const [input, setInput] = useState("");
  const count = useRef(1);
  const inputRef = useRef();

  useEffect(() => {
    count.current += 1;
  });
  const clickHandler = () => {
    console.log(inputRef.current);
    const value = inputRef.current.value;
    if (!value) {
      input.current.focus();
    } else alert(value);
  };
  return (
    <div>
      <CustomInput
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={clickHandler}>提交</button>
      <hr />
      <div>你已经进入:"{input}"</div>
      <div>重新渲染{count.current}</div>
    </div>
  );
}
