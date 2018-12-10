<template>
    <div id="login">
        <div class="container">
            <b-row align-h="end">
                <b-button variant="success" @click="redirect('newUser')" >New User</b-button>
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
        <b-modal id="modalInfo" @hide="resetModal(modalInfo)" :title="modalInfo.title" ok-only>
            <pre>{{ modalInfo.content }}</pre>
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
    name: 'login',
    data() {
        return {
            items: [],
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
            this.modalInfo.content = JSON.stringify(item, null, 2)
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
        }
    },
    beforeMount(){
        this.listAllUsers();
    }
}

</script>

<style>

.container{
    margin-top: 60px;
}




</style>

