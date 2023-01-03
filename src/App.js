import './App.css';
// import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { Form, Container, Button, ProgressBar, Modal } from "react-bootstrap";
import { useEffect, useRef, useState } from 'react';
import ExpandableBlock from './Components/ExpandableBlock';
function App() {
  const [data, setData] = useState([])
  const [file,setFile]=useState()
  const[disabled,setDisabled]=useState(false)
  const inputRef=useRef()

  const getData = async () => {
    await axios.get("http://13.233.142.59:8000/api/TrackingDetails").then(r => {
      setData(r.data)
      console.log(r.data[0].tracking_info[0].Date)
    }).catch(e => {
      console.log(e)
    })
  }
  useEffect(() => {
    getData()
  }, [])
  const patchData = async () => {
    console.log('PRESSSEED')
    await axios.patch("http://13.233.142.59:8000/api/TrackingDetails").then(r => {
      setData(r.data)
      console.log(r)
    }).catch(e => {
      console.log(e)
    })
  }
  const UploadFile=async()=>{
    setDisabled(true)
    var formData = new FormData();
    formData.append("file", file);
    await axios.post('',formData).then(r=>{
      setDisabled(false)
      console.log(r.data)
    }).catch(e=>{console.log(e)
    setDisabled(false)})

  }
  useEffect(()=>{
    UploadFile()
  },[file])
  


//   if(disabled){
//     return(
//         <div style={{display:"flex",flexDirection:"column",height:"100%",margin:"10px"}}>
//         <h4>Please wait</h4>
//         <ProgressBar variant="info"  animated  striped  now={100}/>
//         </div>
//     )
// }
  return (
  

  
    <div  style={{ display: "flex", flexDirection: 'column', height: "100vh" }}>
      <div style={{ display: "flex", flexDirection: 'row', backgroundColor: "#09baca" ,alignItems:"center"}}>
        <h1 style={{ color: "white", margin: "10px",flex:1 }} >Cyno Tracking</h1>
        <input type="file"
                hidden
                ref={inputRef}
                 onChange={(e) => {
                    setFile(e.target.files[0])

                }} />


                 
                 {!disabled?<><h4  onClick={()=>inputRef.current.click()}  style={{color:"white"}}>Upload</h4>
                 <h4  onClick={patchData} style={{color:"white", marginRight:"20px",marginLeft:"20px"}}>Update</h4></>:
                 <h4 style={{color:"white", marginRight:"20px",marginLeft:"20px"}}>Please Wait</h4> }

      </div>
      <div style={{ display: "flex" }}>
        <div style={{ display: 'flex', justifyContent: 'center', flex: 1 }}>

          <table style={{ backgroundColor: "white", width: "100%", border: '1px solid rgba(0, 0, 0, 0.15)', marginTop: "10px", padding: "10px" }}>
            <thead style={{ backgroundColor: "#f8f9fb" }}>
              <tr>
                <th scope="col" style={{ color: "black", fontSize: 20, }}>Status</th>
                <th scope="col" style={{ color: "black", fontSize: 20, }}>Tracking Number</th>
                <th scope="col" style={{ color: "black", fontSize: 20, }}>Update Time</th>
                <th scope="col" style={{ color: "black", fontSize: 20, }}>Booked</th>
                <th scope="col" style={{ color: "black", fontSize: 20, }}>Arrival</th>
                <th scope="col" style={{ color: "black", fontSize: 20, }}>Outbound</th>
                <th scope="col" style={{ color: "black", fontSize: 20, }}>Delivered</th>
                <th scope="col" style={{ color: "black", fontSize: 20, }}>Last Event</th>
                <th scope="col" style={{ color: "black", fontSize: 20, }}>Tracking Info</th>

                {/* <th scope="col" style={{ color: "black", fontSize: 20, }}>Pincode</th> */}


              </tr>
            </thead>
            <tbody>
              {data && data.map((item) => (
                <tr>
                  <th>{item['status']}</th>
                  <th>{item['tracking_number']}</th>
                  <th>{item['updated_time']}</th>
                  <th>{item['Booked']}</th>
                  <th>{item['Arrival']}</th>
                  <th>{item['OutBound']}</th>
                  <th>{item['Delivered']}</th>
                  <th>{item['lastEvent']}</th>
                  {item.tracking_info != '' &&   <ExpandableBlock item={item}/>}
                  {/* {item.tracking_info != '' && <th>{item['tracking_info'][0].Date}{"|| "}{item['tracking_info'][0].StatusDescription}{"||"}{item['tracking_info'][0].Details}</th>} */}

                  {/* <th>{item['phone']}</th>
                            <th>{item['pincode']}</th> */}
                </tr>
              ))}
              {/* <tr>
                <ExpandableBlock ite{}/>
              </tr> */}
            </tbody>

          </table>
        </div>
        {/* <div style={{ flexDirection: "column", display: "flex", height: "80vh", width: '15%', justifyContent: "flex-end", padding: "10px", }}>
          <Button style={{ backgroundColor: "#09baca", borderWidth: "0px", height: "50px", borderRadius: "20px" }} variant="primary" type="submit" onClick={()=>inputRef.current.click()} >
            Upload
          </Button>
          <Button style={{ backgroundColor: "#09baca", borderWidth: "0px", height: "50px", borderRadius: "20px", marginTop: "20px" }} variant="primary" type="submit" onClick={patchData}>
            Update
          </Button>
        </div> */}
      </div>
    </div>


  );
}

export default App;
