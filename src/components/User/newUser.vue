<template>
    <div id="newUser">
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
                        <b-col sm="10"><b-form-select v-model="form.myTeam" :options="clientOpt" class="mb-3" /></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >Role: </label></b-col>
                        <b-col sm="10"><b-form-select v-model="role" :options="roleOpt" class="mb-3" /></b-col>
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
    name: 'newUser',
    data() {
        return {
            form: {
                email: '',
                name: '',
                forename: '',
            },
            role : null,
            team : null,
            clientOpt: [], 
            roleOpt: [
                { value: null, text: 'Please select an option', disabled : true },
                { value: 'managers', text: 'Manager' },
                { value: 'developers', text: 'Developer' },
                { value: 'customers', text: 'Customer' },
            ]
        }
    }, 
    methods:{
        onSubmit(){
            switch(this.role){
                case 'managers':
                    this.form['@type'] = 'Manager'
                    break
                case 'developers':
                    this.form['@type'] = 'Developer'
                    break
                case 'customers':
                    this.form['@type'] = 'Customer'
                break;
            }

            
            axios.post('http://127.0.0.1:8081/'+ this.role, this.form)
                .then(response => {
                    //console.log(response.data);
                    this.$router.go(-1)
                })
                .catch(e => {
                    this.errors.push(e)
            });
        },
        onReset(){
        },
        listAllTeams(){
            axios.get('http://127.0.0.1:8081/teams')
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
        this.listAllTeams();
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

