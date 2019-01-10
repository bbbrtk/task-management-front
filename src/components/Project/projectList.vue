<template>
    <div id="projects">
        <div class="container">
            <b-row align-h="end">
                <b-button variant="success" @click="redirect('newProject')">New Project</b-button>
            </b-row>
            
            <b-row>
                <b-table bordered striped hover :items="items" :fields="fields">
                    <template slot="actions" slot-scope="row">

                        <b-button size="sm" @click.stop="row.toggleDetails">
                            {{ row.detailsShowing ? 'Hide' : 'Show' }} Tasks
                        </b-button>
                        <b-button size="sm" @click.stop="removeProjectModalShow(row.item, row.index, $event.target)" class="mr-1">
                            Delete
                        </b-button>
                        <b-button size="sm" @click.stop="removeProjectModalShow(row.item, row.index, $event.target)" class="mr-1">
                            Edit
                        </b-button>
                    </template>
                    <template slot="row-details" slot-scope="row">
                        <b-card>
                            <b-row class="mb-2" align-h="end">
                                       <b-button variant="success" @click="redirect('newTask')">New Task</b-button>
                            </b-row>
                            <b-row>
                                <table id="firstTable" width=100%>
                                <thead>
                                    <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>State</th>
                                    <th>User</th>
                                    <th>Attachment</th>
                                    <th>Deadline</th>
                                    <th> Actions </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="iter in info" :key="iter">
                                    <template v-if="iter.myProject.id === row.item.id">
                                    <td>{{iter.id}}</td>
                                    <td>{{iter.name}}</td>
                                    <td>{{iter.state}}</td>
                                    <!-- <td>{{iter.myUser.name}}</td> -->
                                    <td>{{iter.myUser}}</td>
                                    <td>{{iter.attachment}}</td>
                                    <td>{{iter.deadline}}</td>
                                    <td> 
                                        <b-button size="sm" @click.stop="removeProjectModalShow(row.item, row.index, $event.target)" class="mr-1">
                                            Delete
                                        </b-button>
                                        <b-button size="sm" @click.stop="removeProjectModalShow(row.item, row.index, $event.target)" class="mr-1">
                                            Edit
                                        </b-button>
                                    </td>
                                    </template>
                                    </tr>
                                </tbody>
                                </table>
                            </b-row>
                        </b-card>
                    </template>
                </b-table>
            </b-row>

        </div>
        <b-modal id="modalInfo" @hide="resetModal(modalInfo)" :title="modalInfo.title" ok-only>
            <pre>{{ modalInfo.content }}</pre>
        </b-modal>
        <b-modal id="modalRemoveProject" hide-footer @hide="resetModal(modalRemoveProject)" :title="modalRemoveProject.title">
            <pre> Your project: <strong>{{ modalRemoveProject.content.name }}</strong> will be deleted</pre>
            <b-btn class="mt-3" variant="outline-danger" block @click="deleteProject(modalRemoveProject.content.id)">DELETE</b-btn>
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
                    key: "my_client_id",
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
            modalRemoveProject: {title: 'Warning!', content: '', id:null}
        }
    }, 
    methods:{
        onSubmit(){
            axios.post('http://127.0.0.1:8081/'+ this.role, this.form)
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
        removeProjectModalShow(item, index, button){
            this.modalRemoveProject.title = "Warning!"
            this.modalRemoveProject.content = item
            this.$root.$emit('bv::show::modal', 'modalRemoveProject', button)
            this.show = true;
        },
        resetModal (modal) {
            modal.title = ''
            modal.content = ''
        },
        redirect(path){
            this.$router.push({ name: 'newProject'})
        },
        deleteProject(id){
            axios.delete('http://127.0.0.1:8081/projects/'+id)
            .then(this.$router.go())
            .catch(e => {
                this.errors.push(e)
            });
        },
        listAllProjects(id){
            axios.get('http://127.0.0.1:8081/projects/user-' + id)
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
        console.log(user.dtype)
        this.listAllProjects(user.id);
        this.listAllTasksForProject(3);
    }
}

</script>

<style>
</style>

