<template>
  <div class="app-container">
      Create new Hospital
      <el-form label-width="120px">
         <el-form-item label="Hospital name">
            <el-input v-model="hospitalSet.hosname"/>
         </el-form-item>
         <el-form-item label="Hospital no">
            <el-input v-model="hospitalSet.hoscode"/>
         </el-form-item>
         <el-form-item label="api url">
            <el-input v-model="hospitalSet.apiUrl"/>
         </el-form-item>
         <el-form-item label="Contact name">
            <el-input v-model="hospitalSet.contactsName"/>
         </el-form-item>
         <el-form-item label="Contact no">
            <el-input v-model="hospitalSet.contactsPhone"/>
         </el-form-item>
         <el-form-item>
            <el-button type="primary" @click="saveOrUpdate">Create</el-button>
         </el-form-item>
      </el-form>
   </div>
</template>
<script>
import hospSet from '@/api/hospset'
    export default{
        data(){
            return {
                hospitalSet:{}
            }
        },
        created(){

        },
        methods:{
            saveOrUpdate(){
                hospSet.saveHospSet(this.hospitalSet)
                    .then(response => {
                //提示
                this.$message({
                    type: 'success',
                    message: 'Create successfully!'
                })
                //跳转列表页面，使用路由跳转方式实现
                this.$router.push({path:'/hospSet/list'})
                })
            }
        }
    }
</script>


