<template>
  <div id="app">
    <!-- tu jest warunek do logowania i wyswietlania glownego widoku -->
    <div v-if="this.username.length > 0"> 
    <b-navbar toggleable="md" type="dark" variant="info">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand >ProManage</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item @click.stop="redirect('home')">Home</b-nav-item>
          <b-nav-item @click.stop="redirect('users')" >Users</b-nav-item>
          <b-nav-item @click.stop="redirect('projects')" >Projects</b-nav-item>
          <b-nav-item @click.stop="redirect('teams')" >Teams</b-nav-item>
          <b-nav-item @click.stop="redirect('companies')" >Companies</b-nav-item>
          <b-nav-item @click.stop="redirect('clients')" >Clients</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em v-if="this.username.length > 0">{{this.username}}</em>
              <em v-else>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click.stop="logout()">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <!-- <b-container fluid class="p-4 bg-dark">
      <b-row>
          <b-col >
              <b-img class="my-sweeties" thumbnail fluid src="https://i.pinimg.com/originals/16/7d/12/167d12cd0f3a0e8aa1cc71c51ddab25f.jpg" alt="Thumbnail" />
          </b-col>
          <b-col>
              <b-img  class="my-sweeties" thumbnail fluid src="https://images-na.ssl-images-amazon.com/images/I/41lfGtYCykL.jpg" alt="Thumbnail" />
          </b-col>
          <b-col>
              <b-img  class="my-sweeties" thumbnail fluid src="https://i.pinimg.com/originals/ec/a8/1b/eca81b36001c309cdacbcf1acbae33c3.jpg" alt="Thumbnail" />
          </b-col>
      </b-row>
    </b-container> -->

    
      <router-view/>
    </div>
    <!-- tu ten warunek sie konczy i jesli nie jest spelniony to wchodzi w ponizszego else'a. -->
    <div v-else>
      <Login/>
    </div>
    
    
    <b-container fluid class="p-3 bg-dark myFooter">
        <b-col >
          <h2>REALISED BY <b-badge variant="info">BAJA group</b-badge></h2>
        </b-col>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import Login from './components/login.vue';

  export default {
    name: 'App',
   data() {
        return {
            username: '',
        }
    },
    mounted() {
       if (localStorage.username) {
          this.username = localStorage.username;

      }else{
        localStorage.username = "";
      }
    },
     watch: {
        username(newName) {
          localStorage.username = newName;
        }
    }, 
    methods: {
      logout(){
        this.username = "";
        localStorage.username = "";
        localStorage.user = null
      },
      redirect(path){
          this.$router.push({ name: path})
      },
    },
    components : {Login}
  }

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.my-sweeties{
    max-height: 250px !important;
}

.myFooter{
  margin-top: 60px;
  color: bisque
}

</style>
