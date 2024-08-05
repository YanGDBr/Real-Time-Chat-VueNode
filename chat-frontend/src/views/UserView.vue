<template>
    <div class="about">
      <h1><button id="logout" @click="logout">LOGOUT</button></h1>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';



const router = useRouter();
const store = useStore();

var logout = () => {
    
    store.dispatch('updateLocalStorageValue', false);
    router.push("/");
}

</script>

<style>

.about {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

#logout {
    background-color: red;
    border-radius: 10px;
    width: 100%;
    color: white;
    outline: none;
    border: none;
    font-size: 1em;
}
</style>
