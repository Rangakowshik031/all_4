import React,{useState} from "react";
const ChildComponent=({ondata})=>{
    const [data,setdata]= useState('');
    const onhandle=(e)=>{
        setdata(e.target.value);
    }
    const senddata=()=>{
        ondata(data);
    }

    return(
        <div>
            <input value={data} onChange={onhandle}/>
            <button onClick={senddata}>SEND DATA</button>
        </div>
    )

}
export default ChildComponent;