
import React, { useState } from 'react'

const ExpandableBlock=({item}) =>{
  const [visible,setVisible]=useState(false)
  return (
    <>
        {visible ? <th onClick={()=>setVisible(!visible)}>{item['tracking_info'][0].Date}{"|| "}{item['tracking_info'][0].StatusDescription}{"||"}{item['tracking_info'][0].Details}</th >:<th onClick={()=>setVisible(!visible)}>{item['tracking_info'][0].StatusDescription}</th>}
   </>
  )
}

export default ExpandableBlock

