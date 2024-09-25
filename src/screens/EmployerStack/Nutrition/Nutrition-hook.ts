import {useState, useCallback} from 'react';
import { IFood } from './AvailableNutrition';

export default (navigation) => {
  const [isSelected,setIsSelected]=useState<boolean>(false)
  const days = [{},{},{},{},{},{},{},{},{},{},{
    isToDoExist:{
    toDo1:{
      exist:true
    },
    toDo2:{
      exist:true
    },
    toDo3:{
      ended:true
    }
  }},{
    isToDoExist:{
      toDo1:{
        ended:true
      },
      toDo2:{
        ended:true
      },
      toDo3:{
        ended:true
      }
    }
  },{},{isToDoExist:{
    toDo1:{ 
      ended:true
    },
    toDo2:{
      ended:true
    }}
  },{}]
  const dayIndex=13
  const foods:Array<IFood>=[
    {
    id: 1,
    title: "Chef John's Grilled",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWMCNs3267ukSJI-IKGD3L85GfEM0pq9kr9g&usqp=CAU',
    portion:1,
    kcal: 450
  },
    {
    id: 2,
    title: "Crispy Ground Tostadas",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2VVDdCUVp_qbluxX4nV8Sv4ECtIyhnb15aA&usqp=CAU',
    weight:300,
    kcal: 250
  },
    {
    id: 3,
    title: "Chef John's Grilled",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWMCNs3267ukSJI-IKGD3L85GfEM0pq9kr9g&usqp=CAU',
    portion:1,
    kcal: 450
  },
    {
    id: 4,
    title: "Chef John's Grilled",
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2VVDdCUVp_qbluxX4nV8Sv4ECtIyhnb15aA&usqp=CAU',
    weight:300,
    kcal: 250
  },
  ]
  const leftIconPress = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return {
    leftIconPress,
    isSelected,
    setIsSelected,
    days,
    dayIndex,
    foods
  };
};
