<template>
  <div class="page-mian my-main">
	  <van-nav-bar title="我的" />
	  <van-divider :style="{ color: 'transpaent', borderColor: '#transpaent', margin: '10px auto' }"></van-divider>
   
	<van-cell-group>
	  <van-cell title="编辑分类" is-link to="/noteCategoryEdit" />
	  <van-cell title="编辑内容" is-link to="home" />
	</van-cell-group>
  </div>
</template>
<script>
	import {
		ref,
		onMounted
	} from 'vue';
	import {
		Cell,
		NavBar,
		Divider,
		CellGroup 
	} from 'vant';

	export default {
		name: 'My',
		components: {
			[Cell.name]: Cell,
			[NavBar.name]: NavBar,
			[Divider.name]: Divider,
			[CellGroup.name]: CellGroup
		},
		setup() {
			
			

			return {
				
			}
		}
	}
</script>

<style lang="scss">
	.my-main{
		background-color: #fafafa;
	}
</style>

