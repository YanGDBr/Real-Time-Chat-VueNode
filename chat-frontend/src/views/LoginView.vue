<template>
<div id="main">
    <div id="welcome">
      <h1 v-if="re">Welcome <span style="color: limegreen; font-weight: 800;">{{ namedisplay }}</span> <br> To a Web Chat</h1>
      <h1 v-if="!re">Welcome back, <span style="color: limegreen; font-weight: 800;">{{ namedisplay }}</span></h1>
    </div>
    <form>
      <div id="titu">
        <h2>{{ buttonText }}</h2>
      </div>
      <div class="normal" v-if="re">
        <div class="inputcss" v-if="!next">
          <div class="separado">
            <label for="name">Username</label>
            <label style="color: red; font-weight: 700;">{{ errorname }}</label>
          </div>
          <input type="text" name="name" v-model="name" placeholder="Your Username">
        </div>
        <div class="inputcss" v-if="!next">
          <div class="separado">
            <label for="email">Email</label>
            <label style="color: red; font-weight: 700;">{{ erroremail }}</label>
          </div>
          <input type="email" name="email" v-model="email" placeholder="Email Adress">
        </div>
        <div class="inputcss pers" v-if="next">
          <div class="persdiv">
            <div class="separado">
              <label for="password">Password</label>
              <label style="color: red; font-weight: 700;">{{ errorpassword }}</label>
            </div>
            <input :type="mudarvisivel.viv" name="password" v-model="password" placeholder="Your Password">
          </div>
          <section>
            <i :class="mudarvisivel.olho" @click="visivel = !visivel"></i>
          </section>
          
        </div>
        <div class="inputcss pers" v-if="next" >
          <div class="persdiv" >
            <div class="separado">
              <label for="cpassword">Confirm Password</label>
              <label style="color: red; font-weight: 700;">{{ errorcpassword }}</label>
            </div>
            <input :type="mudarvisivelc.viv" name="cpassword" v-model="cpassword" placeholder="Confirm Password">
          </div>
          <section>
            <i :class="mudarvisivelc.olho" @click="visivelc = !visivelc"></i>
          </section>
        </div>
        <div class="frases">
          <p @click="mudarlogin()">{{ TextCreation }}</p>
          <label style="color: lightcoral; font-weight: 700; font-size: 0.7em;">{{ dontmatch }}</label>
        </div>
        <button @click="proximo" type="button" v-if="!next">NEXT</button>
        <button @click="submit" type="button" v-if="next">{{ buttonText }}</button>
      </div>
      <div class="normal" v-if="!re">
        <div class="inputcss">
          <div class="separado">
            <label for="email">Email</label>
            <label style="color: red; font-weight: 700;">{{ erroremail }}</label>
          </div>
          <input type="email" name="email" v-model="email" placeholder="Email Adress">
        </div>
        <div class="inputcss pers">
          <div class="persdiv" >
            <div class="separado">
              <label for="password">Password</label>
              <label style="color: red; font-weight: 700;">{{ errorpassword }}</label>
            </div>
            <input :type="mudarvisivel.viv" name="password" v-model="password" placeholder="Your Password">
          </div>
          <section>
            <i :class="mudarvisivel.olho" @click="visivel = !visivel"></i>
          </section>
          
        </div>
        <div class="frases">
          <p>Forgot My Password</p>
          <p @click="mudarlogin()">{{ TextCreation }}</p>
        </div>
        <label style="color: red; font-weight: 700; text-align: center;">{{ dontmatch }}</label>
        <button @click="submit" type="button">{{ buttonText }}</button>
      </div>
    </form>
</div>
</template>

<script>
import axios from 'axios';
import { ref, watch, computed} from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useStore } from 'vuex';

export default {
  name: 'LoginView',
  components: {
    
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    var re = ref();
    var next = ref();
    if(route.params.pre == "in"){
      re.value = false;
      next.value = true;
    }
    else {
      re.value = true;
      next.value = false;
    }
    var namedisplay = ref('User');
    var name = ref('');
    var email = ref('');
    var password = ref('');
    var cpassword = ref('');
    var errorname = ref('');
    var erroremail = ref('');
    var errorpassword = ref('');
    var errorcpassword = ref('');
    var dontmatch = ref('');
    var Forma = ref("REGISTER");
    var TextCreation = ref("Sign In");

    var visivel = ref(false);
    var visivelc = ref(false);

    var mudarvisivel = computed(() => {
      var olho, viv;
      if(visivel.value){
        olho = "bi bi-eye";
        viv = "text";
      }
      else {
        olho = "bi bi-eye-slash";
        viv = "password";
      }
      return { olho, viv };
    })

    function errorclean(){
      errorname.value = "";
      erroremail.value = "";
      errorpassword.value = "";
      errorcpassword.value = "";
      dontmatch.value = "";
    }

    var proximo = async () => {
      var elemento = document.getElementsByClassName("inputcss");
      if(name.value == ""){
        errorname.value = "Empty";
        elemento[0].style.borderLeft = "5px solid red";
        elemento[0].style.boxShadow = "-10px 0px 20px -10px red";
      }
      if(email.value == ""){
        erroremail.value = "Empty";
        elemento[1].style.borderLeft = "5px solid red";
        elemento[1].style.boxShadow = "-10px 0px 20px -10px red";
      }
      if(email.value != "" && name.value != ""){
        var verify = await axios.post("http://localhost:5050/api/auth/verifyEmail", { email: email.value} )
        if(!verify.data){
          next.value = true;
          errorclean();
        }
        else {
          elemento[1].style.borderLeft = "5px solid yellow";
          elemento[1].style.boxShadow = "-10px 0px 20px -10px yellow";
          dontmatch.value = "This email has already been registered"
        }
        
        
      }
    }

    var mudarvisivelc = computed(() => {
      var olho, viv;
      if(visivelc.value){
        olho = "bi bi-eye";
        viv = "text";
      }
      else {
        olho = "bi bi-eye-slash";
        viv = "password";
      }
      return { olho, viv };
    })
    

    var mudarlogin = () => {
      if(re.value){
        Forma.value = "LOGIN";
        TextCreation.value = "New User?";
      }
      else {
        Forma.value = "REGISTER";
        TextCreation.value = "Sign In";
      }
      errorclean();
      re.value = !re.value;
      next.value = !re.value;
    }
    var buttonText = computed(() => {
      var text;
      if(re.value){
        text = "Register";
      }
      else {
        text = "Login";
      }
      return text;
    })

    var submit = async () => {
      var elemento = document.getElementsByClassName("inputcss");
      if(re.value){
        if(password.value == ""){
          errorpassword.value = "Empty";
          elemento[0].style.borderLeft = "5px solid red";
          elemento[0].style.boxShadow = "-10px 0px 20px -10px red";
        }
        if(cpassword.value == ""){
          errorcpassword.value = "Empty";
          elemento[1].style.borderLeft = "5px solid red";
          elemento[1].style.boxShadow = "-10px 0px 20px -10px red";
        }
        if(password.value != "" && cpassword.value != ""){
          if(password.value != cpassword.value){
            dontmatch.value = "Passwords don't match";
            elemento[0].style.borderLeft = "5px solid red";
            elemento[1].style.borderLeft = "5px solid red";
            elemento[0].style.boxShadow = "-10px 0px 20px -10px red";
            elemento[1].style.boxShadow = "-10px 0px 20px -10px red";
          }
          else {
            try{
              const res = await axios.post('http://localhost:5050/api/auth/register', {
              username: name.value,
              email: email.value,
              password: password.value,
              });
              localStorage.setItem('token', res.data.token);
              store.dispatch('updateLocalStorageValue', true);
              localStorage.setItem('credentials', JSON.stringify({ email: email.value, password: password.value}));
              setTimeout(() => {
                router.push('/chat');
              }, 2000)
              
            }catch(e){
              if(e.response){
                dontmatch.value = e.response.data.msg;
              }
              else {
                dontmatch.value = e;
              }
            }
            
          }
        }
        
      } else {
        if(email.value == ""){
          erroremail.value = "Empty";
          elemento[0].style.borderLeft = "5px solid red";
          elemento[0].style.boxShadow = "-10px 0px 20px -10px red";
        }
        if(password.value == ""){
          errorpassword.value = "Empty";
          elemento[1].style.borderLeft = "5px solid red";
          elemento[1].style.boxShadow = "-10px 0px 20px -10px red";
        }
        if(password.value != "" && email.value != ""){
          try{
            const res = await axios.post('http://localhost:5050/api/auth/login', {
            email: email.value,
            password: password.value
            });
            localStorage.setItem('token', res.data.token);
            store.dispatch('updateLocalStorageValue', true);
            localStorage.setItem('credentials', JSON.stringify({ email: email.value, password: password.value}));
            namedisplay.value = res.data.profile.username;
            setTimeout(() => {
              router.push('/chat');
            }, 2000)
          }
          catch(e) {
            if(e.response){
              dontmatch.value = e.response.data.msg;
            }
            else {
              dontmatch.value = e;
            }
            
          }
          
        }
      }

    }



    watch(name, (newValue) => {
      if(newValue == ""){
        namedisplay.value = "User";
      }
      else {
        namedisplay.value = name.value;
      }
    });
    watch(() => route.params.pre, (newValue) => {
      if(newValue == "up"){
        re.value = true;
        next.value = false;
        errorclean();
      }else {
        re.value = false;
        next.value = true;
        errorclean();
      }
    })
    


    return {
      re,
      Forma,
      mudarlogin,
      TextCreation,
      namedisplay,
      name,
      buttonText,
      next,
      mudarvisivel,
      mudarvisivelc,
      visivel,
      visivelc,
      email,
      password,
      cpassword,
      errorname,
      erroremail,
      errorcpassword,
      errorpassword,
      dontmatch,
      proximo,
      submit
    }
  }
}
</script>



<style scoped>

#main {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
}


#titu {
  width: 100%;
  height: 10%;
  margin-top: 5%;
  display: flex;
  align-items: center;
  justify-content: center;
}

#titu h2 {
  font-size: 1.5em;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase
}

.normal {
  width: 100%;
  height: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4%;
}

.inputcss {
  width: 100%;
  height: 25%;
  border: 2px solid rgba(255, 255, 255, 0.556);
  border-left: 5px solid limegreen;
  box-shadow: -10px 0px 20px -10px limegreen;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
}


.inputcss label {
  color: rgba(255, 255, 255, 0.693);
}


.inputcss input {
  outline: none;
  border: none;
  background: transparent;
  border-bottom: 1px solid rgb(255, 255, 255);
  width: 90%;
  height: 50%;
  color: white;
  padding-left: 1%;
  margin-left: 5%;
  margin-bottom: 3%;
}
.inputcss input:focus{
  border-bottom: 5px solid rgb(131, 4, 169);
  border-radius: 5px;
}

.inputcss input:-webkit-autofill{
  -webkit-text-fill-color: #ffffff;
  -webkit-box-shadow: 0 0 0px 1000px #191919 inset;
}

.separado {
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-right: 5%;
  padding-left: 5%;
  padding-top: 2%;
}

.pers {
  display: flex;
  flex-direction: row;
  padding: none;
}

.persdiv {
  width: 85%;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.persdiv input {
  width: 100%;
}
.pers section {
  width: 15%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pers section i {
  font-size: 1.4em;
  cursor: pointer;
}


.password {
  width: 100%;
  height: 25%;
  padding-left: 5%;
  padding-right: 5%;
  border-radius: calc(0.10 * 35vh);
  background-color: rgb(216, 252, 197);
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  justify-content: center;
  align-items: center;
}
.password input {
  width: 75%;
  height: 100%;
  box-sizing: border-box;
  outline: none;
  border: none;
  background-color: transparent;
}
.password i {
  margin-left: auto;
  font-size: 1.75em;
  cursor: pointer;
}



#welcome {
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
}
#welcome h1 {
  font-weight: 600;
  letter-spacing: 1px;
  font-size: 2em;
}

form {
  display: flex;
  flex-direction: column;
  background-color: #000000ca;
  width: 25%;
  min-width: 350px;
  height: 60%;
  border-radius: 20px;
  padding: 2%;
  box-shadow: -1px -1px 19px -2px rgba(18, 70, 31, 0.75);
  border-bottom: 2px solid green;
  border-right: 2px solid green;
}

form button {
  width: 80%;
  height: 15%;
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: transparent;
  outline: 5px solid rgba(0, 255, 0, 0.852);
  letter-spacing: 2px;
  font-weight: 800;
  transition: all 0.5s;
  color: white;
  text-transform:uppercase;
  
}
form button:hover {
  background-color: rgba(0, 255, 0, 0.852);
  outline: none;
  color: black;
  
}


.frases {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.frases p {
  cursor: pointer;
  color: rgba(5, 99, 222, 0.801);
  text-decoration:underline;
}




</style>