import { useSelector } from "react-redux";
import { PieChart } from "../cmps/PieChart.jsx";
import { toyService } from "../services/toys.service.js";
import { useEffect, useState } from "react";


export function Dashborad(){

    const [pieData,setData] = useState()
    useEffect(()=>{
        toyService.getToysData()
                                .then(data =>setData(data))
    },[])
   console.log(pieData)
    return <PieChart pieData={pieData}/>
}