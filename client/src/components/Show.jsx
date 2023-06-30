import { useEffect, useState } from "react";
import Axios from "axios";

const Show = () =>{
   const [data,setData] = useState([]);

    const fetchData = async () =>{
        const { data } = await Axios.get('http://localhost:4000/');
        console.log(data)
    
        setData(data);
      }
    
      useEffect(() =>{
        fetchData();
      },[])

  return (
    <>
     <div className=" container">
        {data.map((x) =>(
                <div className="m-2 w-fit p-2 px-8 bg-slate-50 rounded-lg grid place-items-center float-left" key={x.id}>
                 <input className=" shadow-lg p-2 rounded"
                   type="text" value={x.name} />
                <input className="mt-2 shadow-lg p-2 rounded"
                    type="text" value={x.role}/>
                </div>
        ))
        }
     </div>
    </>
  )
}

export default Show;