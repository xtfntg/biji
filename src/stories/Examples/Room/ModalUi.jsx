import React, { useState } from "react";
import "./ModalUi.scss";

function Modal() {
  return (
    <div class="container">
      <div class="images">
        <img src="http://mistillas.cl/wp-content/uploads/2018/04/Nike-Epic-React-Flyknit-%E2%80%9CPearl-Pink%E2%80%9D-01.jpg" />
      </div>

      <div class="slideshow-buttons">
        <div class="one"> </div>
        <div class="two"> </div>
        <div class="three"> </div>
        <div class="four"> </div>
      </div>

      <p class="pick">选择尺码</p>
      <div class="sizes">
        <div class="size">5</div>
        <div class="size">6</div>
        <div class="size">7</div>
        <div class="size">8</div>
        <div class="size">9</div>
        <div class="size">10</div>
        <div class="size">11</div>
        <div class="size">12</div>
      </div>

      <div class="product">
        <p>女子跑鞋</p>
        <h1>耐克</h1>
        <h2>$150</h2>
        <p class="desc">
          耐克Epic React
          Flyknit泡沫缓冲是反应灵敏而又轻量级，耐用而柔软。这创造了一种感觉，不仅是增强了前进的感觉，而且使跑步感觉很有趣。也是如此。
        </p>
        <div class="buttons">
          <button class="add">添加到购物车</button>
          <button class="like">
            <span>♥</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function PriceTag() {
  return (
    <div className="PriceTag">
      <div name="shitou"></div>
      <div className="ShoppingList">
        <div className="TabTitle">
          <img src="img/chair1.png" />
          <h4>SHOPPINGLIST</h4>
        </div>
        <div className="ListObject">
          <ul>
            <li>XUHD TV</li>
            <li>JAA PRIC</li>
            <li>REA CEE</li>
          </ul>
        </div>
      </div>
      <div className="MyCart">
        <div className="TabTitle">
          <img src="img/chair2.png" />
          <h4>MYCART</h4>
        </div>
        <div className="ListPrice">
          <ul>
            <li>T-Shirt-M</li>
            <li>Green Cabbage</li>
            <li>Drone Battery</li>
          </ul>
          <div className="TotalCost">
            <h3>Total</h3>
            <p>$72.9</p>
          </div>
        </div>
      </div>
      <div className="Tire">
        <h4>Tire & Lube Express</h4>
        <p>On chang in prolres</p>
      </div>
    </div>
  );
}

export default function ModalUi() {
  const [show, setShow] = useState(false);

  const onClick = () => {
    setShow(true);
  };

  return (
    <>
      <div className="place">
        <button
          className="placeOrder"
          onClick={onClick}
          onMouseLeave={() => {
            setShow(false);
          }}
          onMouseMove={() => {
            setShow(true);
          }}
          onPointerOut={() => setShow(false)}
        >
          {show && <PriceTag />}
        </button>
      </div>
    </>
  );
}
