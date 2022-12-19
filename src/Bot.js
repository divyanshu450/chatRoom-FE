const Bot = {
    hello : "hello",
    hi : "hello",
    hii : "hello",
    helo : "hello",
    halo : "hello",
    howareyou : "I am fine. What about you?",
    iamalsofine : "Okay!! 😊",
    goodmorning : "Good Morning  🛣",
    goodafternoon : "Good Afternoon 🏜",
    goodnight : "Good Night ✨",
    bye : "Bye 👋",
    

}

// Here botmsg is getting data as message and returning key value of Bot.

const botmsg = (message)=>{
    let newMsg = message.replace(/[? ]/gi,'').toLowerCase();
    if( Bot.hasOwnProperty(newMsg) ) {
        return Bot[newMsg];
       
    }
    else{
        return "Didn't get you."
    }
}




export default botmsg;