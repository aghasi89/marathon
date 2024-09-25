import { useCallback, useEffect, useState } from 'react'
import { User } from '../SharingTab-hook'

export default (navigation)=> {
    const [selectedUser,setSelectedUser]=useState<User|undefined>()
    const [tabIndex,setTabIndex] = useState<number>(0)
    const userList=[
        {
        id:1,
        name:'Olivie Gibson',
        period:{
            start:'08 January 2020',
            end:'08 June 2021'
        },
        accessibleInfo:{
            activity: true,
            bodyFat: false,
            calories: false,
            measurements: true,
            photoProgress: false,
            water: true,
            weight: false,
        },
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQD6U_uHR5ytNPmfsEkqRt_U6f9U9kMQ2wI1_Vq21X9jVN1CsEdIzNwKXttAMNrm_xclU&usqp=CAU'
        },
        {
        id:2,
        name:'Maya Crouch',
        period:{
            start:'08 January 2020',
            end:'08 June 2021'
        },
        accessibleInfo:{
            activity: false,
            bodyFat: false,
            calories: false,
            measurements: true,
            photoProgress: false,
            water: true,
            weight: false,
        },
        image:'https://dwpdigital.blog.gov.uk/wp-content/uploads/sites/197/2016/07/P1090594-1.jpeg'
        },
        {
        id:3,
        name:'Olivie Gibson',
        period:{
            start:'08 January 2020',
            end:'08 June 2021'
        },
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQD6U_uHR5ytNPmfsEkqRt_U6f9U9kMQ2wI1_Vq21X9jVN1CsEdIzNwKXttAMNrm_xclU&usqp=CAU'
        },
        {
        id:4,
        name:'Maya Crouch',
        period:{
            start:'08 January 2020',
            end:'08 June 2021'
        },
        image:'https://dwpdigital.blog.gov.uk/wp-content/uploads/sites/197/2016/07/P1090594-1.jpeg'
        },
        {
        id:5,
        name:'Olivie Gibson',
        period:{
            start:'08 January 2020',
            end:'08 June 2021'
        },
        image:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQD6U_uHR5ytNPmfsEkqRt_U6f9U9kMQ2wI1_Vq21X9jVN1CsEdIzNwKXttAMNrm_xclU&usqp=CAU'
        },
        {
            id:6,
            name:'Maya Crouch',
            period:{
                start:'08 January 2020',
                end:'08 June 2021'
            },
            image:'https://dwpdigital.blog.gov.uk/wp-content/uploads/sites/197/2016/07/P1090594-1.jpeg'
        },
    ]
    const tabCategories = ['Calories','Activity','Measurements','Photos']
    useEffect(()=>{
        setSelectedUser({...userList[0]})
    },[])
    const leftIconPress =useCallback(()=>{
        navigation.goBack()
    },[navigation])    
    const tabChangeHandler= useCallback((index:number)=>{
        setTabIndex(index)
    },[])
    
  return {
    leftIconPress,
    selectedUser,
    tabChangeHandler,
    tabIndex,
    tabCategories
}
}