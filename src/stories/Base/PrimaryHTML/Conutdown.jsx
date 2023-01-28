import React from "react";
import "./Conutdown.css";

export const Conutdown = () => {
  return (
    <h1 id="time">
      距离年底还剩<span>0</span>天<span>00</span>小时<span>0</span>分钟
      <span>00</span>秒
    </h1>
  );
};

export const Mbb = () => {
  return <>你是我的</>;
};

export const TaoBao = () => {
  return (
    <>
      <div id="top">
        <i class="iconfont icon-tao"></i>
        <a href="" class="search">
          <i class="iconfont icon-fangdajing"></i>寻找宝贝店铺
        </a>
      </div>
      <img src="images/tb.jpg" class="flash" />
      <ul id="icolist">
        <li>
          <img src="images/tm/1.png" />
          <a>天猫</a>
        </li>
        <li>
          <img src="images/tm/2.png" />
          <a>聚划算</a>
        </li>
        <li>
          <img src="images/tm/3.png" />
          <a>天猫国际</a>
        </li>
        <li>
          <img src="images/tm/4.png" />
          <a>外卖</a>
        </li>
        <li>
          <img src="images/tm/5.png" />
          <a>天猫超市</a>
        </li>
        <li>
          <img src="images/tm/6.png" />
          <a>充值中心</a>
        </li>
        <li>
          <img src="images/tm/7.png" />
          <a>飞猪旅行</a>
        </li>
        <li>
          <img src="images/tm/8.png" />
          <a>领金币</a>
        </li>
        <li>
          <img src="images/tm/9.png" />
          <a>拍卖</a>
        </li>
        <li>
          <img src="images/tm/10.png" />
          <a>分类</a>
        </li>
      </ul>
      <div id="first">
        <img src="images/tao.png" class="left" />
        <span class="center">资讯</span>
        <p class="right">华为全面屏强机荣耀Note 9曝光:新CPU加持</p>
      </div>
    </>
  );
};

export const Tab = () => {
  return <>你是我的</>;
};

export const Header = () => {
  return (
    <div class="wrapper">
      <div class="sides">
        <div class="side robot">
          <h2 class="name">气球</h2>
          <div class="emoji">🎈</div>
        </div>
        <div class="versus">
          <span>vs.</span>
        </div>
        <div class="side alien">
          <h2 class="name">鱼旗</h2>
          <div class="emoji">🎏</div>
        </div>
      </div>
    </div>
  );
};
