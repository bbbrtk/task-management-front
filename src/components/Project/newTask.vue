<template>
    <div id="newTask">
        <div class="container">
            <b-card border-variant="secondary"
                    header="Create new Task"
                    header-bg-variant="secondary"
                    align="center"
                    id = "myCard">
                

                <b-form v-on:submit.prevent="onSubmit" @reset="onReset" class="myForm">
                    <b-container fluid>
                    <b-row>
                        <b-col sm="2"><label >Name: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.name" 
                                                    placeholder="Enter task name">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >Type: </label></b-col>
                        <b-col sm="10"><b-form-select v-model="dtype" :options="dtypeOpt" class="mb-3" /></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >Project: </label></b-col>
                        <b-col sm="10"><b-form-select v-model="form.myProject" :options="projectOpt" class="mb-3" /></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >User: </label></b-col>
                        <b-col sm="10"><b-form-select v-model="form.myUser" :options="usersOpt" class="mb-3" /></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >State: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.state" 
                                                    placeholder="Enter state number">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >Attachment: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.attachment" 
                                                    placeholder="Enter attachment text">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >Deadline: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.deadline" 
                                                    type="date"> 
                        </b-form-input></b-col>
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
    name: 'newTask',
    data() {
        return {
            userData : null,
            usersOpt : [],
            projectOpt : [],
            form: {
                name: '',
                state: '',
                attachment: '',
                deadline: '',
            },

            dtype : null,
            dtypeOpt: [
                { value: null, text: 'Please select an option', disabled : true },
                { value: 'emails', text: 'Email' },
                { value: 'meetings', text: 'Meeting' },
                { value: 'testdrivings', text: 'TestDriving' },
                { value: 'developments', text: 'Development' },
            ]
        }
    }, 
    methods:{
        onSubmit(){

            // this.form.myUser.id = this.form.myUser.id
            console.log(this.form)
            axios.post('http://127.0.0.1:8081/'+ this.dtype, this.form)
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
            axios.get('http://127.0.0.1:8081/users')
                .then(response => {
                    this.items = response.data;
                    response.data.forEach(element => {
                        this.usersOpt.push({value : element, text: element.name})
                    });
                    console.log(this.clientOpt)
                })
                .catch(e => {
                    this.errors.push(e)
            });
        },
        listAllProjects(){
            axios.get('http://127.0.0.1:8081/projects')
                .then(response => {
                    this.anotheritems = response.data;
                    response.data.forEach(element => {
                        this.projectOpt.push({value : element, text: element.name})
                    });
                    console.log(this.clientOpt)
                })
                .catch(e => {
                    this.errors.push(e)
            });
        }
    },
    beforeMount(){
        this.userData = JSON.parse(localStorage.user);
        this.listAllUsers();
        this.listAllProjects();
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

