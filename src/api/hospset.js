import request from '@/utils/request'

export default{
  getHospSetList(current, limit,searchObj){
    return request({
      url: `/admin/hosp/hospitalSet/findPageHospSet/${current}/${limit}`,
      method: 'post',
      data:searchObj // use json
    })
  },
  deleteHospSet(id){
    return request({
      url: `/admin/hosp/hospitalSet/${id}`,
      method: 'delete'
    })
  },
  batchRemoveHospSet(idList){
    return request({
      url:`/admin/hosp/hospitalSet/batchRemove`,
      method: 'delete',
      data: idList // @Requestbody -> use json format to send parameters to backend
    })
  },
  // lock and unlock hospital by status
  lockHospSet(id,status){
    return request({
      url:`/admin/hosp/hospitalSet/lockHospitalSet/${id}/${status}`,
      method: 'put'
    })
  },
  // add new hospital
  saveHospSet(hospitalSet){
    return request({
      url:`/admin/hosp/hospitalSet/saveHospitalSet`,
      method: 'post',
      data: hospitalSet
    })
  }
}
