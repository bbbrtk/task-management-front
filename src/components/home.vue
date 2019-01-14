<template>
    <div id="home">
        <div class="container">
            <b-row>
                <b-col>
                    <myTasks class="myHomeCard"/> 
                </b-col>
                <b-col>
                    <myTeam class="myHomeCard"/>
                </b-col>
            </b-row>
        </div>
    </div>
</template>


<script>
import axios from 'axios';
import myTasks from '@/components/Home/myTasks'
import myTeam from '@/components/Home/myTeam'

export default {
    name: 'home',
    data() {
        return {
            role : null,
        }
    }, 
    methods:{
        // onSubmit(){
        //     axios.post('http://127.0.0.1:8081/'+ this.role, this.form)
        //         .then(response => {
        //             console.log(response.data);
        //             this.$router.go(-1)
        //         })
        //         .catch(e => {
        //             this.errors.push(e)
        //     });
        // },
        onReset(){

        },
    },
    beforeMount(){
    },
    components : {myTasks, myTeam}
}

</script>

<style>

.myHomeCard{
    margin-top: 66px;
}

</style>

