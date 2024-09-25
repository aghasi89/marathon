import { useCallback, useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import { ISelectedDateComments } from '../..'

export default  (navigation)=> {
  const route = useRoute()
  const [selectedDay,setSelectedDay]=useState<any>()//<any> should be changed when we know the final structure of day
  const [newComment,setNewComment]=useState<string>('')
  const selectedDate:ISelectedDateComments|undefined= route?.params
  const myUserId= 1
  const days :any= [{
    date:'June 20',
    comments:[
      {
        userId:1,
        title:'Contrary to popular belief, Lorem Ipsum is not simply random text'
      },
      {
        userId:1,
        title:'Contrary to popular belief, Lorem Ipsum is not simply random text'
      },
      {
        userId:2,
        title:'Contrary to popular belief, Lorem Ipsum is not simply random text'
      },
      {
        userId:2,
        title:'Contrary to popular belief, Lorem Ipsum is not simply random text'
      },
      {
        userId:1,
        title:'Contrary to popular belief, Lorem Ipsum is not simply random text'
      },
      {
        userId:2,
        title:'Contrary to popular belief, Lorem Ipsum is not simply random text'
      }
    ]
  },{ 
    date:'June 21',
    comments:[
      {
        userId:1,
        title:'Contrary to popular belief, Lorem Ipsum is not simply random text'
      },
      {
        userId:1,
        title:'Contrary to popular belief, Lorem Ipsum is not simply random text'
      },
      {
        userId:2,
        title:'Contrary to popular belief, Lorem Ipsum is not simply random text'
      },
      {
        userId:2,
        title:'Contrary to popular belief, Lorem Ipsum is not simply random text'
      },
      {
        userId:1,
        title:'Contrary to popular belief, Lorem Ipsum is not simply random text'
      },
      {
        userId:2,
        title:'Contrary to popular belief, Lorem Ipsum is not simply random text,Contrary to popular belief, Lorem Ipsum is not simply random text Contrary to popular belief, Lorem Ipsum is not simply random text'
      }
    ],
    images:{
    front:'https://www.ixbt.com/img/n1/news/2021/5/2/gym-fitness-girl-workout_large.jpg',
    side:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmg4WvpJOeVnQJveQ_i0Xy1MeIKZnvr5kWEDXpncJjg0NE9KNjfMDG34hB9pn30Fg240g&usqp=CAU',
  }},{
    date:'June 22',
    comments:[],
    images:{
      front:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxvVIhKbkiwLNHIX3W795JRZsOOWg_o8VqaA&usqp=CAU',
      back:'https://img.freepik.com/premium-photo/beautiful-athletic-woman-sportswear-posing-standing-back-showing-her-perfect-body-background-gym-image-muscular-female-posing-against-black-closeup_116317-15793.jpg',
    }
  },{},{ 
    date:'June 23',
    comments:[],
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
      if (selectedDate?.dateIndex&&!selectedDay) {
        setSelectedDay(days[days.findIndex((day,index)=>index===selectedDate.dateIndex)])
      }
    },[selectedDate,selectedDay])
const leftIconPress=useCallback(()=>{
 navigation.goBack()
},[])
const checkComentUser = useCallback((id:number)=>{
  if (id===myUserId) {
    return true
  }
  return false
},[myUserId])
const onAddComment = useCallback((text:string)=>{
  setNewComment(text)
},[])
const onSendCommentIconPress = useCallback(()=>{
  let newDays=[...days]
  const selectedDayIndex=selectedDate?.dateIndex
  if (selectedDayIndex&&newComment.length>0) {
    newDays.splice(selectedDayIndex,1,{...newDays[selectedDayIndex],comments:[...newDays[selectedDayIndex].comments,{
      userId:myUserId,
      title:newComment
    }]})
    setSelectedDay(newDays[selectedDayIndex])
    setNewComment('')
  }
},[newComment,selectedDate,days,myUserId])
  return {
    leftIconPress,
    days,
    selectedDay,
    checkComentUser,
    onAddComment,
    newComment,
    onSendCommentIconPress,
    myUserId
  }
}
