<template>
    <div id="newUser">
        <div class="container">
            <b-card border-variant="secondary"
                    header="Create new Project"
                    header-bg-variant="secondary"
                    align="center"
                    id = "myCard">
                

                <b-form v-on:submit.prevent="onSubmit" @reset="onReset" class="myForm">
                    <b-container fluid>
                    <b-row>
                        <b-col sm="2"><label >Name: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.name" 
                                                    placeholder="Enter project name">
                        </b-form-input></b-col>
                    </b-row>
                    <!-- <b-row>
                        <b-col sm="2"><label >Duration: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.duration" 
                                                    placeholder="Enter duration">
                        </b-form-input></b-col>
                    </b-row> -->
                    <b-row>
                        <b-col sm="2"><label >Client: </label></b-col>
                        <b-col sm="10"><b-form-select v-model="form.myClient" :options="clientOpt" class="mb-3" /></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >Users: </label></b-col>
                        <b-col sm="10">
                            <b-form-checkbox-group id="checkboxes1" name="flavour1" v-model="form.workerIds" :options="workers">
                            </b-form-checkbox-group>
                        </b-col>
                    </b-row>
                   
                </b-container>
                    <b-button type="submit" variant="primary">Submit</b-button>
                    <b-button type="reset" variant="danger">Reset</b-button>
                </b-form>
            </b-card>            
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    name: 'newProject',
    data() {
        const user = JSON.parse(localStorage.user)
        //console.log(user.dtype)
        return {
            items: [],
            clients: [],
            form: {
                duration: 0,
                name: '',
                myClient: null,
            },
            clientOpt: [],
            workers : [],
        }
    }, 
    methods:{
        onSubmit(){
            axios.post('http://127.0.0.1:8081/projects', this.form)
                .then(response => {
                    //console.log(response.data);
                    this.refreshUser();
                    this.$router.go(-1)
                })
                .catch(e => {
                    this.errors.push(e)
            });
            
        },
        onReset(){

        },
        refreshUser(){
            var user = JSON.parse(localStorage.user)
            axios.get('http://127.0.0.1:8081/users/' + user.id)
                .then(response => {
                    localStorage.user = JSON.stringify(response.data)
                })
                .catch(e => {
                    this.errors.push(e)
            });
        },
        listAllWorkers(){
            axios.get('http://127.0.0.1:8081/workers')
                .then(response => {
                    this.items = response.data;
                    response.data.forEach(element => {
                        this.workers.push({value : element.id, text: element.name})
                    });
                })
                .catch(e => {
                    this.errors.push(e)
            });
        },
        listAllClients(){
            axios.get('http://127.0.0.1:8081/clients')
                .then(response => {
                    this.items = response.data;
                    response.data.forEach(element => {
                        this.clientOpt.push({value : element, text: element.name})
                    });
                    console.log(this.clientOpt)
                })
                .catch(e => {
                    this.errors.push(e)
            });
        }
    },
    beforeMount(){
        this.listAllClients();
        this.listAllWorkers();
        
    }
}

</script>

<style>

#myCard{
    margin-top: 60px;
}

.myForm > .b-row {
    margin: 10px !important;
}


</style>

