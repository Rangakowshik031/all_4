import React,{useState} from "react";
import ChildComponent from './ChildComponent';
const ParentComponent=()=>{
    const [data,setdata]= useState('');
    const handle=(data)=>{
        setdata(data);
    };
    return(
        <div>
        <label>input: {data}</label>
        <ChildComponent ondata={handle}/>
        </div>
    );
};
export default ParentComponent;