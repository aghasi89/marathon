import {useState,useCallback,useEffect} from 'react';
import { useRoute } from '@react-navigation/native';
import { ISelectedDatePhotos } from '../..';

export default (navigation)=>{
    const route=useRoute()
    const [selectedCategory,setSelectedCategory]=useState<string>('front')
    const [selectedDay,setselectedDay]=useState<any>()//<any> should be changed when we know the final structure of days
    const {selectedIndex,title}:ISelectedDatePhotos=route?.params??{} 
    const [newIndex,setNewIndex] =useState<number>()
    const days = [{
        date:'June 20',
        comments:[
          {
            id:1,
            title:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical'
          },
          {
            id:2,
            title:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical'
          },
          {
            id:3,
            title:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical'
          }
        ]
      },{ 
        date:'June 21',
        comments:[
          {
            id:1,
            title:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical'
          },
          {
            id:2,
            title:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical'
          },
          {
            id:3,
            title:'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical'
          }
        ],
        images:{
        front:'https://www.ixbt.com/img/n1/news/2021/5/2/gym-fitness-girl-workout_large.jpg',
        side:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmg4WvpJOeVnQJveQ_i0Xy1MeIKZnvr5kWEDXpncJjg0NE9KNjfMDG34hB9pn30Fg240g&usqp=CAU',
      }},{
        date:'June 22',
        images:{
          front:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxvVIhKbkiwLNHIX3W795JRZsOOWg_o8VqaA&usqp=CAU',
          back:'https://img.freepik.com/premium-photo/beautiful-athletic-woman-sportswear-posing-standing-back-showing-her-perfect-body-background-gym-image-muscular-female-posing-against-black-closeup_116317-15793.jpg',
        }
      },{},{ 
        date:'June 23',
        images:{
        front:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUbXjCs6yL1d84SdDEl4vFf_yh3q9vHQewAg&usqp=CAU',
        back:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN_jNg4tng82jSBiY8vpLwXcIbkwlBoHZoqQ&usqp=CAU',
      }},{},{},{},{},{},{
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
    useEffect(()=>{
        if(selectedIndex&&title){
            setNewIndex(selectedIndex)
            setselectedDay(days[selectedIndex])
            title!=='all'&&setSelectedCategory(title)
        }
    },[selectedIndex,title])
    const onCategorySelect= useCallback((name:string)=>{
        setSelectedCategory(name)
    },[])
    const leftIconPress=useCallback(()=>{
        navigation.goBack()
    },[navigation])
    const onDateArrowsPress=useCallback((action:string)=>{
        let index:number
        if (action==='next'&&newIndex) {
        index=days.findIndex((day,index)=>{
            if (day.images!==undefined&&index>newIndex) {
                setNewIndex(index)
                return true
            }
            return false
        })        
        index>0&&setselectedDay(days[index])
        }else if(action==='previos'&&newIndex){
            index=newIndex-1
           do{
            if (days[index].images!==undefined) {
                setNewIndex(index)
                setselectedDay(days[index])
                break
            }
            index--
           }while( index>=0)
        }
    },[newIndex,days])
    const onCommentIconPress = useCallback(()=>{
      const index = days.findIndex((day)=>day.date===selectedDay.date)
      navigation.navigate('SelectedDateComments',{dateIndex:index})

    },[navigation,days,selectedDay])
    return{
        leftIconPress,
        selectedCategory,
        onCategorySelect,
        selectedDay,
        onDateArrowsPress,
        onCommentIconPress
    }
}