<template>
    <div id="userList">
        <div class="container">
            <template v-if="userData.dtype === 'Manager'">
                <b-row align-h="between">
                    <b-col cols=5>
                        <b-form-group horizontal label="Filter" class="mb-0">
                        <b-input-group>
                            <b-form-input v-model="filter" placeholder="Type to Search" />
                            <b-input-group-append>
                            <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                            </b-input-group-append>
                        </b-input-group>
                        </b-form-group>
                    </b-col>
                    <b-col cols=2>
                        <b-button variant="success" @click="redirect('newTeam')" >New Team</b-button>
                    </b-col>
                </b-row>
            </template>
            <b-row>
                <p> </p>
            </b-row>
            <b-row>
                <b-table bordered striped hover :items="items" :fields="fields" :filter="filter">
                    <template slot="actions" slot-scope="row">
                        <template v-if="userData.dtype === 'Manager'">
                            <!-- <b-button size="sm" @click.stop="removeUserModalShow(row.item, row.index, $event.target)" class="mr-1">
                            Delete
                            </b-button> -->
                            <b-button size="sm" @click="smartRedirect(row.item)" class="mr-1">
                            Edit
                            </b-button>
                        </template>
                    </template>
                </b-table>
            </b-row>
        </div>
        <!-- <b-modal id="modalRemoveTeam" hide-footer @hide="resetModal(modalRemoveTeam)" :title="modalRemoveUser.title">
            <pre>Are you sure ? <strong>{{ modalRemoveTeam.content.name }}</strong> will be very sad</pre>
            <b-btn class="mt-3" variant="outline-danger" block @click="deleteUser(modalRemoveTeam.content.id)">DELETE</b-btn>
        </b-modal> -->
    </div>

    

</template>


<script>
import axios from 'axios';

export default {
    name: 'teamList',
    data() {
        return {
            userData : null,
            filter : null,
            items: [],
            fields : [
                    {
                        key:"name",
                        sortable: true
                    },
                    {
                        key:"id",
                        label: "ID",
                        sortable: true
                    },
                    {
                        key: "capacity",
                        label:"Capacity",
                        sortable: true
                    },
                    {
                        key:"myCompany.name",
                        label:"Company",
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
        filterItems(arr){
            return arr.filter(a => {
                
            })
        },
        redirect(path){
            this.$router.push({ name: 'newTeam'})
        },
        smartRedirect(row){
            this.$router.push({name: 'editTeam', params:{id: row.id} })
        },
        listAllTeams(){
            let config = {
            'Access-Control-Allow-Origin' : '*',
            }
            // axios.defaults.headers.get['Access-Control-Allow-Origin'] = true;
            axios.get('http://127.0.0.1:8081/teams')
                .then(response => {
                    this.items = response.data;
                })
                .catch(e => {
                    this.errors.push(e)
            });
        },
        listAllTeamsInCompany(id){
            axios.get('http://127.0.0.1:8081/companies/' + id + '/teams')
                .then(response => {
                    console.log(response.data)
                    this.items = response.data;
                })
                .catch(e => {
                    this.errors.push(e)
            });
        },
    },
    beforeMount(){
        this.userData = JSON.parse(localStorage.user)

        console.log(this.userData)
        //this.listAllTeams();
        this.listAllTeamsInCompany(this.userData.myTeam.myCompany.id);

    }
}

</script>

<style>

.container{
    margin-top: 60px;
}




</style>

