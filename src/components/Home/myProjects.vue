<template>
    <div id="myProjects">
        <div class="container">
            <b-card title="Projects"
                    img-src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2Agnx?ver=d740"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 40rem; min-width: 20rem;"
                    class="mb-2">
                <b-table bordered striped hover :items="items" :fields="fields"> 
                 </b-table>
                <p class="card-text">
                View or manage your projects!
                </p>
                <b-button href="#" variant="primary">Go to projects list</b-button>
            </b-card>
            
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    name: 'myProjects',
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
    },
    beforeMount(){
    }
}

</script>

<style>


</style>

