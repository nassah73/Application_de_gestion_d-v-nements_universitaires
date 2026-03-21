import { useState } from "react"
export default function Login(){
    const [issignup,setsignup]=useState(false)
    return(
        <div className="container">
            <div className="signup">
        <form action="">
          <h1>sign up</h1>
          <input type="email" placeholder="email"  name="email"/>
          <input type="password" placeholder="password" name="email" />
          <input type="password" placeholder="conferm password" name="conferm_password" />
          <button>sign up</button>
        </form>
      </div>
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