<template>
    <div id="projects">
        <div class="container">
            <b-row align-h="end">
                <b-button variant="success" @click="redirect('newProject')">New Project</b-button>
            </b-row>
            
            <b-row>
                <b-table bordered striped hover :items="items" :fields="fields">
                    <template slot="actions" slot-scope="row">
                        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
                        <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1">
                        More
                        </b-button>
                        <b-button size="sm" @click.stop="removeUserModalShow(row.item, row.index, $event.target)" class="mr-1">
                        Delete
                        </b-button>
                        <b-button size="sm" @click.stop="removeUserModalShow(row.item, row.index, $event.target)" class="mr-1">
                        Edit
                        </b-button>
                        
                        <!-- <b-button size="sm" @click.stop="row.toggleDetails">
                        {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
                        </b-button> -->
                    </template>
                </b-table>
            </b-row>
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    name: 'projects',
    data() {
        return {
            role : null,
            items : [],
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
                    key:"my_manager_id",
                    label:"Manager",
                    sortable: true
                },
                {
                    key: 'actions',
                    label:"Actions",
                    sortable: false
                },
            ],
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
        listAllProjects(id){
            axios.get('http://127.0.0.1:8081/projects/user-' + id)
                .then(response => {
                    this.items = response.data;
                })
                .catch(e => {
                    this.errors.push(e)
            });
        }
    },
    beforeMount(){
        const user = JSON.parse(localStorage.user)
        console.log(user.dtype)
        this.listAllProjects(user.id);
    }
}

</script>

<style>


</style>

