import React from "react";
// import img1 from "../../../data/Images/carlogo.png";
// import img2 from "../../../data/Images/logo.jpg";
// import { Link } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { Rented_Vehical_fun, get_A_Vehical } from "../../../services/operations/AdminCalls";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Rented_item = () => {
  // const { user } = useSelector((state) => state.profile);
  const [rentedVehical, setrentedVehical] = useState([]);
  const [rentedVehicalSpecififc, setrentedVehicalSpecififc] = useState([]);
  const navigate=useNavigate();
  const [approved,setapproved]=useState([]);
  const [decline,setdecline]=useState([]);
  const [pending,setpending]=useState([]);


  console.log("I am Here:",rentedVehicalSpecififc)
  const [toggle,settoggle]=useState(false);

  const {token} = useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await dispatch(Rented_Vehical_fun(token,navigate));
        console.log("--------------------FFFFFFFFFFFFFFFF------------------", res);
        setrentedVehical(res?.data?.UserDetails_Rented?.RentedVehical);
        setapproved(res?.data?.UserDetails_Rented?.ApprovedVehical);
        setdecline(res?.data?.UserDetails_Rented?.DeclinedVehical);
        setpending(res?.data?.UserDetails_Rented?.PendingVehical);
      } catch (error) {
        console.error("Error fetching rented vehicles:", error);
      }
    };
  
    fetchData();
  }, []);
  const fun=async (id)=>{
    const data1=await dispatch(get_A_Vehical(id));
    if(data1===undefined){
      settoggle(false);
    }
    console.log("Data 1 is Set",data1)
    setrentedVehicalSpecififc(data1);
  }
  

  console.log("rentedVehical??????????????????",rentedVehical)
  return (
    <div className="">


      {/* Both */}
<div className={`${toggle?"bg-white":"bg-[#F1F2FF]"} justify-center flex w-[1000px] transition duration-1000
              rounded-3xl p-10  ${toggle ? 'fixed top-0 z-10' : ''} ml-56 ${toggle?'mt-40':'mt-0'} z-${toggle?"10":"0"} ${toggle?"visible":"invisible"}`}>
      {
        console.log("rentedVehicalSpecififc>>>>>>>>>>",rentedVehicalSpecififc?.data?.vehicle?._id)
      }
        <div className="flex gap-5">
          {/* Image  */}
          <div>
            <img src={rentedVehicalSpecififc?.data?.vehicle?.VehicalImage} alt="" className="w-[50rem]" />
          </div>
          {/* right */}
          <div>
            <div className="text-3xl font-semibold">
            {rentedVehicalSpecififc?.data?.vehicle
?.Name}
            </div>
            <div className="w-72 h-48 mb-2 mt-10 overflow-auto">
              
                {rentedVehicalSpecififc?.data?.vehicle
                  ?.Description
              }
              {/* Description */}
            </div>
            <pre className="flex gap-0 ">
              <div>Price: </div>
              {rentedVehicalSpecififc?.data?.vehicle
                  ?.Price
              }<p> RS</p>
            </pre>
            <div>
              Status: {approved.includes(rentedVehicalSpecififc?.data?.vehicle?._id)?<div>Approved</div>:decline.includes(rentedVehicalSpecififc?.data?.vehicle?._id)?<div>Decline</div>:<div>Pending</div>}
            </div>
          </div>
        </div>
      <div className="text-xl ml-20">
      <button onClick={()=>{settoggle(false)
    setrentedVehicalSpecififc([])}}>
        ✘
        </button>
      </div>
        

</div>


{/* Other Code */}
      <div className={`${toggle?"blur":""}`}>
        <div className="text-richblack-600 text-center font-semibold text-4xl mt-3">
          <p>
            <span className="text-black font-bold">"</span>Your All Rented
            Items...<span className="text-black font-bold">"</span>
          </p>
        </div>
      </div>
      <div className={`${toggle?"blur":""}`}>
        {/* Both Other Code*/}


                <div className={`absolute flex flex-wrap gap-10 justify-around z-${toggle?0:10}`}>
                {
                  rentedVehical.map((val,index)=>{
                    return (
                <div key={index} className="">
                      {/* data_in_PopUp(); */}
                <div className="flex flex-wrap gap-5 mt-20 justify-around">
                  {/* Cards */}

                  <div className="bg-white w-96 flex flex-col rounded-3xl">
                    <img src={val.VehicalImage} alt="" className="w-96" />

                      {
                        approved.includes(val._id)?(<div  className='h-8 mt-5 mx-auto mb-4 w-24 text-center bg-richblack-700 text-white'>Approved</div>):
                        decline.includes(val._id)?(<div  className='h-8 mt-5 mx-auto mb-4 w-24 text-center bg-richblack-700 text-white'>Decline</div>):
                        (<div>Pending</div>)
                      }
                      <button className="p-5 w-72 ml-10 px-10 shadow-2xl hover:scale-95 shadow-black bg-black font-semibold text-white hover:bg-richblack-5 duration-400 transition-all hover:text-black  rounded-md"
                        onClick={()=>{
                          settoggle(true)
                          fun(val._id)
                          
                        }}
                      >
                        Get Details
                      </button>

                  </div>
                </div>
                </div>
                      
                    )
                  })


                }
                </div>

      </div>


         
    </div>
  );
};

export default Rented_item;
