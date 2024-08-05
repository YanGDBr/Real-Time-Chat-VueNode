<template>
  <nav>
    <div id="navleft">
      <i class="bi bi-chat-text-fill" style="color: limegreen; font-size: 2em;"></i>
      <h1>Web Chat</h1>
      <RouterLink to="/" class="page">Home</RouterLink>
    </div>
    <div id="navright">
      
      <RouterLink to="/download" class="page">APK (WIP)</RouterLink>
      <RouterLink to="/chat" class="page">Chat</RouterLink>
      <RouterLink v-if="!$store.state.logged" to="/login/in" class="signin">Sign In</RouterLink>
      <RouterLink v-if="!$store.state.logged" to="/login/up" class="signup">Sign Up</RouterLink>
      <RouterLink v-if="$store.state.logged" to="/userconfig" id="userperfil"><i class="bi bi-person-circle"></i></RouterLink>
    </div>
  </nav>
  <RouterView/>
</template>

<script setup>
import { RouterLink } from 'vue-router';

</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap');
* {
  margin: 0;
  padding: 0;
}

#userperfil {
  color: white;
  font-size: 2.3em;
  width: 15%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}


nav {
  width: 100%;
  height: 8%;
  background-color: #0F0F0F;
  box-shadow: 10px 0px 10px 10px black;
  position: absolute;
  top: 0%;
  display: flex;
}

.page {
  outline: none;
  border: none;
  background: transparent;
  color: white;
  border-bottom: 1px solid white;
  margin-left: 5%;
  transition: all 0.5s;
  text-decoration: none;

}
.page:hover {
  transform: scale(1.15);
}

.signin {
  outline: none;
  border: none;
  margin-left: 5%;
  background-color: limegreen;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 800;
  width: 15%;
  height: 60%;
  border-radius: 8px;
  font-size: 0.8em;
  box-shadow: 2px 0px 10px lime;
  transition: all 0.5s;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  color: black;
}

.signup {
  outline: none;
  border: none;
  margin-left: 4%;
  background-color: transparent;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 800;
  color: white;
  width: 15%;
  height: calc(60% - 8px);
  border-radius: 5px;
  outline: 5px solid limegreen;
  font-size: 0.8em;
  box-shadow: 5px 0px 20px lime;
  transition: all 0.5s;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.signup:hover {
  outline: none;
  border: none;
  background-color: limegreen;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 800;
  width: 15%;
  height: 60%;
  border-radius: 8px;
  font-size: 0.8em;
  box-shadow: 2px 0px 10px lime;
  color: black;
}

.signin:hover {
  outline: none;
  border: none;
  background-color: transparent;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 800;
  color: white;
  width: 15%;
  height: calc(60% - 8px);
  border-radius: 5px;
  outline: 5px solid limegreen;
  font-size: 0.8em;
  box-shadow: 5px 0px 20px lime;
  
}

#navleft {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  padding-left: 5%;
}
#navleft h1 {
  font-size: 1.5em;
  margin: 0;
  padding: 0;
  font-weight: 700;
  margin-left: 5px;
}
#navright {
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 2%;
}
body {
  width: 100vw;
  height: 100vh;
}

#app {
  font-family: "Nunito", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100vw;
  height: 100vh;
  background-color: #191919;
  display: flex;
  color: white;
}

</style>
