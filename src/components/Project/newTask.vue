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
                                                    placeholder="Enter deadline in YYYY-MM-DD format"> 
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
        const user = JSON.parse(localStorage.user);
        const project = JSON.parse(localStorage.project);
        return {
            form: {
                name: '',
                state: '',
                attachment: '',
                deadline: '',
                //myUser: user,
                //myProject: project,
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
            // this.form.team = null;
            let config = {
                'Access-Control-Allow-Origin' : '*',
            }
            // axios.defaults.headers.get['Access-Control-Allow-Origin'] = true;
            axios.post('http://127.0.0.1:8081/' + this.dtype, this.form)
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
        // getProject(id){
        //     axios.get('http://127.0.0.1:8081/projects/' + id)
        //         .then(response => {
        //             this.selectedProject = response.data;
        //         })
        //         .catch(e => {
        //             this.errors.push(e)
        //     });
        // },
    },
    beforeMount(){
        //this.getProject(project.id);
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

