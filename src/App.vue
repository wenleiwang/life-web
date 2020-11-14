<template>
  <div id="app">

    <div class="black_colore">
      <div class="harder_body">
        <div class="harder_logo">Wenwen</div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
body{
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  padding: 0px;
}


.black_colore{
  background: #2c3e50;
  width: 100%;
  height: 70px;
}

.harder_body{
  margin: 0px auto;
  width: 70%;
  border-bottom: 1px solid ;
}
.harder_logo{
  color: #2ED573;
  font-family: Cambria Math;
  font-size: 32px;
  line-height: 20px;
  margin: 20px auto;
}
</style>
