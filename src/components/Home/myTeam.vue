<template>
    <div id="myTeam">
        <div class="container">
            <b-card title="Card Title"
                    img-src="https://picsum.photos/600/300/?image=25"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem;"
                    class="mb-2">
                <p class="card-text">
                Some quick example text to build on the card title and make up the bulk of the card's content.
                </p>
                <b-button href="#" variant="primary">Go somewhere</b-button>
            </b-card>
            
        </div>
    </div>
</template>


<script>
import axios from 'axios';

export default {
    name: 'myTeam',
    data() {
        return {
            role : null,
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
    },
    beforeMount(){
    }
}

</script>

<style>


</style>

