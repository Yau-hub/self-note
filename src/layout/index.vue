<template>
	<app-main />
	<van-tabbar route placeholder v-model="active" @change="onChange" class="app-tab-bar">
		<van-tabbar-item replace :to="'/'+item.path" :name="item.name" :icon="item.meta.icon" v-for="item in tabLs">
			{{item.meta.title}}
		</van-tabbar-item>
	</van-tabbar>

</template>

<script>
	import {
		ref
	} from 'vue';
	import AppMain from './components/AppMain.vue'

	import {
		useRoute,
		useRouter
	} from "vue-router"
	import {
		Tabbar,
		TabbarItem
	} from 'vant';
	export default {
		components: {
			AppMain,
			[Tabbar.name]: Tabbar,
			[TabbarItem.name]: TabbarItem

		},
		setup() {
			const active = ref('Home');
			const router = useRouter()
			const tabLs = router.options.routes.find(item => item.name == 'Layout').children
			const onChange = (index) => {
				// console.log(index)
			};

			return {
				tabLs,
				active,
				onChange
			};
		},
	};
</script>

<style lang="scss">
	.app-tab-bar {
		.van-tabbar {
			box-shadow: 0 0 5px 1px #bbb;
		}

	}
</style>
