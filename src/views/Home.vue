<template>
	<div class="page-mian home-main">
		<van-tabs v-model:active="activeName" @click-tab="onClickTab">
			<van-tab :title="item.name" :name="item.name" v-for="(item,index) in noteCategory">
				<van-list
				  v-model:loading="loading"
				  :finished="finished"
				  finished-text="没有更多了"
				  @load="onLoad(item.name)"
				>
					<div v-for="items in dataMap[item.name]" style="font-size: 120px;">
						  {{items}}
					  </div>
				</van-list>
				
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
	import {
		ref,
		onMounted
	} from 'vue';
	import {
		Tab,
		Tabs,
		List 
	} from 'vant';

	export default {
		name: 'Home',
		components: {
			[Tab.name]: Tab,
			[Tabs.name]: Tabs,
			[List.name]: List
		},
		setup() {
			const query = Bmob.Query("note_class");
			const noteCategory = ref([])
			const activeName = ref('')
			
			
			
			const loading = ref(false);
			const finished = ref(false);
			
			const dataMap = ref({})
			const featchData = () => {
				query.equalTo("isDelete", "!=", 1);
				query.find().then(res => {
					noteCategory.value = res;
					if (res.length > 0) activeName.value = res[0].name;
					 res.forEach(item=>{
						dataMap.value[item.name] = [];
 					})
				});
				// const query = Bmob.Query('note_class');
				// query.set("name","vue")
				// query.save().then(res => {
				//   console.log(res)
				// }).catch(err => {
				//   console.log(err)
				// })
			}
			
			
			
			
			const onLoad = (category) => {
				 loading.value = true;
				 const query = Bmob.Query("work_note");
				 query.limit(20);
				 query.skip(dataMap.value[category].length);
				 query.find().then(res => {
				 	dataMap.value[category] = dataMap.value[category].concat(res)
					// 加载状态结束
					loading.value = false;
					// 数据全部加载完成
					if(res.length<=0){
						finished.value = true;
					}
				 });
				 
			    };
			
			
			const onClickTab = ({title}) => {
				if (dataMap.value[title].length <= 0 ) {
					finished.value = false;
				  onLoad(title);
				}
			};


			onMounted(featchData)

			return {
				featchData,
				noteCategory,
				activeName,
				dataMap,
				  onLoad,
				  loading,
				  finished,
				  onClickTab
			}
		}
	}
</script>

<style lang="scss">
	.home-main{
		.van-tabs{
			display: flex;
			flex-direction: column;
			padding-top: 40px;
			height: 100%;
			.van-tabs__wrap{
				position: fixed;
				top: 0;
				left: 0;
				width: 100%;
				height: 40px;
			}
			
			
			.van-tabs__content{
				flex: 1;
				height: 100%;
				.van-tab__panel{
					height: 100%;
					overflow: auto;
				}
			}
		}
	}
</style>
