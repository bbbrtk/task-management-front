<template>
    <div id="editUser">
        <div class="container">
            <b-card border-variant="secondary"
                    header="Create new User"
                    header-bg-variant="secondary"
                    align="center"
                    id = "myCard">
                

                <b-form v-on:submit.prevent="onSubmit" @reset="onReset" class="myForm">
                    <b-container fluid>
                    <b-row>
                        <b-col sm="2"><label >Name: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.name" 
                                                    placeholder="Enter your name">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >Forname: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.forename" 
                                                    placeholder="Enter your forname">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >Email: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.email" 
                                                    placeholder="Enter email">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >Team: </label></b-col>
                        <b-col sm="10"><b-form-select v-model="team" :options="teamOpt" class="mb-3" /></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >Role: </label></b-col>
                        <b-col sm="10"><b-form-select v-model="role" :options="roleOpt" class="mb-3" /></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >Email: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.email" 
                                                    placeholder="Enter email">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row v-if="this.role in ['Customer', 'Developer']">
                        <b-col sm="2"><label > Info: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.info" 
                                                    placeholder="provide a short description, please">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row v-if="this.role in ['Customer']">
                        <b-col sm="2"><label > Type: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.type" 
                                                    placeholder="describe your type of visoring, please">
                    </b-form-input></b-col>
                    <b-row v-if="this.role in ['Position']">
                        <b-col sm="2"><label > Type: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.type" 
                                                    placeholder="describe your position, please">
                    </b-form-input></b-col>
                    <b-row v-if="this.role in ['Manager']">
                        <b-col sm="2"><label > Certificate: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.certificate" 
                                                    placeholder="provide your qualifications, please">
                    </b-form-input></b-col>
                    <!-- <b-row v-if="this.role in ['Developer']">
                        <b-col sm="2"><label > Team: </label></b-col>
                        <b-col sm="10"><b-form-select v-model="form.info" 
                                                    placeholder="provide your qualifications, please">
                    </b-form-input></b-col> -->
                    
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
    name: 'editUser',
    data() {
        return {
            form: {
                email: '',
                name: '',
                forename: '',
                info: '',
                type: '',
                certificate: '',
                position: '',
            },
            role : null,
            team : null,
            teamOpt: [
                { value: null, text: 'Please select an option', disabled : true },
                { value: 'some', text: 'Please select an option1' },
                { value: 'options', text: 'Please select an option2' },
                { value: 'available', text: 'Please select an option420' },

            ], 
            roleOpt: [
                { value: null, text: 'Please select an option', disabled : true },
                { value: 'managers', text: 'Manager' },
                { value: 'developers', text: 'Developer' },
                { value: 'customers', text: 'Customer' },
            ], 
            clients : [],
            managers : [],
            projetcts: [],

            role : null, 
            user : null,


        }
    }, 
    methods:{
        onSubmit(){
            // this.form.team = null;
            let config = {
                'Access-Control-Allow-Origin' : '*',
            }
            // axios.defaults.headers.get['Access-Control-Allow-Origin'] = true;
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
        getProjects(userId){
            
        },
        getClients(){
            this.clients = this.user.clients
        },
    },
    beforeMount(){
        this.user = JSON.parse(localStorage.user)
        this.role = user.dtype

        switch(this.role){
            case 'Developer':
                this.getProjects(user.id)
                break
            case 'Manager':
                this.getProjects(user.id)
                break
            case 'Customer':
                this.getClients(user.id)
                break
            default:
                console.log('who are you? '+ this.role)
        }

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

