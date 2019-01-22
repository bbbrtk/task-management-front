<template>
    <div id="editTeam">
        <div class="container">
             <b-card border-variant="secondary"
                    header="Edit your Team"
                    header-bg-variant="secondary"
                    align="center"
                    id = "myCard">
                

                <b-form v-on:submit.prevent="onSubmit" @reset="onReset" class="myForm">
                    <b-container fluid>
                    <b-row>
                        <b-col sm="2"><label >Name: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.name"
                                                    :value="team.name">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >Capacity: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.capacity"
                                                    :value="team.capacity">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >Company: </label></b-col>
                        <b-col sm="10"><b-form-select v-model="form.myCompany" :options="companies" class="mb-3" /></b-col>
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
    name: 'editTeam',
    data() {
        return {
            form: {
                id:'',
                // email: '',
                // name: '',
                // forename: '',
                // info: '',
                // type: '',
                // certificate: '',
                // position: '',
                // type : '',
            },

            company : null,
            companies : [],
            team : null,


        }
    }, 
    methods:{
        
        onSubmit(){
            // console.log(this.form)

            console.log(this.form)
            axios.put('http://127.0.0.1:8081/teams/' + this.team.id, this.form)
                .then(response => {
                    this.$router.go(-1)
                })
                .catch(e => {
                    this.errors.push(e)
            });
        },
        onReset(){

        },
        getTeamById(id){
            axios.get('http://127.0.0.1:8081/teams/'+ id)
                .then(response => {
                    this.team = response.data
                    this.form.id = id
                })
                .catch(e => {
                    this.errors.push(e)
            }); 
        },
        getCompanies(){
            axios.get('http://127.0.0.1:8081/companies')
                .then(response => {
                    response.data.forEach(element => {
                        this.companies.push({value : element, text: element.name})
                    });
                })
                .catch(e => {
                    this.errors.push(e)
            });
        }
    },
    beforeMount(){
        this.getTeamById(this.$route.params.id);
        this.getCompanies();
    }, 
    mounted(){
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

