import { useState } from "react"
export default function Login(){
    const [issignup,setsignup]=useState(false)
    return(
        <div className="container">
           <div className={`bg-login ${issignup?"slide":"inslide"}`}>
              <button className="bt-signup" onClick={()=>{setsignup(!issignup)}}>{`sign ${issignup?"in":"up"}`}</button>
           </div>
           <div className={`signin ${issignup?"invesible":"vesible"}`}>
            
              <form action="">
                 <h1>sign in</h1>
                <label htmlFor="email">email</label>
                <input type="email" name="email" id="email"/>
                
                 <label htmlFor="password">password</label>
                <input type="password" name="password" id="password"/>
                <button className="signin">sign in</button>
              </form>
           </div>
        </div>
    )
}