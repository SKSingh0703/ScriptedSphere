import { useEffect, useState } from "react"

export default function Contest() {

    const [contests,setContests] = useState([]);
    
    
    useEffect(()=>{
        const fetchContests = async ()=>{
            try {
                const res = await fetch("/api/code/getcontests");
                if(!res.ok){
                   return console.log("Something went wrong");                    
                }
                const data = await res.json();
                
                setContests(data.data);
            } catch (error) {
                console.log(error);                
            }
        }
        fetchContests();
    },[]);

  return (
    <div>Contest</div>
  )
}
