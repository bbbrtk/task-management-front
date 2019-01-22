<template>
    <div id="myTask">
        <div class="container">
            <b-card title="Tasks"
                    img-src="http://handsontek.net/images/SharePoint/SharePointAPPTeams/hero.png"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 40rem; min-width: 20rem;"
                    class="mb-2">
                <p class="card-text">
                Check out your latest tasks!
                </p>
               
                 <b-table bordered striped hover :items="items" :fields="fields"> 
                 </b-table>



            </b-card>
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    name: 'myTasks',
    data() {
        return {
            role : null,
            userData : null,
            items : [],
            fields: [
                {
                    key:"name",
                    sortable: true
                },
                {
                    key:"id",
                    label: "ID",
                    sortable: true
                },
                {
                    key: 'state',
                    label:"State",
                    sortable: false
                },
            ],
        }
    }, 
    methods:{
        onSubmit(){
            axios.post('http://127.0.0.1:8081/'+ this.role, this.form)
                .then(response => {
                    
                    //console.log(response.data);
                    // this.$router.go(-1)
                })
                .catch(e => {
                    this.errors.push(e)
            });
        },
        onReset(){
        },
        listAllTasks(id){
            axios.get('http://127.0.0.1:8081/users/' + id + '/tasks')
                .then(response => {this.items = response.data; } )
                .catch(e => {
                    this.errors.push(e)
            });
        },
    },
    beforeMount(){
        const user = JSON.parse(localStorage.user);
        this.userData = JSON.parse(localStorage.user);
        this.listAllTasks(this.userData.id);
    }
}

</script>

<style>


</style>

