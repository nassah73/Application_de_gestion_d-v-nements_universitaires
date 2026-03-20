export default function login(){
    return(
        <div className="container">
           <div className="bg-login">
              <button className="bt-signup">sign up</button>
           </div>
           <div className="signin">
            
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