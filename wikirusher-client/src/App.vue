<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <router-link to="/" class="navbar-brand"><img src="/asset/image/wikirusher.png" class="logo" /></router-link>
      <!--div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/room" class="nav-link">Rooms</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/room/create" class="nav-link">Add</router-link>
        </li>
      </div-->
    </nav>
    

    <div class="container mt-3">
      <flash-message class="flash"></flash-message>
      <router-view />
    </div>
  </div>
</template>

<script>



export default {
  name: "app"
};
</script>
