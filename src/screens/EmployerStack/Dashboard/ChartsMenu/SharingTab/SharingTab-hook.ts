import { useCallback, useState } from 'react'
import { SwitchListComponenetData } from '../../../../../components/sharingSwitchListComponent/SharingSwitchListComponent';

type Categories={
    id:number,
    name:string,
    isSelected:boolean,
}
export type Period={
    start:string;
    end:string;
}
export type User= {
    id:number;
    name:string;
    period:Period;
    image:string;
    accessibleInfo?:SwitchListComponenetData;
}

export default (navigation)=> {
    const [isEditeOpen,setIsEditeOpen]=useState<boolean>(false)
    const [isSharingMenuOpen,setIsSharingMenuOpen]=useState<boolean>(false)
    const [selectedUser,setSelectedUser]=useState<User>()
    const [categories,setCategories] = useState<Array<Categories>>([
        {
        id:0,
        name:'Shared by me',
        isSelected:true
        },
        {
        id:1,
        name:'Shared with me',
        isSelected:false
        },
    ])
const userList:Array<User>=[
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
]
    const onCategorySelect=useCallback((index:number)=>{
       let newCategories=[...categories]
       newCategories.forEach((item)=>{
        if (item.id===index) {
            item.isSelected=true
        }else{
        item.isSelected=false}
       })
       setCategories(newCategories)
    },[categories])
    const onUserEditeIconPress=useCallback((id:number)=>{
        setIsEditeOpen(true)
        const selectedUser=userList[userList.findIndex((user)=>user.id===id)]
        setSelectedUser(selectedUser)
    },[])
    const onUserEditeSheetClose=useCallback(()=>{
        setIsEditeOpen(false)
    },[])
    const onPlusButtonPress=useCallback(()=>{
        setIsSharingMenuOpen(true)
    },[])
    const onSharingMenuClose=useCallback(()=>{
        setIsSharingMenuOpen(false)
    },[])
    const createNewShareRequest = useCallback(()=>{
        setIsSharingMenuOpen(false)
        navigation.navigate('CreateShareRequest')
    },[navigation])
    const onEditSharingPress =useCallback(()=>{
        setIsEditeOpen(false)
        navigation.navigate('EditSharing')
    },[navigation])
    const onSharingUserPress = useCallback(()=>{
        navigation.navigate('UserStatistics')
    },[])
  return {
    onCategorySelect,
    categories,
    userList,
    isEditeOpen,
    onUserEditeIconPress,
    onUserEditeSheetClose,
    isSharingMenuOpen,
    onPlusButtonPress,
    onSharingMenuClose,
    selectedUser,
    createNewShareRequest,
    onEditSharingPress,
    onSharingUserPress
}}