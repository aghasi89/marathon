import { useCallback, useState } from 'react'
import { User } from '../SharingTab-hook'
import { SwitchListComponenetData } from '../../../../../../components/sharingSwitchListComponent/SharingSwitchListComponent'

export default (navigation)=> {
    const [isSelectUserOpen,setIsSelectUserOpen]= useState<boolean>(false)
    const [isCalendarOpen,setIsCalendarOpen]= useState<boolean>(false)
    const [searchText,setSearchText]= useState<string>()
    const [selectedUser,setSelectedUser]=useState<User|undefined>()
    const [data, setData] = useState<SwitchListComponenetData>({
        activity: false,
        bodyFat: false,
        calories: false,
        measurements: false,
        photoProgress: false,
        water: false,
        weight: false,
      });
    const userList=[
        {
        id:1,
        name:'Olivie Gibson',
        period:{
            start:'08 January 2020',
            end:'08 June 2021'
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
    const onSwitch=useCallback((data:SwitchListComponenetData)=>{
        setData(data)
    },[])
    const leftIconPress =useCallback(()=>{
        navigation.goBack()
    },[navigation])
    const onSelectUserPress=useCallback(()=>{
        setIsSelectUserOpen(true)    
    },[])
    const onSelectUserClose=useCallback(()=>{
        setIsSelectUserOpen(false)    
    },[])
    const search= useCallback((text:string)=>{
        setSearchText(text)
    },[])
    const onUserSelect=useCallback((id:number)=>{
        setIsSelectUserOpen(false) 
        setSelectedUser(userList[userList.findIndex(user=>user.id===id)])
    },[userList])
    const onUnselectUser = useCallback(()=>{
        setSelectedUser(undefined)
    },[selectedUser])
    const onCoustomDatePress= useCallback(()=>{
        setIsCalendarOpen(true)
    },[])
    const onPeriodSelect=useCallback((data:SwitchListComponenetData)=>{
        setIsCalendarOpen(false)
        setData(data)
    },[])
    const onCalendarCancel = useCallback(()=>{
        setIsCalendarOpen(false)
    },[])
    const onUnselectPeriod= useCallback((data:SwitchListComponenetData)=>{
       setData(data)
    },[])
  return {
    leftIconPress,
    onSwitch,
    data,
    isSelectUserOpen,
    onSelectUserPress,
    onSelectUserClose,
    searchText,
    search,
    userList,
    onUserSelect,
    selectedUser,
    onUnselectUser,
    isCalendarOpen,
    onCoustomDatePress,
    onPeriodSelect,
    onCalendarCancel,
    onUnselectPeriod
}
}