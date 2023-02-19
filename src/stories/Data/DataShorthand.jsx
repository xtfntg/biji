import React, { useEffect, useRef, useState } from "react";

const drinks = {
  茶: {
    part: "叶子",
    caffeine: "15–70 mg/cup",
    age: "4,000+ years",
  },
  咖啡: {
    part: "豆类",
    caffeine: "80–185 mg/cup",
    age: "1,000+ years",
  },
};

function Drink({ name }) {
  const info = drinks[name];
  return (
    <section>
      <h1>{name}</h1>
      <dl>
        <dt>植物的一部分</dt>
        <dd>{info.part}</dd>
        <dt>咖啡因含量</dt>
        <dd>{info.caffeine}</dd>
        <dt>年龄</dt>
        <dd>{info.age}</dd>
      </dl>
    </section>
  );
}

export function DataShorthand() {
  return (
    <div>
      <Drink name="茶" />
      <Drink name="咖啡" />
    </div>
  );
}
