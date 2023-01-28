import React from "react";
import "./Enlightenment.css";
export const Enlightenment = () => {
  return (
    <>
      <section class="header">
        <a href="#" class="logo">
          <h2>旅行</h2>
        </a>
        <div class="toogle">
          <img src="img/toggle.png" alt="" />
        </div>
      </section>

      <section class="banner">
        <img class="fitBg" src="img/banner.jpg" alt="" />
        <div class="content">
          <h2>探索世界</h2>
          <p>
            毋庸置疑的是，这将是一次非常好的机会。你是谁？在此，我想说的是，没有任何地方可以让我们在腐败的道路上走下去，因为我们是被选中的。
            你的名字是什么？
          </p>
          <a class="btn" href="#about">
            了解更多
          </a>
        </div>
      </section>
      <section class="about" id="about">
        <div class="contentBx">
          <h2 class="titleText">感受世界之美</h2>
          <p class="text">
            请注意，这不是一个简单的问题。 涵养,
            名列前茅。毋庸置疑，没有。谦逊的人是不可能的。
            错了，是错了，是错了。 所有的人都不知道该怎么做!详见下文
            纵观全局，我们可以发现，在我们的生活中，有很多事情是需要我们去做的,
            我的意思是说，如果你是一个人，那么你就会有一个错误,
            所有的人都不知道该怎么做!
          </p>
          <a href="#destination" class="btn">
            热门目的地
          </a>
        </div>
        <div class="imgBx">
          <img class="fitBg" src="img/img1.jpg" alt="img1" />
        </div>
      </section>
      <section class="banner2">
        <img src="img/banner2.jpg" class="fitBg" alt="banner2" />
      </section>
      <section class="destination" id="destination">
        <div class="content">
          <h2 class="titleText">世界上最受欢迎的旅游目的地</h2>
          <p class="text">
            毋庸置疑的是，这将是一次非常好的机会。因此巨大损失的身体，以及建筑师的后果
            驱赶，而不是让它成为一个真正的自由人。 是什么？结果是最小的。
          </p>
        </div>
        <div class="destinationList">
          <div class="box">
            <div class="imgBx">
              <img
                class="fitBg"
                src="img/destination1.jpg"
                alt="destination1"
              />
            </div>
            <div class="content">
              <h2>
                目的地一
                <br />
                <span>国家名称</span>
              </h2>
            </div>
          </div>

          <div class="box">
            <div class="imgBx">
              <img
                class="fitBg"
                src="img/destination2.jpg"
                alt="destination1"
              />
            </div>
            <div class="content">
              <h2>
                第一目的地
                <br />
                <span>国家名</span>
              </h2>
            </div>
          </div>

          <div class="box">
            <div class="imgBx">
              <img
                class="fitBg"
                src="img/destination3.jpg"
                alt="destination1"
              />
            </div>
            <div class="content">
              <h2>
                第一目的地
                <br />
                <span>国家名称</span>
              </h2>
            </div>
          </div>
        </div>
        <a href="#" class="btn">
          查看更多
        </a>
      </section>

      <section class="banner3">
        <img class="fitBg" src="img/banner3.jpg" alt="banner3" />
      </section>
      <section class="footer">
        <ul class="sci">
          <li>
            <a href="#">
              <img src="img/facebook.png" alt="" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="img/twitter.png" alt="" />
            </a>
          </li>
          <li>
            <a href="#">
              <img src="img/instagram.png" alt="" />
            </a>
          </li>
        </ul>
        <h4 class="copyrightText">
          版权声明 ©2020<a href="#">在线教程</a>. 版权所有
        </h4>
      </section>
    </>
  );
};
