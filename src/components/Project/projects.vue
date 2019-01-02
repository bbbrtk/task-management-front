<template>
    <div id="projects">
        <div class="container">
            
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    name: 'projects',
    data() {
        return {
            role : null,
        }
    }, 
    methods:{
        onSubmit(){
            axios.post('http://127.0.0.1:8081/'+ this.role, this.form)
                .then(response => {
                    console.log(response.data);
                    this.$router.go(-1)
                })
                .catch(e => {
                    this.errors.push(e)
            });
        },
        onReset(){

        },
        listAllUsers(){
            axios.get('http://127.0.0.1:8081/projects')
                .then(response => {
                    this.items = response.data;
                    
                })
                .catch(e => {
                    this.errors.push(e)
            });
        }
    },
    beforeMount(){
        this.listAllProjects();
    }
}

</script>

<style>


</style>

