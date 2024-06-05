<template>
  <div>
    <h2>Loading...</h2>
    
  </div>
  
  
  
</template>

<script>
export default {
  name: "room-join",
  data() {
    return {
    } 
  },
  methods: {

  },
  mounted() {
	this.$router.push({name: 'room-question', params: {uid:this.$route.query.uid }});

  }
};
</script>
