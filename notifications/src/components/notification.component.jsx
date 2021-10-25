import React,{useEffect,useState} from "react";
import './notification.css'
import Alert from 'react-bootstrap/Alert'

const Notification = ({icon,hiddenNext,setHiddenNext,handleDelete,alert,timeDuration,type,msg}) => {
    const [open,setOpen] = useState(true)
   
    useEffect(() => {
       setTimeout(() => {
        setOpen(false)
       },timeDuration * 1000)
    }, [timeDuration]);

    useEffect(() => {
        if(hiddenNext){
            setHiddenNext(false)
        }
    }, []);

    return(
        <Alert  variant={type} className ="col-md-3 d-flex" show = {!hiddenNext ? open : false}  onClick = { () => handleDelete(alert) }>
            <div className ="col-md-1"><i className={`fas ${icon}`}></i></div>
            <div className ="col-md-10">{msg}</div> 
            <div className="flex-end col-md-1">X</div>
        </Alert>
        )
}
export default Notification

