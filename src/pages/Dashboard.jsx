import { useSelector } from "react-redux";
import { PieChart } from "../cmps/PieChart.jsx";
import { toyService } from "../services/toys.service.js";
import { useEffect, useState } from "react";
import { DoughnutChart } from "../cmps/DoughnutChart.jsx";


export function Dashborad(){

    const [toys,setToys] = useState()
    useEffect( ()=>{
      
                        getToys()
    },[])
    async function getToys(){
        const toys = await toyService.getAll()
        setToys(toys)
    }
    if(!toys) return <h1>loading</h1>
    return (
        <div style={{flexWrap:'wrap'}} className="dashborad flex">
        <PieChart pieData={toyService.getToysData(toys)}/>
        <DoughnutChart doughnutData={toyService.getStockData(toys)}/>
        </div>
    )
}