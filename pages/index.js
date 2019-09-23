import Layout from '../components/layout'
import {Radio} from 'antd'
import {checkProjects,historys} from '../utils/config'
import moment from "moment"
import Axios from 'axios';
export default class extends React.Component {
  static async getInitialProps({ req,query,jsonPageRes }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent,query,jsonPageRes }
  }
  state = {
    name:"",
    sex:1,
    age:0,
    phone:"",
    appointment_date:"",
    time_bucket:1,
    check_project:1,
    check_project_lable:"",
    check_method:1,
    history:"",
    allergy_history:"",
    history_lable:"",
    remark:"",
    is70:false
  }

  async loadList(tp){
    
  }

  async componentDidMount(){
    
  }
  choiceDate(){
    let self = this
    weui.datePicker({
      start: new Date(moment().add(1, 'days')), // 从今天开始
      end: 2030,
      // defaultValue: [2020, 6, 9],
      onChange: function(result){
          //console.log(result);
      },
      onConfirm: function(result){
          //console.log(11122,result);
          if (result[1].value < 10){
            result[1].value = `0${result[1].value}`
          }
          if (result[2].value < 10){
            result[2].value = `0${result[2].value}`
          }
          self.setState({appointment_date:result[0].value+"-"+result[1].value+"-"+result[2].value})
      },
      id: 'datePicker'
    });
  }

  checkProJect(){
    let self = this
    weui.picker(checkProjects, {
         className: 'custom-classname',
         container: 'body',
         defaultValue: [1],
         onChange: function (result) {

         },
         onConfirm: function (result) {
             let is70 = false
             if (result[0].value == 5 || result[0].value == 6){
                is70 = true
             }
             self.setState({check_project_lable:result[0].label,check_project:result[0].value,is70,check_method:is70 ? 1:self.state.check_method})
         },
         id: 'checkProJect'
      });
  }

  choiceAllergyHistory(){
    let self = this
    weui.picker(historys, {
         className: 'custom-classname',
         container: 'body',
         defaultValue: [1],
         onChange: function (result) {

         },
         onConfirm: function (result) {
             self.setState({history_lable:result[0].label,history:result[0].value})
         },
         id: 'historys'
      });
  }

  choiceAge(){
    let self = this
    let ages = []
    for(let i=1;i<=100;i++){
      ages.push({label:i + "岁",value: i})
    }
    weui.picker(ages, {
         className: 'custom-classname',
         container: 'body',
         defaultValue: [40],
         onChange: function (result) {

         },
         onConfirm: function (result) {
            let is70 = false
            if(result[0].value >= 70){
              is70 = true
            }
            self.setState({age:result[0].value,is70,check_method:is70 ? 1:self.state.check_method})
         },
         id: 'historys'
    });
  }

  async subMit(){
    let {name,sex,age,phone,appointment_date,time_bucket,check_project,check_method,history,allergy_history,remark,check_project_lable,history_lable} = this.state;
    if(name == ""){
      alert("请输入姓名")
      return;
    }
    if(age <= 0){
      alert("请选择年龄")
      return;
    }
    if(appointment_date == ""){
      alert("请选择预约时间")
      return;
    }
    if(phone.length != 11 || isNaN(parseInt(phone))){
      alert("请输入正确手机号")
      return;
    }
    document.getElementById("loadingToast").style.display = "block"
    let res = await Axios.post("http://momoman.cn/jg/appointment/create",this.state)
    if(res.status == 200){
      if(check_project == 1){
        location.href = "https://mp.weixin.qq.com/s/v5ERTA7B3aXjecPVMzrYNA"
     }
     if(check_project == 2){
       location.href = "https://mp.weixin.qq.com/s/-ZYzj-0Hcd2pfCggIGJuBA"
     }
     if(check_project == 3){
       location.href = "https://mp.weixin.qq.com/s/8eqSfuNofulXk41qb1dCeA"
     }
     if(check_project == 4){
       location.href = "https://mp.weixin.qq.com/s/I7CLWUt7Y2cf7v609Vu7mA"
     }
     if(check_project == 5){
       location.href = "https://mp.weixin.qq.com/s/LFMbVZSwsoEhUBQCQO0oCg"
     }
     if(check_project == 6){
       location.href = "https://mp.weixin.qq.com/s/fvy8cGmH-nrIrfpsTt_iyA"
     }
     document.getElementById("loadingToast").style.display = "none"
     document.getElementById("toast").style.display = "block"
    }else{
      alert("预约失败，请检查填写项")
    }
    
  }

  render() {
    let {name,sex,age,phone,appointment_date,time_bucket,check_project,check_method,history,allergy_history,remark,check_project_lable,history_lable,is70} = this.state;
    return (
      <Layout>
        <div>
          <div id="loadingToast" style={{display: "none"}}>
            <div className="weui-mask_transparent"></div>
            <div className="weui-toast">
                <i className="weui-loading weui-icon_toast"></i>
                <p className="weui-toast__content">预约中</p>
            </div>
          </div>
          <div id="toast" style={{display: "none"}}>
              <div className="weui-mask_transparent"></div>
              <div className="weui-toast">
                  <i className="weui-icon-success-no-circle weui-icon_toast"></i>
                  <p className="weui-toast__content">预约成功</p>
              </div>
          </div>
          <div style={{height:5}}></div>
          <div className="weui-cells__group weui-cells__group_form">
            <div className="weui-cells__title">请填写预约信息</div>
            <div className="weui-cells weui-cells_form">
              <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">姓名</label></div>
                <div className="weui-cell__bd">
                    <input id="js_input" value={name} onChange={(e)=>{
                        this.setState({name:e.target.value})
                    }} className="weui-input" placeholder="请填写姓名" />
                </div>
              </div>
              <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">性别</label></div>
                <div className="weui-cell__bd">
                <Radio.Group onChange={(e)=>{this.setState({sex:e.target.value})}} value={sex}>
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </Radio.Group>
                </div>
              </div>
              <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">年龄</label></div>
                <div className="weui-cell__bd" onClick={this.choiceAge.bind(this)} id="ages">
                    <input className="weui-input" value={age != 0 ? age + "岁":""} disabled={true} placeholder="请选择年龄" type="text" />
                </div>
              </div>
              <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">手机</label></div>
                <div className="weui-cell__bd">
                    <input className="weui-input" value={phone} onChange={(e)=>{
                      this.setState({ phone: e.target.value })  
                    }} placeholder="请填写联系电话" type="number" pattern="[0-9]*" />
                </div>
              </div>
              <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">预约时间</label></div>
                <div id="datePicker" onClick={this.choiceDate.bind(this)}>
                    <input className="weui-input" disabled={true} value={appointment_date} placeholder="请选择预约时间" type="text" />
                </div>
              </div>
              <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">时间段</label></div>
                <div className="weui-cell__bd">
                <Radio.Group onChange={(e)=>{
                    this.setState({ time_bucket: e.target.value })
                }} value={time_bucket}>
                  <Radio value={1}>上午</Radio>
                  <Radio value={2}>下午</Radio>
                </Radio.Group>
                </div>
              </div>
              <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">检查项目</label></div>
                <div className="weui-cell__bd" id="checkProJect" onClick = { this.checkProJect.bind(this)}>
                  <input className="weui-input" disabled={true} value={check_project_lable} placeholder="请选择检查项目" type="text" />
                </div>
              </div>
              <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">检查方式</label></div>
                <div className="weui-cell__bd">
                <Radio.Group onChange={(e)=>{
                  this.setState({ check_method: e.target.value })
                }} value={check_method}>
                  <Radio value={1}>普通</Radio>
                  <Radio value={2} disabled={is70}>无痛</Radio>
                </Radio.Group>
                </div>
              </div>
              <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">既往病史</label></div>
                <div className="weui-cell__bd" id="historys">
                  <input className="weui-input" onChange={(e)=>{
                    this.setState({history: e.target.value})
                  }} value={history} placeholder="请填写既往病史" type="text" />
                </div>
              </div>
              <div className="weui-cell">
                <div className="weui-cell__hd"><label className="weui-label">药物过敏史</label></div>
                <input className="weui-input" value={allergy_history} onChange={(e)=>{
                  this.setState({ allergy_history: e.target.value})
                }} placeholder="如有请填写" type="text" />
              </div>
              <div className="weui-cell">
                <div className="weui-cell__bd">
                    <textarea className="weui-textarea" value={remark} onChange={(e)=>{
                      this.setState({ remark: e.target.value}) 
                    }} placeholder="备注" rows="3"></textarea>
                </div>
              </div>
              <div style={{height:5}}></div>
              <a href="javascript:;" onClick={this.subMit.bind(this)} className="weui-btn weui-btn_primary">提交预约申请</a>
              <div style={{height:15}}></div>
            </div>
          </div>
        </div>
      </Layout>

    )
  }
}


