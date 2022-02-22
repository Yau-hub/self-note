<template>
  <section class="app-main">

	<router-view v-slot="{ Component }">
	  <transition name="fade-transform" mode="out-in">
	    <component :is="Component" />
	  </transition>
	</router-view>
	
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
}

</style>

<style lang="scss">

</style>
