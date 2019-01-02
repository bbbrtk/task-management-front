<template>
    <div id="myTasks">
        <div class="container">
            <b-card title="Card Title"
                    img-src="https://picsum.photos/600/300/?image=25"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2">
                <b-table hover :items="items"> </b-table>
            </b-card>
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    name: 'myTasks',
    data() {
        return {
            role : null,
            items : [],
        }
    }, 
    methods:{
        onSubmit(){
            axios.post('http://127.0.0.1:8081/'+ this.role, this.form)
                .then(response => {
                    console.log(response.data);
                    // this.$router.go(-1)
                })
                .catch(e => {
                    this.errors.push(e)
            });
        },
        onReset(){

        },
    },
    beforeMount(){
        const user = JSON.parse(localStorage.user)
        console.log(user.dtype)

        switch(user.dtype){
            case 'Manager':
                axios.get('http://127.0.0.1:8081/managers/' + user.id + '/home-card')
                .then(response => {
                    console.log(response.data);

                })
                .catch(e => {
                    this.errors.push(e)
            });

                break;
            case 'Developer':
                break;
            case 'Customer':
                break;
            default:
                console.log("WTF ?!")
                break;

        }

        // 
    }
}

</script>

<style>


</style>

