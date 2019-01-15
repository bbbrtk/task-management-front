<template>
    <div id="companyList">
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
    name: 'companyList',
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
                        key: "country",
                        label:"Country",
                        sortable: true
                    },
                    {
                        key:"location",
                        label:"Location",
                        sortable: true
                    },
                    {
                        key:"dateOfEst",
                        label:"Estimated",
                        sortable: true
                    },
                ],
        }
    }, 
    methods:{
        listAllCompanies(){
            let config = {
            'Access-Control-Allow-Origin' : '*',
            }
            // axios.defaults.headers.get['Access-Control-Allow-Origin'] = true;
            axios.get('http://127.0.0.1:8081/companies')
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
        this.listAllCompanies();
    }
}

</script>

<style>

.container{
    margin-top: 60px;
}




</style>

