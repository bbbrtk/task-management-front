<template>
    <div id="newTeam">
        <div class="container">
            <b-card border-variant="secondary"
                    header="Create new Team"
                    header-bg-variant="secondary"
                    align="center"
                    id = "myCard">
                

                <b-form v-on:submit.prevent="onSubmit" @reset="onReset" class="myForm">
                    <b-container fluid>
                    <b-row>
                        <b-col sm="2"><label >Name: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.name" 
                                                    placeholder="Enter team name">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >Capacity: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.capacity" 
                                                    placeholder="Enter team capacity">
                        </b-form-input></b-col>
                    </b-row>    
                    <b-row>
                        <b-col sm="2"><label >Company: </label></b-col>
                        <b-col sm="10"><b-form-select v-model="form.myCompany" :options="clientOpt" class="mb-3" /></b-col>
                    </b-row>
                    {{curCompany}}
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
    name: 'newTeam',
    data() {
        const user = JSON.parse(localStorage.user);
        return {
            userData : null,
            curCompany : null,
            clientOpt : [],
            form: {
                name: '',
                capacity: '',
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
            axios.post('http://127.0.0.1:8081/teams', this.form)
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
        listThisCompany(){
            axios.get('http://127.0.0.1:8081/companies')
                .then(response => {
                    this.items = response.data;
                    response.data.forEach(element => {
                        this.clientOpt.push({value : element, text: element.name})
                    });
                })
                .catch(e => {
                    this.errors.push(e)
            });
        }
    },
    beforeMount(){
        this.userData = JSON.parse(localStorage.user);
        this.listThisCompany();
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

