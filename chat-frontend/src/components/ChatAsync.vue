<template>
<div id="main">
  <section id="addchatdiv" v-if="aberto">
    <div id="numinfo">
      <h1>Your Number ID:</h1>
      <p>{{ user.number }}</p>
    </div>
    <div id="adds">
      <div id="searchdiv">
        <input type="text" placeholder="Enter someone's number to start a chat" @keyup.enter="search" v-model="to">
        <i class="bi bi-box-arrow-in-right" @click="search"></i>
      </div>
      <div v-if="pesquisaboolean" id="pesquisadiv">
        <i class="bi bi-person-circle"></i>
        <h1>{{ pesquisa.username }}</h1>
        <button @click="enterchat(to)">Enter Chat</button>
      </div>
    </div>
  </section>
  <section id="chat">
    <div id="chatinfo">
      <i class="bi bi-three-dots-vertical" id="moreoptions"></i>
      <i class="bi bi-person-circle" id="chatperfil"></i>
    </div>
    <div id="messagebody">
      <div v-for="(message, index) in messages" :key="index" :class="message.from == user.number ? 'messageprimary' : 'messagesecondary'">
        {{ message.content }}
      </div>
    </div>
    <div id="navmessage">
      <i class="bi bi-file-plus" id="add"></i>
      <input type="text" id="inputstyle" placeholder="Type your message here" v-model="text" @keyup.enter="submitmessage">
      <button id="sendstyle" @click="submitmessage">
        <i class="bi bi-send-fill"></i>
      </button>
    </div>
  </section>
  <section id="otherchats">
    <div id="navup">
      <button id="addchat" @click="aberto = !aberto"><i class="bi bi-plus"></i></button>
      <h1>Add Chat</h1>
    </div>
    <div v-for="(chat, index) in chats" :key="index" class="chatstyle" @click="enterchat(chat.numberID)">
      <div class="userprofile">
        <i class="bi bi-person-circle"></i>
      </div>
      <div class="namechat">
        <h1>{{ chat.name }}</h1>
      </div>
    </div>
  </section>
</div>
</template>



<script setup>

import io from 'socket.io-client';
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';


const router = useRouter();
const store = useStore();

var aberto = ref(false);
var user = ref();
var chats = ref();


if(!store.state.logged){
router.push('/login/up');
}
else {
  const credentials = JSON.parse(localStorage.getItem('credentials'));
  await axios.post('http://localhost:5050/api/auth/login', {
    email: credentials.email,
    password: credentials.password
  }).then((response) => {
    user.value = response.data.profile;
    chats.value = user.value.chats;
  }).catch((err) => {
    router.push('/login/up');
    console.log(err);
  });
}




const socket = io('http://localhost:5050', {
  transports: ['websocket'],
});
var text = ref();
var pesquisa = ref();
var pesquisaboolean = ref();
var to = ref();
var messages = ref([]);


var search = async () => {
  try{
    var res = await axios.post('http://localhost:5050/api/auth/NumberID', {
    numberID: to.value
    });
    pesquisaboolean.value = true;
    pesquisa.value = res.data.profile;

  }
  catch(e) {
    if(e.response.status == 400){
      pesquisaboolean.value = true;
      pesquisa.value = "This Number ID dont exists";
    }
    else {
      console.log(e);
    }
  }

}



var enterchat = async (numberID) => {
  aberto.value = false;
  to.value = numberID;
  try{
    const res = await axios.post("http://localhost:5050/api/auth/SearchMessage", {
      from: user.value.number,
      to: numberID
    });
    messages.value = res.data;
    const response = await axios.post('http://localhost:5050/api/auth/UpdateChats', {
      ChatID: numberID,
      UserID: user.value._id
    });
    chats.value = response.data;
    var el = document.getElementsByClassName("chatstyle");
    for (let i = 0; i < el.length; i++) {
      el[i].classList.remove("selected");
    }
    el[0].classList.add("selected");
  }
  catch(e){
    console.log(e);
  }
}

enterchat(chats.value[0].numberID);

var submitmessage = async () => {
  try{
    const res = await axios.post("http://localhost:5050/api/auth/CreateMessage", {
    content: text.value,
    from: user.value.number,
    to: to.value
    });
    text.value = "";
    var message = res.data;
    socket.emit('SendMessage', message._id);
  }
  catch(e) {
    console.log(e);
  }
};



socket.on('connect', () => {
  console.log('connected');
});

socket.on('message', (message) => {
  messages.value.push(message);
});

socket.on('disconnect', () => {
  console.log('disconnected');
});





</script>


<style>

.chatstyle {
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
}
.chatstyle h1 {
  font-size: 1.5em;
}

.userprofile {
  width: 25%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.userprofile i {
  font-size: 1.5em;
}

.namechat {
  width: 75%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chatstyle:hover {
  cursor: pointer;
  background: rgba(255, 255, 255, 0.085);
}

.selected {
  background-color: rgba(50, 205, 50, 0.232) !important;
}

#main {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row;
  color: white;
}

#addchatdiv{
  width: 50%;
  height: 60%;
  background: rgb(19, 18, 18);
  box-shadow: 2px 2px 10px black;
  border-radius: 12px;
  position: absolute;
  top:50%; 
  left:50%;
  transform: translate(-50%, -50%);
}
#numinfo {
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
#numinfo h1 {
  text-align: center;
  font-size: 2em;
}
#numinfo p {
  font-size: 1em;
  text-align: center;
}

#adds {
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
#searchdiv {
  width: 50%;
  height: 15%;
  display: flex;
  flex-direction: row;;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.718);
  box-shadow: 2px 0px 10px limegreen;
  border-radius: 15px;
  border-left: 5px solid limegreen;
}

#searchdiv input {
  outline: none;
  border: none;
  background-color: transparent;
  width: 90%;
  height: 100%;
  padding-left: 5%;
  color: white;
}
#searchdiv i {
  color: limegreen;
  font-size: 1.5em;
  width: 10%;
  transition: all 0.5s;
}
#searchdiv i:hover {
  color: lime;
  transform: scale(1.10);
}

#pesquisadiv {
  width: 50%;
  height: 40%;
  background: rgba(0, 0, 0, 0.626);
  border-radius: 15px;
  display: flex;
  margin-top: 5%;
  align-items: center;
  justify-content: space-between;
  padding-left: 5%;
  padding-right: 5%;
}

#chat {
  width: 70%;
  height: 92%;
  display: flex;
  flex-direction: column;
  margin-top: 8vh;
}
#otherchats {
  width: 30%;
  height: 92%;
  margin-top: 8vh;
  background: rgba(0, 0, 0, 0.775);
  display: flex;
  flex-direction: column;
}
#navup {
  width: 100%;
  height: 15%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-bottom: 5%;
}
#addchat {
  position:relative;
  width: 10%;
  padding-bottom: 10%;
  background: limegreen;
  border-radius: 50%;
  outline: none;
  border: none;
}
#navup h1 {
  font-size: 1.5em;
  margin-left: 15px;
}
#addchat i {
  position:absolute;
  top:50%; 
  left:50%;
  transform: translate(-50%, -50%);
  color: black;
  font-size: 2em;
}
#navmessage {
  width: 100%;
  height: 10%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 5%;
  padding-right: 5%;
  background: #0e0e0ec7;
}
#messagebody {
  width: 100%;
  height: 80%;
  padding: 10px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  gap: 2%;
}

.messageprimary {
  padding: 1%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(50, 205, 50, 0.314);
  border-radius: 10px;
  margin-left: auto;
}

.messagesecondary {
  padding: 1%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.714);
  border-radius: 10px;
  margin-right: auto;
}

.messagesecondary h1, .messageprimary h1 {
  font-size: 1.5em;
}

#chatinfo {
  width: 100%;
  height: 10%;
  background: rgba(14, 14, 14, 0.659);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 2%;
  padding-right: 2%;
}
#moreoptions {
  font-size: 1.5em;
}
#chatperfil {
  font-size: 2em;
}
#add {
  color: white;
  font-size: 1.5em;
}
#inputstyle{
  border: none;
  outline: none;
  background-color: rgba(0, 0, 0, 0.533);
  width: 70%;
  height: 80%;
  border-radius: 15px;
  padding-left: 2.5%;
  color: white;
}

#sendstyle {
  border: none;
  outline: none;
  background: limegreen;
  width: 15%;
  height: 80%;
  border-radius: 10px;
  box-shadow: 2px 0px 10px limegreen;
}
#sendstyle i {
  font-size: 1.5em;
  color: black;
}

</style>