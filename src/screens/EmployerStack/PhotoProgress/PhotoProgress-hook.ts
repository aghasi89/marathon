import {useCallback,useState} from 'react';
import ImagePicker from 'react-native-image-crop-picker';

interface IImages{
front?:string;
back?:string;
side?:string;
}

export default (navigation)=> {
    const [isVisibleSwiper,setIsVisibleSwiper]=useState<boolean>(false)
    const [title,setTitle]=useState<string>('')
    const [images,setImages]=useState<IImages>()
    const [commentsList,setCommentsList]=useState<Array<string>>([])
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
      const handleUploadButtonClick = useCallback((type:string)=> {
        switch (type) {
          case "camera":
            ImagePicker.openCamera({
              multiple: false
            }).then(image => {
                setIsVisibleSwiper(false)
                setImages({...images,[title]:image.path})
            });
            break;
          case "library":
            ImagePicker.openPicker({
              multiple: false
            }).then(image => {
                setIsVisibleSwiper(false)       
                setImages({...images,[title]:image.path})       
            });
            break;
          default:
            break;
        };
      },[title,images])
    const onAddImage = useCallback((title:string)=>{
        setIsVisibleSwiper(true)
        setTitle(title.toLocaleLowerCase())
    },[])
    const addComent= useCallback(()=>{
        setCommentsList([...commentsList,''])
    },[commentsList])
    const onChangeCommentText= useCallback((text:string, index:number)=>{
        let newList=[...commentsList]
        newList[index]=text
        setCommentsList(newList)
    },[commentsList])
    const deleteComment=useCallback((index:number)=>{
        let newList=[...commentsList]
        newList.splice(index,1)
        setCommentsList(newList)
    },[commentsList])
    const leftIconPress=useCallback(()=>{
        navigation.goBack()
    },[])
    const onToasterClose=useCallback(()=>{
      setIsVisibleSwiper(false)
    },[])
    const onChartIconPress = useCallback(()=>{
      navigation.navigate('PhotoProgressChart')
    },[navigation])
  return {
    leftIconPress,
    days,
    dayIndex,
    handleUploadButtonClick,
    isVisibleSwiper,
    onAddImage,
    images,
    addComent,
    commentsList,
    onChangeCommentText,
    deleteComment,
    onToasterClose,
    onChartIconPress
}
}
