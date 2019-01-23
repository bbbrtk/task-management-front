<template>
    <div id="editTask">
        <div class="container">
             <b-card border-variant="secondary"
                    header="Edit this task"
                    header-bg-variant="secondary"
                    align="center"
                    id = "myCard">
                

                <b-form v-on:submit.prevent="onSubmit" @reset="onReset" class="myForm">
                    <b-container fluid>
                    <b-row>
                        <b-col sm="2"><label >Name: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.name"
                                                    :value="task.name">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >Duration: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.duration" 
                                                    :value="task.duration">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >State: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.state" 
                                                    :value="task.state">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >Deadline: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.deadline" 
                                                    :value="task.deadline">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >Description: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.description" 
                                                    :value="task.description">
                        </b-form-input></b-col>
                    </b-row>
                    <b-row>
                        <b-col sm="2"><label >Type: </label></b-col>
                        <b-col sm="10"><b-form-select v-model="dtype" :options="roleOpt" class="mb-3" /></b-col>
                    </b-row>
                    <b-row v-if="dtype == 'Email' || dtype == 'emails'">
                        <b-col sm="2"><label >Mail to: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.mailTo" >
                        </b-form-input></b-col>
                    </b-row>
                    <b-row v-if="dtype == 'Development' || dtype == 'developments'">
                        <b-col sm="2"><label >Connected to: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.connectedTo" >
                        </b-form-input></b-col>
                    </b-row>
                    <b-row v-if="dtype == 'Meeting' || dtype == 'meetings'">
                        <b-col sm="2"><label >Place: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.place" >
                        </b-form-input></b-col>
                    </b-row>
                    <b-row v-if="dtype == 'TestDriving'|| dtype == 'testdrivings'">
                        <b-col sm="2"><label > Score: </label></b-col>
                        <b-col sm="10"><b-form-input v-model="form.testScore" >
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
    name: 'editTask',
    data() {
        return {
            form: {
                id:'',
                dtype:'',
                // email: '',
                // name: '',
                // forename: '',
                // info: '',
                // type: '',
                // certificate: '',
                // position: '',
                // type : '',
            },
            roleOpt: [
                { value: null, text: 'Please select an option', disabled : true },
                { value: 'emails', text: 'Email' },
                { value: 'meetings', text: 'Meeting' },
                { value: 'testdrivings', text: 'TestDriving' },
                { value: 'developments', text: 'Development' },
            ], 
            dtype : null,
            role : null, 
            task : null,


        }
    }, 
    methods:{
        
        onSubmit(){
            //this.form.dtype = this.dtype;

            switch(this.dtype){
                case 'emails':
                    this.form['@type'] = 'Email'
                    break
                case 'meetings':
                    this.form['@type'] = 'Meeting'
                    break
                case 'testdrivings':
                    this.form['@type'] = 'TestDriving'
                break;
                case 'developments':
                    this.form['@type'] = 'Development'
                break;
            }   

            console.log(this.form)

            axios.put('http://127.0.0.1:8081/tasks/'+ this.form.id, this.form)
                .then(response => {
                    this.$router.go(-1)
                })
                .catch(e => {
                    this.errors.push(e)
            });
        },
        onReset(){

        },
        getTaskById(id){
            axios.get('http://127.0.0.1:8081/tasks/'+ id)
                .then(response => {
                    this.task = response.data
                    this.form.id = id
                })
                .catch(e => {
                    this.errors.push(e)
            }); 
        },
    },
    beforeMount(){
        this.getTaskById(this.$route.params.id)
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

