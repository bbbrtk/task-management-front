<template>
    <div id="login">
        <div class="container">
            <b-row class="justify-content-md-center myLoginPanel">
                <b-card bg-variant="light">
                    <b-row class="text-center">
                        <b-col class="text-right">
                            <h1>L</h1>
                        </b-col>
                        <b-col>
                            <img src="@/assets/boobs.svg" class="boobs" alt="Kiwi standing on oval">
                        </b-col>
                        <b-col class="text-left">    
                            <h1>IN</h1>
                        </b-col>
                    </b-row>
                    <b-form v-on:submit.prevent="onSubmit">
                        <b-form-group>
                        <b-form-input placeholder="Enter your name"  v-model="form.name" ></b-form-input>
                        </b-form-group>
                        <b-form-group>
                        <b-form-input placeholder="Enter your password" type="password"></b-form-input>
                        </b-form-group>
                        <b-button type="reset" size="sm" variant="link">register</b-button>
                        <b-button type="submit" variant="success">Login</b-button>
                    </b-form>
                </b-card>
            </b-row>
        </div>
    </div>
</template>



<script>
import axios from "axios";
import { delay } from 'q';

  export default {
    name: 'login',
    data() {
        return {
            form: {
                name: '',
            },
        }
    },
    mounted() {},
    methods: {
        onSubmit(){
            let config = {
                'Access-Control-Allow-Origin' : '*',
            }
            // axios.defaults.headers.get['Access-Control-Allow-Origin'] = true;
            axios.post('http://127.0.0.1:8081/users/auth', this.form.name)
                .then(response => {
                    if(response.data == 1){
                        // console.log("got it")
                        // this.$parent.login(this.form.name)
                        // this.$parent.localStorage.username = this.form.name;
                        this.$parent.username = this.form.name;
                    }
                    else{
                        console.log('duupsko');
                    }
                })
                .catch(e => {
                    // this.errors.push(e)
                    console.log(e)
            });
        },
    },
    components: {
    },
  }

</script>

<style>

.boobs{
    max-height: 66px;
}

.myLoginPanel{
    margin-top: 44px;
    border-color: #33a3b8;
}

</style>