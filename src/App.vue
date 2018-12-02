<template>
  <div id="app">
    <b-navbar toggleable="md" type="dark" variant="info">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#">NavBar</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">

        <b-navbar-nav>
          <b-nav-item href="#">Link</b-nav-item>
          <b-nav-item href="#" disabled>Disabled</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-form>
            <b-form-input size="sm" class="mr-sm-2" type="text" placeholder="Search"/>
            <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
          </b-nav-form>

          <b-nav-item-dropdown text="Lang" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <b-container fluid class="p-4 bg-dark">
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
    </b-container>
    <router-view/>
  </div>
</template>

<script>
import axios from "axios";

  export default {
    name: 'App',
    mounted() {},
    methods: {}
  }

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.my-sweeties{
    max-height: 250px !important;
}

</style>
