import { IExercise } from "../types/types";

const getSelectedBodyParts = (array1: any[], array2?: IExercise[]) => {
    if (array1.length > 0 && array2 && array2.length > 0) {
      return array1.filter(object1 => {
        return array2.some(object2 => {
          return object1.id === object2.id;
        });
      });
    } else {
      return [];
    }
  };

  export default getSelectedBodyParts