import React from "react";
import {AddCannon} from "./AddCannon";

export default {
    title:"RacingCar/AddCannon",
  coment: AddCannon,
}

const AddCannonLate = (args)=><AddCannon {...args} />;
export const SceneAddCannon = AddCannonLate.bind({})