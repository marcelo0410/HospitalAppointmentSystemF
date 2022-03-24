<template>
  <div class="app-container">
    hospital list

    <el-form :inline="true" class="demo-form-inline">
    <el-form-item>
        <el-input  v-model="searchObj.hosname" placeholder="Hospital Name"/>
    </el-form-item>
    <el-form-item>
        <el-input v-model="searchObj.hoscode" placeholder="Hospital No"/>
    </el-form-item>
    <el-button type="primary" icon="el-icon-search" @click="getList()">search</el-button>
    </el-form>

    <!-- tool bar: batchdelete -->
    <div>
      <el-button type="danger" size="mini" @click="removeRows()">Batch Delete</el-button>
    </div>

    <el-table
        :data="list"
        stripe
            style="width: 100%" @selection-change="handleSelectionChange">

        <el-table-column type="selection" width="55"/>
        <el-table-column type="index" width="50" label="No"/>
        <el-table-column prop="hosname" label="Hospital name"/>
        <el-table-column prop="hoscode" label="Hospital No"/>
        <el-table-column prop="apiUrl" label="api path" width="200"/>
        <el-table-column prop="contactsName" label="Contact"/>
        <el-table-column prop="contactsPhone" label="Contact No"/>
        <el-table-column label="status" width="80">
        <template slot-scope="scope">
                {{ scope.row.status === 1 ? 'available' : 'unavailable' }}
        </template>
        </el-table-column>

        <el-table-column label="Option" width="280" align="center">
          <template slot-scope="scope">
              <el-button type="danger" size="mini" 
                icon="el-icon-delete" @click="removeDataById(scope.row.id)">Delete</el-button>
              <el-button v-if="scope.row.status==1" type="primary" size="mini" 
                icon="el-icon-delete" @click="lockHostSet(scope.row.id,0)">Lock</el-button>
              <el-button v-if="scope.row.status==0" type="danger" size="mini" 
                icon="el-icon-delete" @click="lockHostSet(scope.row.id,1)">Unlock</el-button>
          </template>
        </el-table-column>



    </el-table>
    <el-pagination
    :current-page="current"
    :page-size="limit"
    :total="total"
    style="padding: 30px 0; text-align: center;"
    layout="total, prev, pager, next, jumper"
    @current-change="getList"
    />
  </div>
</template>
<script>
// import hoptset

import hospset from "@/api/hospset";
export default {
  data() {
    return {
      current: 1,
      limit: 2,
      searchObj: {},
      list: [],
      total:0, // pages of data
      multipleSelection: []
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList(page=1) {
      this.current = page
      hospset
        .getHospSetList(this.current, this.limit, this.searchObj)
        .then(response => {
            this.list = response.data.records
            this.total = response.data.total
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    // delete hospital method
    removeDataById(id) {
      this.$confirm('Delete the selected hospital?', 'Warning', {
          confirmButtonText: 'Confirm',
          cancelButtonText: 'Cancel',
          type: 'warning'
      }).then(() => { //确定执行then方法
          //调用接口
          hospset.deleteHospSet(id)
            .then(response => {
                //提示
                this.$message({
                  type: 'success',
                  message: 'Delete successfully!'
                })
                //刷新页面
                this.getList(1)
            })
      })
    },
    // Batch delete
    removeRows(){
      this.$confirm('Batch delete the selected hospital?', 'Warning', {
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
            type: 'warning'
        }).then(() => { //确定执行then方法
            var idList = []
            //遍历数组得到每个id值，设置到idList里面
            for(var i=0;i<this.multipleSelection.length;i++) {
              var obj = this.multipleSelection[i]
              var id = obj.id
              idList.push(id)
            }
            //调用接口
            hospset.batchRemoveHospSet(idList)
              .then(response => {
                  //提示
                  this.$message({
                    type: 'success',
                    message: 'Delete successfully!'
                  })
                  //刷新页面
                  this.getList(1)
              })
        })

    },
    // get selection's id
    handleSelectionChange(selection){
      this.multipleSelection = selection
    },
    lockHostSet(id,status){
      hospset.lockHospSet(id,status)
        .then(response =>{
          this.getList()
        })
    }

  }
};
</script>
