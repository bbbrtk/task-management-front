<template>
    <div id="newClient">
        <div class="container">
            <b-card border-variant="secondary"
                    header="Create new Client"
                    header-bg-variant="secondary"
                    align="center"
                    id = "myCard">
                

                <b-form v-on:submit.prevent="onSubmit" @reset="onReset" class="myForm">
                    <b-container fluid>
                    <b-row>
                        <b-col sm="2"><label >Name: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.name" 
                                                    placeholder="Enter client name">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >NIP: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.nip" 
                                                    placeholder="Enter NIP number">
                        </b-form-input></b-col>
                    </b-row>    
                    <b-row>
                        <b-col sm="2"><label >Asset: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.asset" 
                                                    placeholder="Enter asset value">
                        </b-form-input></b-col>
                    </b-row>   
                    <b-row>
                        <b-col sm="2"><label >Date of estimation: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.dateOfEst" 
                                                    placeholder="Enter date in YYYY-MM-DD format">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >Description: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.description" 
                                                    placeholder="Enter description text">
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
    name: 'newClient',
    data() {
        const user = JSON.parse(localStorage.user);
        return {
            userData : null,
            form: {
                name: '',
                nip: '',
                asset: '',
                dateOfEst: '',
                description: '',
            },
        }
    }, 
    methods:{
        onSubmit(){
            // this.form.team = null;
            let config = {
                'Access-Control-Allow-Origin' : '*',
            }
            // axios.defaults.headers.get['Access-Control-Allow-Origin'] = true;
            axios.post('http://127.0.0.1:8081/clients', this.form)
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
        this.userData = JSON.parse(localStorage.user);
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

