<template>
    <div id="userList">
        <div class="container">
            <template v-if="userData.dtype === 'Manager'">
            <b-row >
                <b-col align-h="begin">
                    <b-form-group horizontal label="Filter" class="mb-0">
                    <b-input-group>
                        <b-form-input v-model="filter" placeholder="Type to Search" />
                        <b-input-group-append>
                        <b-btn :disabled="!filter" @click="filter = ''">Clear</b-btn>
                        </b-input-group-append>
                    </b-input-group>
                    </b-form-group>
                </b-col>
                <b-col align-h="end">
                <b-button variant="success" @click="redirect('newUser')" >New User</b-button>
                </b-col>
            </b-row>
            </template>
            <b-row>
                <b-table bordered striped hover :items="items" :fields="fields" :filter="filter" >
                    <template slot="actions" slot-scope="row">
                        <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1">
                        More
                        </b-button>
                        <template v-if="userData.dtype === 'Manager'">
                        <b-button size="sm" @click.stop="removeUserModalShow(row.item, row.index, $event.target)" class="mr-1">
                        Delete
                        </b-button>
                        <b-button size="sm" @click="smartRedirect(row.item)" class="mr-1">
                        Edit
                        </b-button>
                        </template>
                    </template>
                </b-table>
            </b-row>
            
        </div>
        <b-modal id="modalInfo" @hide="resetModal(modalInfo)" :title="modalInfo.title" ok-only>
            <table id="firstTable" width=100% align='left'>
            <tr> <td> ID: </td><td>{{modalInfo.content.id}} </td></tr>
            <tr> <td>Name: </td><td>{{modalInfo.content.name}} {{modalInfo.content.forename}}</td></tr>
            <tr> <td>Type: </td><td>{{modalInfo.content.dtype}} </td></tr>
            <tr> <td>Email: </td><td>{{modalInfo.content.email}} </td></tr>
            <template v-if="userData.dtype === 'Manager'"> 
            <tr> <td>Certificate: </td><td>{{modalInfo.content.certificate}} </td></tr>
            </template>
            <template v-if="userData.dtype === 'Developer'"> 
            <tr> <td>Job: </td><td>{{modalInfo.content.type}} </td></tr>
            <tr> <td>Info: </td><td>{{modalInfo.content.info}} </td></tr>
            <tr> <td>Rating: </td><td>{{modalInfo.content.rating}} </td></tr>
            <!-- <tr> Manager: {{modalInfo.content.myManager.name}} </tr> -->
            </template>
            <template v-if="userData.dtype === 'Customer'"> 
            <tr> <td>C-type: </td><td>{{modalInfo.content.type}} </td></tr>
            <tr> <td>Info: </td><td>{{modalInfo.content.info}} </td></tr>
            </template>
            </table>
            </b-modal>
        <b-modal id="modalRemoveUser" hide-footer @hide="resetModal(modalRemoveUser)" :title="modalRemoveUser.title">
            <pre>Are you sure ?? <strong>{{ modalRemoveUser.content.name }}</strong> be sad</pre>
            <b-btn class="mt-3" variant="outline-danger" block @click="deleteUser(modalRemoveUser.content.id)">DELETE</b-btn>
        </b-modal>
    </div>

    

</template>


<script>
import axios from 'axios';

export default {
    name: 'userList',
    data() {
        return {
            userData : null,
            filter : null,
            items: [],
            //totalRows: items.length,
            fields : [
                    {
                        key:"name",
                        sortable: true
                    },
                    {
                        key:"forename",
                        label: "Forename",
                        sortable: true
                    },
                    {
                        key: "email",
                        label:"contact e-mail",
                        sortable: true
                    },
                    {
                        key:"dtype",
                        label:"Position",
                        sortable: true
                    },
                    {
                        key: 'actions',
                        label:"Actions",
                        sortable: false
                    },

                ],
            
            modalInfo: { title: '', content: '' },
            modalRemoveUser: {title: 'Achtung!', content: '', id:null}

        }
    }, 
    methods:{
        filterItems(arr){
            return arr.filter(a => {
                
            })
        },
        info (item, index, button) {
            this.modalInfo.title = `Row index: ${index}`
            this.modalInfo.ats = JSON.stringify(item, null, 2)
            this.modalInfo.content = item
            this.$root.$emit('bv::show::modal', 'modalInfo', button)
            this.show = true;
        },
        removeUserModalShow(item, index, button){
            this.modalRemoveUser.title = "Achtung!"
            this.modalRemoveUser.content = item
            this.$root.$emit('bv::show::modal', 'modalRemoveUser', button)
            this.show = true;
        },
        resetModal (modal) {
            modal.title = ''
            modal.content = ''
        },
        redirect(path){
            this.$router.push({ name: 'newUser'})
        },
        smartRedirect(row){
            const user = JSON.parse(localStorage.user)
            console.log(row)
            switch(user.dtype){ 
                case 'Manager':
                
                    break
                case 'Developer':
                    break
                case 'Customer':
                    break
                default:
                    console.log('Who are you? ' + user.dtype)

            }
        },
        deleteUser(id){
            axios.delete('http://127.0.0.1:8081/users/'+id)
            .then(this.$router.go())
            .catch(e => {
                this.errors.push(e)
                
            });
        },
        listAllUsers(){
            let config = {
            'Access-Control-Allow-Origin' : '*',
            }
            // axios.defaults.headers.get['Access-Control-Allow-Origin'] = true;
            axios.get('http://127.0.0.1:8081/users',config)
                .then(response => {
                    this.items = response.data;
                    
                })
                .catch(e => {
                    this.errors.push(e)
            });
        },
        onFiltered (filteredItems) {
        // Trigger pagination to update the number of buttons/pages due to filtering
        this.totalRows = filteredItems.length;
        }
    },
    beforeMount(){
        const user = JSON.parse(localStorage.user)
        this.userData = JSON.parse(localStorage.user)
        //console.log(user.dtype)
        this.listAllUsers();
    }
}

</script>

<style>

.container{
    margin-top: 60px;
}




</style>

