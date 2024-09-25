import React from 'react'
import {ScrollView} from 'react-native'
import Chart from '../chart/Chart'

export type BarChartData={
    barColor:string
    date:string,
    percent:number,
    title:string,
}
type Props={
    data:Array<BarChartData>
}
const BarChartComponent:React.FC<Props>=({
    data
})=> {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {data.map((dataItem,index)=>{
            return(
            <Chart 
            barColor={dataItem.barColor} 
            date={dataItem.date}
            percent={dataItem.percent}
            title={dataItem.title}
            key={index}/>
            )
        })}
    </ScrollView>
  )
}

export default BarChartComponent