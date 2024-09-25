import { useCallback, useState } from "react"

export default (navigation)=>{
    const [selectedTabIndex,setSelectedTabIndex]=useState<number>(0)
    const tabs=[{title:'Progress'},{title:'Goal'},{title:'Sharing'}]
    const leftIconPress= useCallback(()=>{
        navigation.goBack()
    },[])
    const onHeaderTabChange = useCallback((index:number)=>{
        setSelectedTabIndex(index)
    },[])
    return {
        leftIconPress,
        onHeaderTabChange,
        selectedTabIndex,
        tabs, 
    }
}