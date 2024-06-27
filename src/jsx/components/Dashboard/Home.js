import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Link , useHistory } from "react-router-dom";
import { Dropdown, Nav, Tab } from "react-bootstrap";
import jwt from "jsonwebtoken";
import LiveBar from "../charts/Chartjs/bar4";

import loadable from "@loadable/component";
import pMinDelay from "p-min-delay";
const ApexNagetivePosative3 = loadable(() =>
   pMinDelay(import("../charts/apexcharts/NagetivePositive3"), 500)
);
const ApexRedialBar2 = loadable(() =>
   pMinDelay(import("../charts/apexcharts/RadialBar2"), 500)
);
const LineChart7 = loadable(() =>
   pMinDelay(import("../charts/Chartjs/line7"), 0)
);

const d = new Date();
let count=0;

function Home() {
   const history = useHistory()

   const [info, setinfo] = useState([]);
   const [aws,setaws]=useState(0);
   const [countinstances,setcountinstances]=useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/details/instanceCounts");
        console.log(res.data.stopped+res.data.active);
        setaws(res.data.stopped+res.data.active+res.data.terminated);
        setcountinstances(res.data);      
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  let funding = info.map((item) => item.budget);
  let lastfunding = funding[funding.length-1];
  let max=0;

  for (let i=0; i<funding.length; i++) {
      if(max<funding[i])
         max = funding[i];
  }

   async function goToDashboard(){
      const req = await fetch("http://localhost:3000/react",{
         headers: {
            "x-access-token": localStorage.getItem("token")
         }
      })
      
      const data = await req.json()
      console.log(data)
   }

   useEffect(()=>{
      const token = localStorage.getItem("token")
      if(token){
         const user = jwt.decode(token)
         if(!user){
            localStorage.removeItem("token")
            history.replace("/page-register")
         }else{
            goToDashboard()
         }
      }
   },[])

   return (
      <>
         <div className="form-head d-flex mb-0 mb-lg-4 align-items-start">
            <div className="mr-auto d-none d-lg-block">
               <h2 className="text-black font-w600 mb-1"> BYOC Dashboard</h2>
               <p className="mb-0">Welcome to BYOC (BRING YOUR OWN CLOUD)</p>
            </div>
            <div className="d-none d-lg-flex align-items-center">
               <div className="text-right">
                  <h3 className="fs-20 text-black mb-0">{d.getHours()+':'+d.getMinutes()}</h3>
                  <span className="fs-14">{d.toDateString()}</span>
               </div>
               <Link
                  className="ml-4 text-black p-3 rounded border text-center width60"
                  to="/"
               >
                  <i className="las la-cog scale5" />
               </Link>
            </div>
         </div>
         <div className="row">
            <div className="col-lg-8 col-xxl-12">
               <div className="row">
                  <div className="col-lg-6 col-sm-6">
                     <div className="card widget-stat ">
                        <div className="card-body p-4">
                           <div className="media align-items-center">
                              <div className="media-body">
                                 <p className="fs-18 mb-2 wspace-no">
                                    Total AWS Instances 
                              
                                 </p>
                                 <h1 className="fs-36 font-w600 text-black mb-0">
                                    {aws}
                                 </h1>
                              </div>
                              <span className="ml-3 bg-primary text-white">
                                 <i className="flaticon-381-promotion" />
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-6 col-sm-6">
                     <div className="card widget-stat">
                        <div className="card-body p-4">
                           <div className="media align-items-center">
                              <div className="media-body">
                                 <p className="fs-18 mb-2 wspace-no">
                                    Total  AZURE Instances
                                 </p>
                                 <h1 className="fs-36 font-w600 d-flex align-items-center text-black mb-0">
                                    0
                                 </h1>
                              </div>
                              <span className="ml-3 bg-warning text-white">
                                 <i className="flaticon-381-promotion" />
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-lg-6 col-sm-6">
                     <div className="card widget-stat">
                        <div className="card-body p-4">
                           <div className="media align-items-center">
                              <div className="media-body">
                                 <p className="fs-18 mb-2 wspace-no">
                                    Total  GCP Instances
                                 </p>
                                 <h1 className="fs-36 font-w600 d-flex align-items-center text-black mb-0">
                                    0
                                 </h1>
                              </div>
                              <span className="ml-3 bg-warning text-white">
                                 <i className="flaticon-381-promotion" />
                              </span>
                           </div>
                        </div>
                     </div>
                  </div>
                  
                  <div className="col-xl-12">
                     {/* <div className="card">
                        <div className="card-body d-flex flex-wrap p-0">
                           <div className="col-lg-6 col-sm-6  media spending-bx">
                              <div className="spending-icon mr-4">
                                 <i
                                    className="fa fa-caret-up"
                                    aria-hidden="true"
                                 />
                                 <span className="fs-14">+5%</span>
                              </div>
                              <div className="media-body">
                                 <p className="fs-18 mb-2">Last Funding</p>
                                 <span className="fs-34 font-w600">₹ {lastfunding}</span>
                              </div>
                           </div>
                           <div className="col-lg-6 col-sm-6 media spending-bx pl-2">
                              <div className="media-body text-right">
                                 <p className="fs-18 mb-2">Heighest Funding</p>
                                 <span className="fs-34 font-w600">₹ {max}</span>
                              </div>
                              <div className="spending-icon ml-4">
                                 <i
                                    className="fa fa-caret-down"
                                    aria-hidden="true"
                                 />
                                 <span className="fs-14">-2%</span>
                              </div>
                           </div>
                        </div> */}


{/* <div className="col-xl-4 col-xxl-6 col-lg-6 col-sm-6"> */}
                  <div className="card active_users">
                     <div className="card-header bg-success border-0 pb-0">
                        <h4 className="card-title text-white">Insight Of Instances</h4>
                        <span id="counter" />
                     </div>
                     <div className="bg-success pt-2">
                        <LiveBar />
                     </div>
                     <div className="card-body pb-2 pt-0">
                        <div className="list-group-flush mt-2">
                           <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-1 font-weight-semi-bold border-top-0">
                              <p className="mb-0">Total Instances</p>
                              <p className="mb-0">{aws}</p>
                           </div>
                           <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-2">
                              <p className="mb-0">/Running Instances/</p>
                              <p className="mb-0">{countinstances.active}</p>
                           </div>
                           <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-2">
                              <p className="mb-0">/stopped Instances/</p>
                              <p className="mb-0">{countinstances.stopped}</p>
                           </div>
                           
                           <div className="list-group-item bg-transparent d-xxl-flex justify-content-between px-0 py-2 d-none">
                              <p className="mb-0">/preview/falcon/dashboard/</p>
                              <p className="mb-0">2</p>
                           </div>
                           <div className="list-group-item bg-transparent d-flex justify-content-between px-0 py-2">
                              <p className="mb-0">
                                 /Terminated Instances/
                              </p>
                              <p className="mb-0">{countinstances.terminated}</p>
                           </div>
                        </div>
                     </div>
                  </div>
               {/* </div> */}
                     </div>
                  </div>
                   {/* <div className="col-xl-12">
                     <div className="card" id="user-activity">
                        <Tab.Container defaultActiveKey="monthly">
                           <div className="card-header pb-0 d-block d-sm-flex border-0">
                              <h3 className="fs-20 text-black mb-0">
                                 Overview
                              </h3>
                              <div className="card-action card-tabs mt-3 mt-sm-0">
                                 <Nav
                                    as="ul"
                                    className="nav nav-tabs"
                                    role="tablist"
                                 >
                                    <Nav.Item as="li" className="nav-item">
                                       <Nav.Link
                                          className="nav-link"
                                          eventKey="monthly"
                                          role="tab"
                                       >
                                          Monthly
                                       </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li" className="nav-item">
                                       <Nav.Link
                                          className="nav-link"
                                          eventKey="weekly"
                                          role="tab"
                                       >
                                          Weekly
                                       </Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item as="li" className="nav-item">
                                       <Nav.Link
                                          className="nav-link"
                                          eventKey="today"
                                          role="tab"
                                       >
                                          Today
                                       </Nav.Link>
                                    </Nav.Item>
                                 </Nav>
                              </div>
                           </div>
                           <div className="card-body">
                              <Tab.Content
                                 className="tab-content"
                                 id="myTabContent"
                              >
                                 <Tab.Pane eventKey="monthly">
                                    <div style={{ height: "300px" }}>
                                       <LineChart7 data={0} height="300" />
                                    </div>
                                 </Tab.Pane>
                                  <Tab.Pane eventKey="weekly">
                                    <div style={{ height: "300px" }}>
                                       <LineChart7 data={1} height="300" />
                                    </div>
                                 </Tab.Pane>
                                 <Tab.Pane eventKey="today">
                                    <div style={{ height: "300px" }}>
                                       <LineChart7 data={2} height="300" />
                                    </div>
                                 </Tab.Pane> 
                              </Tab.Content>
                           </div>
                           
                           
                        </Tab.Container>
                     </div>
                  </div>   */}
                  {/* <div className="col-xl-12">
                     <div className="card">
                        <div className="card-header border-0 pb-0">
                           <h3 className="fs-20 text-black mb-0">
                              Instances Statistics
                           </h3>
                           <Dropdown className="ml-auto">
                              <Dropdown.Toggle
                                 variant=""
                                 className="icon-false btn-link p-0"
                              >
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    width="24px"
                                    height="24px"
                                    viewBox="0 0 24 24"
                                    version="1.1"
                                 >
                                    <g
                                       stroke="none"
                                       strokeWidth={1}
                                       fill="none"
                                       fillRule="evenodd"
                                    >
                                       <rect
                                          x={0}
                                          y={0}
                                          width={24}
                                          height={24}
                                       />
                                       <circle
                                          fill="#000000"
                                          cx={12}
                                          cy={5}
                                          r={2}
                                       />
                                       <circle
                                          fill="#000000"
                                          cx={12}
                                          cy={12}
                                          r={2}
                                       />
                                       <circle
                                          fill="#000000"
                                          cx={12}
                                          cy={19}
                                          r={2}
                                       />
                                       <circle
                                          fill="#000000"
                                          cx={12}
                                          cy={19}
                                          r={2}
                                       />
                                    </g>
                                 </svg>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="dropdown-menu-right">
                                 <Dropdown.Item className="text-black" to="/">
                                    Info
                                 </Dropdown.Item>
                                 <Dropdown.Item
                                    className="dropdown-item text-black"
                                    to="/"
                                 >
                                    Details
                                 </Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown>
                        </div>
                        <div className="card-body pt-3">
                           <div className="mb-3 d-flex justify-content-center">
                              <ApexRedialBar2 height={370} />
                           </div>
                           <div className="row">
                              <div className="col-sm-4 mb-sm-0 mb-3 media">
                                 <i className="lab la-instagram gs-icon border border-secondary text-secondary mr-3" />
                                 <div className="media-body">
                                    <p className="mb-1 font-w600">AWS</p>
                                    <span className="fs-34 text-black font-w500">
                                       73%
                                    </span>
                                 </div>
                              </div>
                              <div className="col-sm-4 mb-sm-0 mb-3 media">
                                 <i className="lab la-aws-f gs-icon border border-info text-info mr-3" />
                                 <div className="media-body">
                                    <p className="mb-1 font-w600">Facebook</p>
                                    <span className="fs-34 text-black font-w500">
                                       64%
                                    </span>
                                 </div>
                              </div>
                              <div className="col-sm-4 mb-sm-0 mb-3 media">
                                 <i className="lab la-twitter gs-icon border border-success text-success mr-3" />
                                 <div className="media-body">
                                    <p className="mb-1 font-w600">Twitter</p>
                                    <span className="fs-34 text-black font-w500">
                                       48%
                                    </span>
                                 </div>
                              </div>
                              <div className="col-sm-4 mb-sm-0 mb-3 media">
                                 <i className="lab la-twitter gs-icon border border-success text-success mr-3" />
                                 <div className="media-body">
                                    <p className="mb-1 font-w600">Twitter</p>
                                    <span className="fs-34 text-black font-w500">
                                       48%
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div> */}
               </div>
            </div>
            <div className="col-lg-4 col-xxl-12">
               <div className="row">
                  <div className="col-lg-12 col-md-6 col-xxl-6">
                     <div className="card">
                        <div className="card-header border-0 pb-0">
                           <h3 className="fs-20 text-black mb-0">
                                Instance Stats
                           </h3>
                           {/* <Dropdown className="ml-auto">
                              <Dropdown.Toggle
                                 variant=""
                                 className="icon-false btn-link p-0"
                              >
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    width="24px"
                                    height="24px"
                                    viewBox="0 0 24 24"
                                    version="1.1"
                                 >
                                    <g
                                       stroke="none"
                                       strokeWidth={1}
                                       fill="none"
                                       fillRule="evenodd"
                                    >
                                       <rect
                                          x={0}
                                          y={0}
                                          width={24}
                                          height={24}
                                       />
                                       <circle
                                          fill="#000000"
                                          cx={12}
                                          cy={5}
                                          r={2}
                                       />
                                       <circle
                                          fill="#000000"
                                          cx={12}
                                          cy={12}
                                          r={2}
                                       />
                                       <circle
                                          fill="#000000"
                                          cx={12}
                                          cy={19}
                                          r={2}
                                       />
                                    </g>
                                 </svg>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="dropdown-menu-right">
                                 <Dropdown.Item className="text-black" to="/">
                                    Info
                                 </Dropdown.Item>
                                 <Dropdown.Item className="text-black" to="/">
                                    Details
                                 </Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown> */}
                        </div>
                        <div className="card-body">
                           <div className="media mb-4 align-items-center">
                              <i className="lab la-active social-icon bg-primary text-white mr-3" />
                              <div className="media-body">
                                 <span className="text-black font-w600">
                                    Active Instances
                                 </span>
                                 <div
                                    className="progress mt-3"
                                    style={{ height: 10 }}
                                 >
                                    <div
                                       className="progress-bar bg-primary progress-animated"
                                       style={{ width: "10%", height: 10 }}
                                       role="progressbar"
                                    >
                                       <span className="sr-only">
                                          {countinstances.active}
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="media mb-4 align-items-center">
                              <i className="lab  social-icon bg-secondary text-white mr-3" />
                              <div className="media-body">
                                 <span className="text-black font-w600">
                                   Stopped Instances
                                 </span>
                                 <div
                                    className="progress mt-3"
                                    style={{ height: 10 }}
                                 >
                                    <div
                                       className="progress-bar bg-secondary progress-animated"
                                       style={{ width: "40%", height: 10 }}
                                       role="progressbar"
                                    >
                                       <span className="sr-only">
                                          40% Complete
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                           <div className="media align-items-center">
                              <i className="lab  social-icon bg-failure text-white mr-3" />
                              <div className="media-body">
                                 <span className="text-black font-w600">
                                   Terminated Instances
                                 </span>
                                 <div
                                    className="progress mt-3"
                                    style={{ height: 10 }}
                                 >
                                    <div
                                       className="progress-bar bg-success progress-animated"
                                       style={{ width: "0%", height: 10 }}
                                       role="progressbar"
                                    >
                                       <span className="sr-only">
                                          90% Complete
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                        {/* <div className="card-footer pt-0 text-center border-0">
                           <Link to="/social-network-campaign">
                              Show more
                              <i
                                 className="fa fa-caret-down ml-3"
                                 aria-hidden="true"
                              />
                           </Link>
                        </div> */}
                     </div>
                  </div>
                  {/* <div className="col-lg-12 col-md-6 col-xxl-6">
                     <div className="card">
                        <div className="card-header border-0 pb-0">
                           <h3 className="fs-20 text-black mb-0">
                           Pitch stats
                           </h3>
                           <Dropdown className="ml-auto">
                              <Dropdown.Toggle
                                 variant=""
                                 className="btn-link icon-false p-0"
                              >
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    width="24px"
                                    height="24px"
                                    viewBox="0 0 24 24"
                                    version="1.1"
                                 >
                                    <g
                                       stroke="none"
                                       strokeWidth={1}
                                       fill="none"
                                       fillRule="evenodd"
                                    >
                                       <rect
                                          x={0}
                                          y={0}
                                          width={24}
                                          height={24}
                                       />
                                       <circle
                                          fill="#000000"
                                          cx={12}
                                          cy={5}
                                          r={2}
                                       />
                                       <circle
                                          fill="#000000"
                                          cx={12}
                                          cy={12}
                                          r={2}
                                       />
                                       <circle
                                          fill="#000000"
                                          cx={12}
                                          cy={19}
                                          r={2}
                                       />
                                    </g>
                                 </svg>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="dropdown-menu-right">
                                 <Dropdown.Item className="text-black" to="/">
                                    Info
                                 </Dropdown.Item>
                                 <Dropdown.Item className="text-black" to="/">
                                    Details
                                 </Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown>
                        </div>
                        <div className="card-body px-2 pt-2">
                           <ApexNagetivePosative3 height="250" />
                        </div>
                     </div>
                  </div> */}
                  <div className="col-lg-12 col-md-12">
                     <div className="card">
                        <div className="card-header border-0  pb-0">
                           <h3 className="fs-20 text-black mb-0">
                              Summary 
                           </h3>
                           {/* <Dropdown className="dropdown ml-auto">
                              <Dropdown.Toggle
                                 variant=""
                                 className="btn-link icon-false p-0"
                              >
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    xmlnsXlink="http://www.w3.org/1999/xlink"
                                    width="24px"
                                    height="24px"
                                    viewBox="0 0 24 24"
                                    version="1.1"
                                 >
                                    <g
                                       stroke="none"
                                       strokeWidth={1}
                                       fill="none"
                                       fillRule="evenodd"
                                    >
                                       <rect
                                          x={0}
                                          y={0}
                                          width={24}
                                          height={24}
                                       />
                                       <circle
                                          fill="#000000"
                                          cx={12}
                                          cy={5}
                                          r={2}
                                       />
                                       <circle
                                          fill="#000000"
                                          cx={12}
                                          cy={12}
                                          r={2}
                                       />
                                       <circle
                                          fill="#000000"
                                          cx={12}
                                          cy={19}
                                          r={2}
                                       />
                                    </g>
                                 </svg>
                              </Dropdown.Toggle>
                              <Dropdown.Menu className="dropdown-menu-right">
                                 <Dropdown.Item className="text-black" to="/">
                                    Info
                                 </Dropdown.Item>
                                 <Dropdown.Item className="text-black" to="/">
                                    Details
                                 </Dropdown.Item>
                              </Dropdown.Menu>
                           </Dropdown> */}
                        </div>
                        <div className="card-body">
                           <div>
                              <div className="d-flex align-items-center pb-3 mb-3 border-bottom">
                                 <i className="lab la-amazon gs-icon bgl-secondary text-secondary mr-3" />
                                 <span className="text-black fs-16 font-w600">
                                    AWS
                                 </span>
                              </div>
                              <div className="fs-14 mb-4">
                                 <ul className="d-flex justify-content-between pb-2">
                                    <li className="font-w500 text-dark">
                                       Running 
                                    </li>
                                    <li>{countinstances.active}</li>
                                 </ul>
                                 <ul className="d-flex justify-content-between pb-2">
                                    <li className="font-w500 text-dark">
                                       Stopped
                                    </li>
                                    <li>{countinstances.stopped}</li>
                                 </ul>
                                 <ul className="d-flex justify-content-between pb-2">
                                    <li className="font-w500 text-dark">
                                       Terminated
                                    </li>
                                    <li>{countinstances.terminated}</li>
                                 </ul>
                                 <ul className="d-flex justify-content-between pb-2">
                                    <li className="font-w500 text-dark">
                                       Total 
                                    </li>
                                    <li>{countinstances.active+countinstances.stopped+countinstances.terminated}</li>
                                 </ul>
                              </div>
                           </div>
                           <div>
                              <div className="d-flex align-items-center pb-3 mb-3 border-bottom">
                                 <i className="lab la-microsoft gs-icon bgl-info text-info mr-3" />
                                 <span className="text-black fs-16 font-w600">
                                    Azure
                                 </span>
                              </div>
                              <div className="fs-14 mb-4">
                                 <ul className="d-flex justify-content-between pb-2">
                                    <li className="font-w500 text-dark">
                                       Running
                                    </li>
                                    <li>0</li>
                                 </ul>
                                 <ul className="d-flex justify-content-between pb-2">
                                    <li className="font-w500 text-dark">
                                       Stopped
                                    </li>
                                    <li>0</li>
                                 </ul>
                                 <ul className="d-flex justify-content-between pb-2">
                                    <li className="font-w500 text-dark">
                                       Terminated
                                    </li>
                                    <li>0</li>
                                 </ul>
                                 <ul className="d-flex justify-content-between pb-2">
                                    <li className="font-w500 text-dark">
                                       Total
                                    </li>
                                    <li>0</li>
                                 </ul>
                              </div>
                           </div>
                           <div>
                              <div className="d-flex align-items-center pb-3 mb-3 border-bottom">
                                 <i className="lab la-google gs-icon bgl-success text-success mr-3" />
                                 <span className="text-black fs-16 font-w600">
                                    GCP
                                 </span>
                              </div>
                              <div className="fs-14">
                                 <ul className="d-flex justify-content-between pb-2">
                                    <li className="font-w500 text-dark">
                                       Running
                                    </li>
                                    <li>0</li>
                                 </ul>
                                 <ul className="d-flex justify-content-between pb-2">
                                    <li className="font-w500 text-dark">
                                       Stopped
                                    </li>
                                    <li>0</li>
                                 </ul>
                                 <ul className="d-flex justify-content-between pb-2">
                                    <li className="font-w500 text-dark">
                                       Terminated
                                    </li>
                                    <li>0</li>
                                 </ul>
                                 <ul className="d-flex justify-content-between pb-2">
                                    <li className="font-w500 text-dark">
                                       Total
                                    </li>
                                    <li>0</li>
                                 </ul>
                              </div>
                           </div>
                        </div>
                        <div className="card-footer pt-0 border-0 text-center">
                           <Link
                              to="/campaign"
                              className="text-primary"
                           >
                              See More Info
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         {/* </div> */}
         {/* </div>
        </div>
      </div> */}
      </>
   );
}

export default Home;