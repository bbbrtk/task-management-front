<template>
    <div id="companyList">
        <div class="container">
            <b-row>
                <b-table bordered striped hover :items="items" :fields="fields">
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

