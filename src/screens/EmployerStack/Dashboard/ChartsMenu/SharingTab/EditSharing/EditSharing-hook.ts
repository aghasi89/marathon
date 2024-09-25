import { useCallback, useEffect, useState } from 'react'
import { SwitchListComponenetData } from '../../../../../../components/sharingSwitchListComponent/SharingSwitchListComponent'
import { User } from '../SharingTab-hook'

export default (navigation)=> {
    const [isSelectUserOpen,setIsSelectUserOpen]= useState<boolean>(false)
    const [isCalendarOpen,setIsCalendarOpen]= useState<boolean>(false)
    const [searchText,setSearchText]= useState<string>()
    const [selectedUser,setSelectedUser]=useState<User|undefined>()
    const [userAccessOnStartEditing,setUserAccessOnStartEditing] = useState<SwitchListComponenetData>()
    const [isDataChanged,setIsDataChanged]=useState<boolean>(false)
    const [data, setData] = useState<SwitchListComponenetData>({});
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
    useEffect(()=>{
        setSelectedUser({...userList[0]})
        chackUserAccess({...userList[0]})
    if (selectedUser) {
        setUserAccessOnStartEditing({
            ...userList[0]?.accessibleInfo,
            periodFrom:userList[0]?.period.start,
            periodTo:userList[0]?.period.end,
        })
    } 
    },[])
    const onSwitch=useCallback((data)=>{
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
    const chackUserAccess= useCallback((user:User)=>{
       setData({...user?.accessibleInfo,
        periodFrom:user.period.start,
        periodTo:user.period.end})
    },[])
    const isDataChangesExest= useCallback((data:SwitchListComponenetData)=>{
       const startData= JSON.stringify(userAccessOnStartEditing)
        const currentData= JSON.stringify(data)
        if (startData===currentData) {
            setIsDataChanged(false)
        }else{
            setIsDataChanged(true)
        }
    },[userAccessOnStartEditing])
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
    selectedUser,
    isCalendarOpen,
    onCoustomDatePress,
    onPeriodSelect,
    onCalendarCancel,
    onUnselectPeriod,
    isDataChanged
}
}