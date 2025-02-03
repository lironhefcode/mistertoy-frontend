import { useEffect, useState } from "react";



export function Chat(){
    const [messages,setMessages] = useState([])
 

    function sendmsg(ev){
        ev.preventDefault()
       const msg = ev.target[0].value
       setMessages(prevmessages => [...prevmessages,msg])
       ev.target[0].value = ''
       setTimeout(() => {
        setMessages(prevmessages => [...prevmessages,'hello how can we help you'])
    }, 1000);
    }


    return(
        <div className="chat">
            <div className="messages">

            {messages.map((msg,index) => (
                <div key={index} >
                {msg}
              </div>
            ))}
            </div>
            <form action="" onSubmit={sendmsg}>
                <input type="text" placeholder="enter something" />
                <button type="submit">send</button>
            </form>
        </div>
    )
}