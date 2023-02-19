import React, {
  useState,
  useReducer,
  useEffect,
  useRef,
  useLayoutEffect,
  createContext,
  useContext,
  useMemo,
  useCallback,
} from "react";
import axios from "axios";

/* 5.2用useReducer自定义多个状态逻辑  state(状态), action(动作)*/
const reducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1, showText: state.showText };
    case "toggleShowText":
      return { count: state.count, showText: !state.showText };
    default:
      return state;
  }
};

/*  9.1 !--开始 上下文传参数写法 */
function NineUser({ NineUserName }) {
  return (
    <div>
      <h3>9.useState上下文传参数写法{NineUserName}</h3>
    </div>
  );
}
function NineLogin({ setNineUserName }) {
  return (
    <div>
      <input
        placeholder="9.useState上下文参数样式写法"
        onChange={(e) => {
          setNineUserName(e.target.value);
        }}
      />
    </div>
  );
}

function NineContextTutorial() {
  const [NineUserName, setNineUserName] = useState("");
  return (
    <div>
      <NineUser NineUserName={NineUserName} />
      <NineLogin setNineUserName={setNineUserName} />
    </div>
  );
}
/* 9.1  结束--!*/
/*  10.1 !--开始 createContext(创建内容) useContext(使用内容)*/
function TenUser() {
  const { TenUserName } = useContext(AppContext);
  return (
    <div>
      <h3>10.createContext(创建内容) useContext(使用内容):{TenUserName}</h3>
    </div>
  );
}
function TenLogin() {
  const { setTenUserName } = useContext(AppContext);
  return (
    <div>
      <input
        placeholder="10.createContext(创建内容) useContext(使用内容)"
        onChange={(e) => {
          setTenUserName(e.target.value);
        }}
      />
    </div>
  );
}

const AppContext = createContext(null);
function TenContextTutorial() {
  const [TenUserName, setTenUserName] = useState("");
  return (
    <AppContext.Provider value={{ TenUserName, setTenUserName }}>
      <TenUser />
      <TenLogin />
    </AppContext.Provider>
  );
}
/*  10.1  结束--!*/
/* 12.2 useCallback返回一个记忆化的回调函数,防止组件重新渲染。  */
function Child({ returnComment }) {
  useEffect(() => {
    console.log("Child副作用");
  }, [returnComment]);
  return <div>{returnComment("搜索")}</div>;
}
/*  12.2  结束--!*/
export function ReactHooks() {
  /* 1.1原型思路  结果在控制台输出*/
  let OneCounter = 1;
  const OneIncrement = () => {
    OneCounter = OneCounter + 1;
    console.log(OneCounter);
  };

  /* 2.1useState**计算**基础应用, */
  const [TwoCounter, setTwoCounter] = useState(2);
  const TwoIncrement = () => {
    setTwoCounter(TwoCounter + 1);
  };
  /* 3.1useState**内容**基础应用  */
  const [ThreeCounter, setThreeCounter] = useState("3.");
  const onChange = (e) => {
    setThreeCounter(e.target.value);
  };

  /* 4.1useState**状态重复多种定义**基础应用  */
  const [FourCounter, setFourCounter] = useState(4);
  const [FourShowText, setFourShowText] = useState(true);

  /*  5.1 用useReducer自定义多个状态逻辑 */
  const [FiveState, FiveDispatch] = useReducer(reducer, {
    count: 5,
    showText: true,
  });

  /* 6.1 useEffect副作用组件执行,获取数据、更新计时器等*/
  const [data, setData] = useState("");
  const [SixCount, setSixCount] = useState(6);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((response) => {
        setData(response.data[0].email);
        console.log("API 被调用");
      });
  }, [SixCount]);

  /* 7.1 useRef存储更新时不会导致重新渲染的可变值*/
  const inputRef = useRef();
  const onClick = () => {
    console.log(inputRef.current.value);
  };

  /* 8.1 useLayoutEffect比useEffect执行优先  Popup(弹窗)*/
  const [EightShow, setEightShow] = useState(true);
  const EightPopup = useRef();
  const EightButton = useRef();
  useLayoutEffect(() => {
    if (EightPopup.current == null || EightButton.current == null) return;
    const { bottom } = EightButton.current.getBoundingClientRect();
    EightPopup.current.style.top = `${bottom + 10}px`;
    EightPopup.current.style.background = `#ff0088`;
  }, [EightShow]);
  /* 11.1 useMemo将记忆化视为缓存一个值，这样它就不需要重新计算。 */
  const [ElevenData, setElevenData] = useState(null);
  const [ElevenToggle, setElevenToggle] = useState(false);
  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/comments")
      .then((response) => {
        setElevenData(response.data);
      });
  }, []);

  const findLongestName = (comments) => {
    if (!comments) return null;
    let longestName = "";
    for (let i = 0; i < comments.length; i++) {
      let currentName = comments[i].name;
      if (currentName.length > longestName.length) {
        longestName = currentName;
      }
    }
    return longestName;
  };
  console.log("11.计算结果");

  const getLongestName = useMemo(
    () => findLongestName(ElevenData),
    [ElevenToggle]
  );
  /* 12.1 useCallback返回一个记忆化的回调函数,防止组件重新渲染。 */
  const [TwelveToggle, setTwelveToggle] = useState(false);
  const [TwelveData, setTwelveData] = useState(
    "12useCallback返回一个记忆化的回调函数,防止组件重新渲染"
  );
  const returnComment = useCallback(
    (name) => {
      return TwelveData + name;
    },
    [TwelveData]
  );
  return (
    <div>
      {/* 1.2原型思路 结果在控制台输出*/}
      <h3>{OneCounter}.javascript原型</h3>
      <button onClick={OneIncrement}>1.OneIncrement(原型)</button>
      <br />
      <br />
      {/* 2.2useState**计算**基础应用*/}
      <h3>{TwoCounter}.用useState写计算原型</h3>
      <button onClick={TwoIncrement}>2.计算useState(状态应用)</button>
      <br />
      <br />
      {/* 3.2useState**内容**基础应用*/}
      <h3>{ThreeCounter}用useState写内容输入原型</h3>
      <input placeholder="3.内容useState(状态应用)..." onChange={onChange} />
      <br />
      <br />
      {/* 4.2useState**状态重复多种定义**基础应用 */}
      <h3>{FourCounter}多个useState写法</h3>
      {FourShowText && <p>useState状态重复定义</p>}
      <button
        onClick={() => {
          setFourCounter(FourCounter + 1);
          setFourShowText(!FourShowText);
        }}
      >
        4.CLickHere(点击这里)
      </button>
      <br />
      <br />
      {/* 5.3 用useReducer自定义多个状态逻辑*/}
      <h3>{FiveState.count}useReducer代替useState多个逻辑</h3>
      {FiveState.showText && <p>5.useReducer自定义多个状态逻辑</p>}
      <button
        onClick={() => {
          FiveDispatch({ type: "INCREMENT" });
          FiveDispatch({ type: "toggleShowText" });
        }}
      >
        5.useReducer自定义多个状态逻辑
      </button>
      {/* 6.2 useEffect副作用组件执行的副作用,获取数据、更新计时器等 */}
      <br />
      <br />
      <h3>{SixCount}useEffect副作用组件执行,获取数据、更新计时器等</h3>
      <div>6.useEffect副作用请求到的数据--{data}</div>
      <button onClick={() => setSixCount(SixCount + 1)}>
        6.副作用useEffect
      </button>
      {/* 7.2 useRef存储更新时不会导致重新渲染的可变值*/}
      <br />
      <br />
      <h3>7.useRef使用存储更新时不会导致重新渲染的可变值</h3>
      <input type="text" placeholder="7.Ex..." ref={inputRef} />
      <button onClick={onClick}>7.useRef更改名称</button>
      {/* 8.2 useLayoutEffect比useEffect执行优先  */}
      <br />
      <br />
      <h3>8.useLayoutEffect比useEffect执行优先</h3>
      {EightShow && (
        <div style={{ position: "absolute" }} ref={EightPopup}>
          8.2useLayoutEffect比useEffect执行优先
        </div>
      )}
      <button ref={EightButton} onClick={() => setEightShow((prev) => !prev)}>
        8.2 useLayoutEffect比useEffect执行优先
      </button>
      <br />
      <br />
      <br />
      <br />
      {/*  9.2上下文状态样式 */}
      <NineContextTutorial />
      <br />
      {/* 10.2 createContext*/}
      <TenContextTutorial />
      <br />
      {/* 11.2  useMemo将记忆化视为缓存一个值，这样它就不需要重新计算。*/}
      <div>
        <h3>11.useMemo将记忆化视为缓存一个值,这样它就不需要重新计算</h3>
        11.获取数据
        <i style={{ color: "red" }}>加载一次,点击后不加载二次------</i>
        {/*   11.2.1 getLongestName记忆化 替代{findLongestName(ElevenData)}重复计算写法*/}
        {/*  {findLongestName(ElevenData)} */}
        {getLongestName}
      </div>
      <button
        onClick={() => {
          setElevenToggle(!ElevenToggle);
        }}
      >
        11.useMemo将记忆化视为缓存一个值，这样它就不需要重新计算。
      </button>
      {ElevenToggle && <h3>11.点击后加载</h3>}
      <br />
      <br />
      {/* 12.3 useCallback返回一个记忆化的回调函数,防止组件重新渲染。  */}
      <h3>12.useCallback返回一个记忆化的回调函数,防止组件重新渲染</h3>
      <Child returnComment={returnComment} />
      <button
        onClick={() => {
          setTwelveToggle(!TwelveToggle);
        }}
      >
        useCallback返回一个记忆化的回调函数,防止组件重新渲染
      </button>
      {TwelveToggle && <h3>12.点击后切换</h3>}
    </div>
  );
}
