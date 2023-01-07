import "./App.css";
// import Button from 'react-bootstrap/Button';
import axios from "axios";
import { Form, Container, Button, ProgressBar, Modal } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import ExpandableBlock from "./Components/ExpandableBlock";
import Card from "./Components/Card";
import ExpandableLE from "./Components/ExpandableLE";
import Table from "react-bootstrap/Table";

function App() {
  const [data, setData] = useState([]);
  const [file, setFile] = useState();
  const [disabled, setDisabled] = useState(false);
  const inputRef = useRef();

  const getData = async () => {
    await axios
      .get(
        "https://guarded-caption-production.up.railway.app/api/TrackingDetails"
      )
      .then((r) => {
        setData(r.data);
        console.log(r.data[0].tracking_info[0].Date);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const patchData = async () => {
    console.log("PRESSSEED");
    await axios
      .patch(
        "https://guarded-caption-production.up.railway.app/api/TrackingDetails"
      )
      .then((r) => {
        setData(r.data);
        console.log(r);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const UploadFile = async () => {
    setDisabled(true);
    var formData = new FormData();
    formData.append("file", file);
    await axios
      .post(
        "https://guarded-caption-production.up.railway.app/api/PostTrack",
        formData
      )
      .then((r) => {
        setDisabled(false);
        console.log(r.data);
        getData();
      })
      .catch((e) => {
        console.log(e);
        setDisabled(false);
      });
  };
  useEffect(() => {
    UploadFile();
    console.log("check");
  }, [file]);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#09baca",
          alignItems: "center",
        }}
      >
        <h1 style={{ color: "white", margin: "10px", flex: 1 }}>
          Cyno Tracking
        </h1>
        <input
          type="file"
          hidden
          ref={inputRef}
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
        />

        {!disabled ? (
          <>
            <h4
              onClick={() => inputRef.current.click()}
              style={{ color: "white" }}
            >
              Upload
            </h4>
            <h4
              onClick={patchData}
              style={{
                color: "white",
                marginRight: "20px",
                marginLeft: "20px",
              }}
            >
              Update
            </h4>
          </>
        ) : (
          <h4
            style={{ color: "white", marginRight: "20px", marginLeft: "20px" }}
          >
            Please Wait
          </h4>
        )}
      </div>
      {/* <div style={{ display: "flex" }}>
        <div style={{ display: "flex", justifyContent: "center", flex: 1 }}> */}

      <table
        style={{
          backgroundColor: "white",
          width: "100%",
          border: "1px solid rgba(0, 0, 0, 0.15)",
          marginTop: "10px",
          padding: "10px",
        }}
      >
        <thead style={{ backgroundColor: "#f8f9fb" }}>
          <tr>
            <th scope="col" style={{ color: "#09baca", fontSize: 16 }}>
              Status
            </th>
            <th scope="col" style={{ color: "#09baca", fontSize: 16 }}>
              Tracking Number
            </th>
            <th scope="col" style={{ color: "#09baca", fontSize: 16 }}>
              Update Time
            </th>
            <th scope="col" style={{ color: "#09baca", fontSize: 16 }}>
              Booked
            </th>
            <th scope="col" style={{ color: "#09baca", fontSize: 16 }}>
              Outbound
            </th>
            <th scope="col" style={{ color: "#09baca", fontSize: 16 }}>
              Arrival
            </th>
            <th scope="col" style={{ color: "#09baca", fontSize: 16 }}>
              Delivered
            </th>
            <th scope="col" style={{ color: "#09baca", fontSize: 16 }}>
              Tracking Info
            </th>
            <th scope="col" style={{ color: "#09baca", fontSize: 16 }}>
              Last Event
            </th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.map((item) => (
              <tr>
                <th
                  style={{
                    color: item.status == "delivered" ? "green" : "red",
                    fontSize: 12,
                    fontWeight: "bold",
                    borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
                    borderRight: "1px solid rgba(0, 0, 0, 0.15)",
                    padding: "5px",
                  }}
                >
                  {item["status"]}
                </th>
                <th
                  style={{
                    color: "black",
                    fontWeight: "normal",
                    fontSize: 12,
                    borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
                    borderRight: "1px solid rgba(0, 0, 0, 0.15)",
                    padding: "5px",
                  }}
                >
                  {item["tracking_number"]}
                </th>
                <th
                  style={{
                    fontWeight: "normal",
                    color: "black",
                    fontSize: 12,
                    borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
                    borderRight: "1px solid rgba(0, 0, 0, 0.15)",
                    padding: "5px",
                  }}
                >
                  {item["updated_time"]}
                </th>
                <th
                  style={{
                    fontWeight: "normal",
                    color: "black",
                    fontSize: 12,
                    borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
                    borderRight: "1px solid rgba(0, 0, 0, 0.15)",
                    padding: "5px",
                  }}
                >
                  {item["Booked"]}
                </th>
                <th
                  style={{
                    color: "black",
                    fontWeight: "normal",
                    fontSize: 12,
                    borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
                    borderRight: "1px solid rgba(0, 0, 0, 0.15)",
                    padding: "5px",
                  }}
                >
                  {item["OutBound"]}
                </th>
                <th
                  style={{
                    color: "black",
                    fontWeight: "normal",
                    fontSize: 12,
                    borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
                    borderRight: "1px solid rgba(0, 0, 0, 0.15)",
                    padding: "5px",
                  }}
                >
                  {item["Arrival"]}
                </th>
                <th
                  style={{
                    fontWeight: "normal",
                    color: "black",
                    fontSize: 12,
                    borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
                    borderRight: "1px solid rgba(0, 0, 0, 0.15)",
                    padding: "5px",
                  }}
                >
                  {item["Delivered"]}
                </th>
                {item.tracking_info != "" && <ExpandableBlock item={item} />}
                <th
                  style={{
                    color: "black",
                    fontWeight: "normal",
                    fontSize: 12,
                    borderBottom: "1px solid rgba(0, 0, 0, 0.15)",
                    borderRight: "1px solid rgba(0, 0, 0, 0.15)",
                    padding: "5px",
                  }}
                >
                  {item["lastEvent"]}
                </th>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
    //   </div>
    // </div>
  );
}

export default App;
