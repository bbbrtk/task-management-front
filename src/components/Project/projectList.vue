<template>
    <div id="projects">
        <div class="container">
            <b-card class="text-center mainCard">
                <div v-if="userData.dtype === 'Manager'">
                    <b-alert show variant="primary">
                        <b-row align-h="between">
                            <b-col cols="auto">
                                <b-form-group horizontal class="mb-0">
                                    <b-input-group>
                                        <b-form-input v-model="filter" placeholder="Type to Search" />
                                        <b-input-group-append>
                                            <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                                        </b-input-group-append>
                                    </b-input-group>
                                </b-form-group>

                            </b-col>
                            <b-col cols="auto">
                                <b-button class="floatRight" variant="success" @click="redirect('newProject')" >New Project</b-button>
                            </b-col>
                        </b-row>
                            
                    </b-alert>
                </div>
                
                <b-row>
                    <b-table bordered striped hover :items="items" :fields="fields" :filter="filter">
                        <template slot="actions" slot-scope="row">
                                <b-button size="sm" @click.stop="row.toggleDetails">
                                    {{ row.detailsShowing ? 'Hide' : 'Show' }} Tasks
                                </b-button>
                                <template v-if="userData.dtype === 'Manager'">
                                    <b-button size="sm" @click.stop="removeProjectModalShow(row.item, row.index, $event.target)" class="mr-1">
                                        Delete
                                    </b-button>
                                    <b-button size="sm" @click="smartRedirect(row.item)" class="mr-1">
                                        Edit
                                    </b-button>
                                    <b-button size="sm" variant="primary" @click="redirectTask('newTask',row.item.id, row.item)">New Task</b-button>
                            </template>
                        </template>
                        <template small slot="row-details" slot-scope="row">                                 
                                <b-row>
                                    <b-card-group class="myPadding" columns>
                                    <!-- <b-list-group> -->
                                        <b-list-group v-for="iter in info" :key="iter" 
                                                border-variant="white"
                                                header-bg-variant="primary"
                                                header-text-variant="white"
                                                align="center">
                                            <template v-if="row.item.id === iter.myProject.id">
                                                <b-card-header>
                                                    <b> {{iter.name}}</b>
                                                </b-card-header>
                                                <b-badge variant="primary">{{iter.deadline}}</b-badge>
                                                <b-badge variant="warning">{{iter.myUser.name}}</b-badge>
                                                <p class="card-text">{{iter.description}}</p>
                                                <b-progress :value="iter.state" :max="100" show-progress animated></b-progress>
                                                <b-button size="sm" @click.stop="removeTaskModalShow(iter, $event.target)" class="mr-1">
                                                    Delete
                                                </b-button>
                                            </template>
                                        </b-list-group>
                                    <!-- </b-list-group> -->
                                    </b-card-group>
                                </b-row>


                        </template>
                    </b-table>
                </b-row>
            </b-card>
        </div>
        <b-modal id="modalInfo" @hide="resetModal(modalInfo)" :title="modalInfo.title" ok-only>
            <pre>{{ modalInfo.content }}</pre>
        </b-modal>
        <b-modal id="modalRemoveProject" hide-footer @hide="resetModal(modalRemoveProject)" :title="modalRemoveProject.title">
            <template v-if="userData.dtype === 'Manager'">
            <pre> Your project: <strong>{{ modalRemoveProject.content.name }}</strong> will be deleted</pre>
            <b-btn class="mt-3" variant="outline-danger" block @click="deleteProject(modalRemoveProject.content.id)">DELETE</b-btn>
            </template>
        </b-modal>
        <b-modal id="modalRemoveTask" hide-footer @hide="resetModal(modalRemoveTask)" :title="modalRemoveTask.title">
            <template v-if="userData.dtype === 'Manager'">
            <pre> Your task: <strong>{{ modalRemoveTask.content.name }}</strong> will be deleted</pre>
            <b-btn class="mt-3" variant="outline-danger" block @click="deleteTask(modalRemoveTask.content.id)">DELETE</b-btn>
            </template>
        </b-modal>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    name: 'projects',
    data() {
        return {
            role : null,
            info : null,
            userData : null,
            filter : null,
            items : [],
            tasks : [],
            fields: [
                {
                    key:"name",
                    sortable: true
                },
                {
                    key:"duration",
                    label: "Duration",
                    sortable: true
                },
                {
                    key: "myClient.name",
                    label:"Client",
                    sortable: true
                },
                {
                    key: 'actions',
                    label:"Actions",
                    sortable: false
                },
            ],

            modalInfo: { title: '', content: '' },
            modalRemoveProject: {title: 'Warning!', content: '', id:null},
            modalRemoveTask: {title: 'Warning!', content: '', id:null}
        }
    }, 
    methods:{
        onSubmit(){
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
        removeProjectModalShow(item, index, button){
            this.modalRemoveProject.title = "Warning!"
            this.modalRemoveProject.content = item
            this.$root.$emit('bv::show::modal', 'modalRemoveProject', button)
            this.show = true;
        },
        removeTaskModalShow(item, button){
            this.modalRemoveTask.title = "Warning!"
            this.modalRemoveTask.content = item
            this.$root.$emit('bv::show::modal', 'modalRemoveTask', button)
            this.show = true;
        },
        resetModal (modal) {
            modal.title = ''
            modal.content = ''
        },
        redirect(path){
            this.$router.push({ name: 'newProject'})
        },
        smartRedirect(row){
            this.$router.push({name: 'editProject', params:{id: row.id} })
        },
        redirectTask(path, id_project, the_project){
            localStorage.project = JSON.stringify(the_project);
            this.$router.push({ name: path, params: {projectId : id_project}})
        },
        deleteProject(id){
            axios.delete('http://127.0.0.1:8081/projects/'+id)
            .then(this.$router.go())
            .catch(e => {
                this.errors.push(e)
            });
        },
        deleteTask(id){
            axios.delete('http://127.0.0.1:8081/tasks/'+id)
            .then(this.$router.go())
            .catch(e => {
                this.errors.push(e)
            });
        },
        listAllProjects(id){
            this.userData.projects.forEach(element => {
                this.items.push(element)
            });
        },
        listAllProjectsCustomer(id){
            axios.get('http://127.0.0.1:8081/projects/client-' + id)
                .then(response => {
                    this.items = response.data;
                })
                .catch(e => {
                    this.errors.push(e)
            });
        },
        listAllTasksForProject(projectId){
            axios.get('http://127.0.0.1:8081/projects/' + projectId + '/tasks')
                .then(response => {this.info = response.data; } )
                .catch(e => {
                    this.errors.push(e)
            });
        },
    },
    beforeMount(){
        const user = JSON.parse(localStorage.user)
        console.log(user)
        this.userData = JSON.parse(localStorage.user)
        this.listAllTasksForProject(3);
        switch(user.dtype){
            case 'Manager':
                this.listAllProjects(user.id);
                break;
            case 'Developer':
                //this.listAllProjectsDeveloper(user.id);
                break;
            case 'Customer':
                this.listAllProjectsCustomer(user.myClient.id);
                break;
            default:
                console.log("error")
                break;
        }
    }
}

</script>

<style>

.mainCard{
    margin-top: 20px;
}

.floatRight{
    margin-right: 20px;
}

.myPadding{
    padding: 20px;
}


</style>

