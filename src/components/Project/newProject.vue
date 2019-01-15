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
                    <b-row>
                        <b-col sm="2"><label >Duration: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.duration" 
                                                    placeholder="Enter duration">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >Client: </label></b-col>
                        <b-col sm="10"><b-form-select v-model="form.myClient" :options="clientOpt" class="mb-3" /></b-col>
                    </b-row>
                    <!-- <b-row>
                        <b-col sm="2"><label >Workers: </label></b-col>
                        <b-col sm="10"><b-form-select v-model="role" :options="roleOpt" class="mb-3" /></b-col>
                    </b-row> -->
                    
                </b-container>

                <template>
                    <b-table striped hover :items="items"></b-table>
                </template>
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
                duration: '',
                name: '',
                myManager: user,
                myClient: null,
            },
            clientOpt: [],
        }
    }, 
    methods:{
        onSubmit(){
            // this.form.team = null;
            let config = {
                'Access-Control-Allow-Origin' : '*',
            }
            // axios.defaults.headers.get['Access-Control-Allow-Origin'] = true;
            axios.post('http://127.0.0.1:8081/projects', this.form)
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

