<template>
    <div id="login">
        
    </div>
</template>


<script>
import axios from 'axios';

export default {
    name: 'login',
    data() {
        return {
            posts: [],
            errors: []
        }
    }, 
    beforeMount(){
        let config = {
            'Access-Control-Allow-Origin' : '*',
        }
        // axios.defaults.headers.get['Access-Control-Allow-Origin'] = true;
        axios.get('http://127.0.0.1:8081/users',config)
            .then(response => {
                this.posts = response.data
            })
            .catch(e => {
                this.errors.push(e)
            });

            console.log(this.posts)
    }
}


</script>

<style>




</style>

