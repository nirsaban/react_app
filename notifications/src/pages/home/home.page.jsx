import 'bootstrap/dist/css/bootstrap.min.css';
import { v4 as uuidv4 } from 'uuid';
import React,{useEffect,useState} from 'react';
import Axios from '../../helpers/axios';
import Notification from '../../components/notification.component'

const  HomePage = () =>  {

  const [state,setState]  = useState({})
  const [curInd,setCurInd] = useState(0)
  const [currComp,setCurrComp] = useState([]);
  const [hiddenNext,setHiddenNext] = useState(false)
 
  useEffect(() => {
  
  let uniqueId =  uuidv4();
    (async () => {
        try {
            const {data:{timeDuration,timeForShowNew,data}}  = await Axios.get(`/get_notifications?uniqueId=${uniqueId}`)
            const dataEditMessage = data.map(alert => edit_message(alert))
            setState({timeDuration:timeDuration,'timeForShowNew':timeForShowNew,'notifications':dataEditMessage,uniqueId:uniqueId})
        } catch (e) {
            console.error(e);
        }
    })();
  },[]);

const edit_message = alert => {
        const alertMessage =   alert['text'].map(msg => {
        let msgToLower = msg.toLowerCase()
        if(msgToLower.includes("sale")){
            msg = msg + "!"
        }
        else if(msgToLower.includes("new")){
            msg =  "~"  + msg + "~"
        }
        if(msgToLower.includes('limited edition')){
            msg =   msgToLower.replace('limited edition', 'limited edition'.toUpperCase());
        }
        return msg
      })
      alert['text'] = alertMessage
      return alert
  }

  useEffect(() => {
    if(state.notifications){
      const interval = setTimeout(()=>{
        if(curInd < state.notifications.length-1) setCurInd(p=>p+1)
        else setCurInd(0)
        setCurrComp(p=>[...p,state.notifications[curInd]])
      },state['timeForShowNew'] * 1000)
      return () => clearInterval(interval);
    }
  }, [curInd,currComp,state]);

  const handleDelete = async alertToRemove => {
    try {
      const {data:data}  = await Axios.post('/delete',{uniqueId:state.uniqueId,alertToRemove}) 
    
      if(data['data'].length > 0 ){
        console.log(data)
         setState(prevState => ({ ...prevState, notifications: data['data'].map(alert => edit_message(alert)).filter(alert => alert.status)}));
         setHiddenNext(true)
       }
    } catch (e) {
      console.error(e);
    }
  }
  return (
    <div className="App d-flex justify-content-center flex-column align-items-center">
     {
      state['notifications'] ? 
      currComp.map((alert,index) => {
          return(
            <Notification 
              key = {index}
              type={alert.type}
              msg={alert.text[Math.round(Math.random() * (alert.text.length - 1))]}
              alert = {alert.alert} 
              timeDuration = {state.timeDuration} 
              handleDelete = {handleDelete}
              hiddenNext = {hiddenNext}
              setHiddenNext = {setHiddenNext}
              icon = {alert.icon}
            />
          )
        })
       : 
       null
     }
    </div>
  );
}

export default HomePage;
