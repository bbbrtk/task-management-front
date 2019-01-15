<template>
    <div id="clientList">
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
                        <b-button variant="success" @click="redirect('newClient')" >New Client</b-button>
                    </b-col>
                </b-row>
            </template>
            <b-row>
                <p> </p>
            </b-row>

            <b-row>
                <b-table bordered striped hover :items="items" :fields="fields" :filter="filter">
                </b-table>
            </b-row>
        </div>
    </div>

    

</template>


<script>
import axios from 'axios';

export default {
    name: 'clientList',
    data() {
        return {
            userData : null,
            items: [],
            filter : null,
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
                        key: "nip",
                        label:"NIP",
                        sortable: true
                    },
                    {
                        key:"asset",
                        label:"Asset",
                        sortable: true
                    },
                    {
                        key:"dateOfEst",
                        label:"Estimated",
                        sortable: true
                    },
                    {
                        key:"description",
                        label:"Description",
                        sortable: true
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
            this.$router.push({ name: 'newClient'})
        },
        listAllClients(){
            let config = {
            'Access-Control-Allow-Origin' : '*',
            }
            // axios.defaults.headers.get['Access-Control-Allow-Origin'] = true;
            axios.get('http://127.0.0.1:8081/clients')
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
                    this.items = response.data;
                })
                .catch(e => {
                    this.errors.push(e)
            });
        },
    },
    beforeMount(){
        this.userData = JSON.parse(localStorage.user)
        this.listAllClients();
        //this.listAllTeamsInCompany(2);

    }
}

</script>

<style>

.container{
    margin-top: 60px;
}




</style>

