<template>
    <div id="myTeam">
        <div class="container">
            <b-card title="Team"
                    img-src="https://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE2Agnx?ver=d740"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 40rem; min-width: 20rem;"
                    class="mb-2">

                <p class="card-text">
                View or manage your team! {{userData}}
                </p>
                <b-table bordered striped hover :items="items"> 
                 </b-table>
                 
                <b-button href="#" variant="primary" @click="redirect('editTeam')">Manage your team</b-button>
            </b-card>
            
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    name: 'myTeam',
    data() {
        return {
            items : [],
            role : null,
            userData : null,
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
        redirect(path){
            this.$router.push({ name: path})
        },
        getMyTeam(id){
            axios.get('http://127.0.0.1:8081/teams/' + id)
                .then(response => {
                    this.items = response.data;
                })
                .catch(e => {
                    this.errors.push(e)
            });
        },
    },
    beforeMount(){
        this.userData = JSON.parse(localStorage.user);
        //this.getMyTeam(userData.myTeam.id);
    }
}

</script>

<style>


</style>

