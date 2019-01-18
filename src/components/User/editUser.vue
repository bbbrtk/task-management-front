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
                                                    :value="user.name">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >Forname: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.forename" 
                                                    :value="user.forename">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >Email: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.email" 
                                                    :value="user.email">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >Team: </label></b-col>
                        <b-col sm="10"><b-form-select v-model="team" :options="teams" class="mb-3" /></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >Role: </label></b-col>
                        <b-col sm="10"><b-form-select v-model="role" :options="roleOpt" class="mb-3" /></b-col>
                    </b-row>
                    <b-row v-if="role == 'Manager' || role == 'managers'">
                        <b-col sm="2"><label >Certificate: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.certificate" 
                                                    :value="this.user.certificate">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row v-if="role == 'Manager' || role == 'managers'">
                        <b-col sm="2"><label >Position: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.position" 
                                                    :value="this.user.position">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row v-if="role == 'Manager' || role == 'managers'">
                        <b-col sm="2"><label >Expirience: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.expirience" 
                                                    :value="this.user.expirience">
                        </b-form-input></b-col>
                    </b-row>
                    <b-form-group v-if="role == 'Manager' || role == 'managers'">
                        <b-col sm="2"><label >Projects: </label></b-col>
                        <b-col sm="10">
                            <b-form-checkbox-group stacked v-model="selected" name="flavour2" :options="projects">
                            </b-form-checkbox-group>
                        </b-col>
                    </b-form-group>
                    <b-row v-if="role == 'Developer'|| role == 'developers'">
                        <b-col sm="2"><label > Type: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.type" 
                                                    :value="this.user.type">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row v-if="role == 'Developer' || role == 'developers'">
                        <b-col sm="2"><label > Info: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.into" 
                                                    :value="this.user.info">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row v-if="role == 'Developer' || role == 'developers'">
                        <b-col sm="2"><label > Rating: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.rating" 
                                                    :value="this.user.rating">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row v-if="role == 'Developer' || role == 'developers'">
                        <b-col sm="2"><label >Position: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.position" 
                                                    :value="this.user.position">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row v-if="role == 'Developer' || role == 'developers'">
                        <b-col sm="2"><label >Expirience: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.expirience" 
                                                    :value="this.user.expirience">
                        </b-form-input></b-col>
                    </b-row>
                    <b-form-group v-if="role == 'Developer' || role == 'developers'">
                        <b-col sm="2"><label >Projects: </label></b-col>
                        <b-col sm="10">
                            <b-form-checkbox-group stacked v-model="selected" name="flavour2" :options="projects">
                            </b-form-checkbox-group>
                        </b-col>
                    </b-form-group>
                    <b-row v-if="role == 'Customer' || role == 'customers'">
                        <b-col sm="2"><label > type: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.type" 
                                                    :value="this.user.type">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row v-if="role == 'Developer' || role == 'customers'">
                        <b-col sm="2"><label > Info: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.info" 
                                                    :value="this.user.info">
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
    name: 'editUser',
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
            projects: [],
            teams : [],

            role : null, 
            user : null,


        }
    }, 
    methods:{
        
        onSubmit(){
            // console.log(this.form)

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
            console.log(this.form)
            axios.put('http://127.0.0.1:8081/'+ this.role +'/' + this.user.id, this.form)
                .then(response => {
                    this.$router.go(-1)
                })
                .catch(e => {
                    this.errors.push(e)
            });
        },
        onReset(){

        },
        getProjects(userId){
            axios.get('http://127.0.0.1:8081/projects/user-' + userId)
                .then(response => {
                    response.data.forEach(element => {
                    
                        this.projects.push({value : element, text: element.name})
                    });
                })
                .catch(e => {
                    this.errors.push(e)
            });
        },
        getClients(){
            this.clients = this.user.clients
        },
        getUserById(id){
            axios.get('http://127.0.0.1:8081/users/'+ id)
                .then(response => {
                    this.role = response.data.dtype
                    this.user = response.data
                    this.form.id = id
                })
                .catch(e => {
                    this.errors.push(e)
            }); 
        },
        getCompanyTeams(){
            const currUser = JSON.parse(localStorage.user)

            axios.get('http://127.0.0.1:8081/companies/' + currUser.myTeam.myCompany.id + '/teams')
                .then(response => {
                    response.data.forEach(element => {
                    
                        this.teams.push({value : element, text: element.name})
                    });
                })
                .catch(e => {
                    this.errors.push(e)
            });
        }
    },
    beforeMount(){
        this.getUserById(this.$route.params.id)
        this.getProjects(this.$route.params.id)
        this.getCompanyTeams()
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

