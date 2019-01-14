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
                        <b-col sm="10"><b-form-select v-model="team" :options="teamOpt" class="mb-3" /></b-col>
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
            ]
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
                    //console.log(response.data);
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

#myCard{
    margin-top: 60px;
}

.myForm > .b-row {
    margin: 10px !important;
}


</style>

