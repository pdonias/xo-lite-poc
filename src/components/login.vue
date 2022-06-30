<template>
    <div class="form-container">
        <form @submit.prevent="handleSubmit">
            <img alt="XO Lite" src="../assets/logo.png" />
            <h1>Xen Orchestra Lite</h1>
            <input type="text" v-model="login" name="login" readonly/>
            <input type="password" v-model="password" name="password" placeholder="Password"/>
            <input type="submit" value="Login" @disabled="xenApiStore.isConnecting"/>
        </form>
    </div>
</template>


<script lang="ts" setup>
import { useXenApiStore } from '@/stores/xen-api.store';
import { ref } from 'vue';

const xenApiStore = useXenApiStore();
const login=ref("root")
const password=ref("")

async function handleSubmit(){
    console.log({login:login.value, password : password.value})
    await xenApiStore.connect(login.value, password.value) 
    xenApiStore.init()
}

</script>

<style scoped>
.form-container{
    flex:1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--background-color-primary);
    height:100vh;

}

form{
    display: flex;
    flex-direction: column;
    margin:0 auto;
    background-color: var(--background-color-secondary);
    padding:0 0 8.5rem 0;
    align-items: center;
    justify-content: center;

}
h1{
    font-size: 900;
    font-size: 4.8rem;
    line-height: 7.2rem;
    margin-bottom:4.2rem
}

img{
    width:60rem
}
label{
    margin:1.5rem 0 0.5rem 0;
    font-weight: bold;
    font-size:120%;
}
input{
    padding: 1rem 1.5rem;
    border: 1px solid var(--color-blue-scale-400);
    background-color: white;
    border-radius: 0.8rem;
    width:45rem;
    margin-bottom: 1rem
}
input[type=submit]{
    margin: 2rem 0rem;
    background-color: var(--color-extra-blue-base);
    color: var(--color-blue-scale-500);
    border:none;
    width: 10rem;
    margin:0
}

</style>