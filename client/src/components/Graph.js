import React from 'react'
import { Doughnut } from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
import Labels from './Labels';
import { chart_Data, getTotal } from '../helper/helper'
import {default as api} from '../store/apiSlice';

Chart.register(ArcElement);

export default function Graph() {

  // Using the useGetLabelsQuery hook from the API slice to fetch data
  const { data, isFetching , isSuccess, isError } = api.useGetLabelsQuery()
  let graphData;


   // Determine the state of data fetching

  if(isFetching){
    graphData = <div>Fetching</div>;  // Show a "Fetching" message if data is being fetched
  }else if(isSuccess){
    graphData = <Doughnut {...chart_Data(data)}></Doughnut>; // Render the Doughnut chart if data fetching is successful
  }else if(isError){
    graphData = <div>Error</div> // Show an "Error" message if there is an error fetching data
  }


  return (
    <div className="flex justify-content max-w-xs mx-auto">
        <div className="item">
        <div className="chart relative">
            {graphData} {/* Render the graphData variable */}
          {/* Display total amount */}
                <h3 className='mb-4 font-bold title'>Total
                    <span className='block text-3xl text-emerald-400'>${getTotal(data) ?? 0}</span>
                </h3>
            </div>   

            <div className="flex flex-col py-10 gap-4">
                {/* Labels */}
                <Labels></Labels>
            </div> 
        </div>
    </div>
  )
}
