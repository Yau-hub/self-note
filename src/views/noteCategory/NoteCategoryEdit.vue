<template>
	<div class="page-mian note-category-main">
		<van-nav-bar :title="route.meta.title" left-text="返回" left-arrow @click-left="pageBack" right-text="添加" @click-right="addNoteCategory" />
		<van-divider :style="{ color: 'transpaent', borderColor: '#transpaent', margin: '10px auto' }"></van-divider>


		<van-cell-group>
		  <van-cell v-for="item in noteCategory">
		    <template #title>
		  	<span class="custom-title">{{item.name}}</span>
		  	<van-tag color="#ffe1e1" text-color="#ad0000" style="margin-left: 10px;" v-if="item.isDelete == 1">不可见</van-tag>
		    </template>
		    <template #right-icon>
		      <van-icon name="edit" @click="editNoteCategory(item)"/>
		    </template>
		  </van-cell>
		</van-cell-group>
		
		
		
		
		<van-dialog v-model:show="editCategoryVisible" :title="editCategoryTitle" :show-confirm-button="false">
		  <van-form ref="addForm" @submit="submitAddCategory">
		    <van-cell-group inset>
		      <van-field
		        v-model="categoryParams.name"
		        name="name"
		        label="名称"
				label-width="80px"
		        placeholder="分类名称"
		        :rules="[{ required: true, message: '分类名称' }]"
		      />
		      
			  <van-field name="isDelete" label="可见" label-width="80px">
			    <template #input>
			      <van-radio-group v-model="categoryParams.isDelete" direction="horizontal">
			        <van-radio :name="0">是</van-radio>
			        <van-radio :name="1">否</van-radio>
			      </van-radio-group>
			    </template>
			  </van-field>
			  
		    </van-cell-group>
			
			<div style="margin: 16px 0;text-align: center;">
				<van-button round type="default" size="small" @click="editCategoryVisible = false" style="margin: 0 2%;">取 消</van-button>
			    <van-button round  type="primary" native-type="submit" size="small" style="margin: 0 2%;">提 交</van-button>
			  </div>
		  </van-form>
		</van-dialog>
	</div>
</template>
<script>
	import {
		ref,
		onMounted,
		getCurrentInstance
	} from 'vue';
	import {
		useRoute,
		useRouter
	} from 'vue-router';
	
	import {
		Notify
	} from 'vant'


	export default {
		name: 'NoteCategoryEdit',
		components:{
			[Notify.name]: Notify
		},
		setup() {
			const route = useRoute();
			const router = useRouter();
			const pageBack = ()=>{
				router.push('/my')
			}
			
			const editCategoryVisible = ref(false)
			const editCategoryTitle = ref('编辑分类')
			const isEdit = ref(false)
			const categoryParams = ref({});
			categoryParams.value.name = '';
			categoryParams.value.isDelete = 0;
			categoryParams.value.objectId = null;
			
			const internalInstance = getCurrentInstance();
			const addNoteCategory = ()=>{
				editCategoryTitle.value = '添加分类'
				isEdit.value = false;
				categoryParams.value.name = '';
				categoryParams.value.isDelete = 0;
				editCategoryVisible.value = true;
				
				internalInstance.ctx.$refs.addForm?.resetValidation();
			}
			
		
		
			const noteCategory = ref([])
			const featchData = ()=>{
				// query.equalTo("isDelete", "!=", 1);
				query.find().then(res => {
					noteCategory.value = res;
				});
			}
			
			
			const query = Bmob.Query('note_class');
			const submitAddCategory = ()=>{
				editCategoryVisible.value = false;
				// 编辑分类
				if(isEdit.value){
					query.get(categoryParams.value.objectId).then(res => {
					  res.set('name',categoryParams.value.name)
					  res.set('isDelete',categoryParams.value.isDelete)
					  res.save()
					  featchData();
					})
				}
				//新增分类
				else{
					query.set("name",categoryParams.value.name)
					query.set("isDelete",categoryParams.value.isDelete)
					query.save().then(res => {
					  Notify({ type: 'success', message: '添加成功！',duration: 800});
					  featchData();
					}).catch(err => {
					  Notify({ type: 'warning', message: '添加失败',duration: 800});
					})
				}
				
			}
			
			
			const editNoteCategory = (item)=>{
				editCategoryTitle.value = '编辑分类'
				isEdit.value = true;
				categoryParams.value.name = item.name;
				categoryParams.value.isDelete = item.isDelete;
				categoryParams.value.objectId = item.objectId;
				editCategoryVisible.value = true;
				internalInstance.ctx.$refs.addForm?.resetValidation();
			}
			
			onMounted(featchData);


			return {
				route,
				pageBack,
				editCategoryVisible,
				editCategoryTitle,
				addNoteCategory,
				submitAddCategory,
				categoryParams,
				noteCategory,
				featchData,
				editNoteCategory
			}
		}
	}
</script>

<style lang="scss">

</style>
