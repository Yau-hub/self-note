<template>
  <section class="app-main">

	<router-view v-slot="{ Component }">
	  <transition name="van-fade">
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
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: auto;
}

</style>

<style lang="scss">

</style>
