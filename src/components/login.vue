<template>
    <div id="login">
        <div class="container">
            <b-row align-h="end">
                <b-button variant="success" >New User</b-button>
            </b-row>
            
            <b-row>
                <b-table bordered striped hover :items="items" :fields="fields">
                    <template slot="actions" slot-scope="row">
                        <!-- We use @click.stop here to prevent a 'row-clicked' event from also happening -->
                        <b-button size="sm" @click.stop="info(row.item, row.index, $event.target)" class="mr-1">
                        Info modal
                        </b-button>
                        <!-- <b-button size="sm" @click.stop="row.toggleDetails">
                        {{ row.detailsShowing ? 'Hide' : 'Show' }} Details
                        </b-button> -->
                    </template>
                </b-table>
            </b-row>
            
        </div>
        <b-modal id="modalInfo" @hide="resetModal" :title="modalInfo.title" ok-only>
            <pre>{{ modalInfo.content }}</pre>
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
                        key:"type",
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
        resetModal () {
            this.modalInfo.title = ''
            this.modalInfo.content = ''
        },
    },
    beforeMount(){
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
}

</script>

<style>

.container{
    margin-top: 60px;
}




</style>

