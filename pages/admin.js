import Layout from '../components/layout'
import {Radio,Table,Input,Button,Select,DatePicker} from 'antd'
import {checkProjects,historys} from '../utils/config'
import moment from "moment"
import Axios from 'axios';
import queryString from 'query-string';
const { Option } = Select;
export default class extends React.Component {
  static async getInitialProps({ req,query,jsonPageRes }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent,query,jsonPageRes }
  }
  state = {
    loading:true,
    data:{
      list:[]
    },
    searchs:{
      name:"",
      sex:0,
      page:1,
      time_bucket:0,
      check_method:0,
      phone:"",
      appointment_date:"",
      check_project:0
    }
  }

  async loadList(serachParam){
    this.setState({loading:true})
    let res = await Axios.get(`http://momoman.cn/jg/appointment/list?${queryString.stringify(serachParam)}`)
    console.log(res);
    this.setState({data:res.data,loading:false})
  }

  async componentDidMount(){
     await this.loadList();
  }
 


 

  render() {
    let {data,searchs,loading} = this.state;
    const columns = [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '性别',
        dataIndex: 'sex',
        key: 'sex',
        render:(a,b,c)=>{
          return <span>{b.sex == 1 ? "男":"女"}</span>
        }
      },
      {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
        render:(a,b,c)=>{
          return <span>{b.age}岁</span>
        }
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
      },
      {
        title: '预约时间',
        dataIndex: 'appointment_date',
        key: 'appointment_date',
        render:(a,b,c)=>{
           return <span>{b.appointment_date} {b.time_bucket == 1 ? "上午":"下午"}</span>
        }
      },
      {
        title: '检查项目',
        dataIndex: 'check_project',
        key: 'check_project',
        render:(a,b,c)=>{
           return <span>{checkProjects.find((v)=>{return v.value == b.check_project}).label}</span>
        }
      },
      {
        title: '检查方式',
        dataIndex: 'check_method',
        key: 'check_method',
        render:(a,b,c)=>{
           return <span>{b.check_method == 1 ? "普通":"无痛"}</span>
        }
      },
      {
        title: '既往史',
        dataIndex: 'history',
        key: 'history'
      },
      {
        title: '过敏史',
        dataIndex: 'allergy_history',
        key: 'allergy_history'
      },
      {
        title: '备注',
        dataIndex: 'remark',
        key: 'remark'
      },
      {
        title: '创建时间',
        dataIndex: 'create_time',
        key: 'create_time',
        render:(a,b,c)=>{
           return <span>{moment(b.create_time).format("YYYY-MM-DD HH:mm:ss")}</span>
        }
      }
      
      
    ];
    return (
      <div>
        <div style={{height:15}}></div>
          &nbsp;&nbsp; 
          <Input placeholder="姓名" style={{width:200}} value={searchs.name} onChange={(e)=>{
            searchs.name = e.target.value;
            this.setState({searchs})
          }} />
          &nbsp;&nbsp;
          <Input placeholder="手机号" style={{width:200}} value={searchs.phone} onChange={(e)=>{
            searchs.phone = e.target.value;
            this.setState({searchs})
          }} />
          &nbsp;&nbsp;
          <DatePicker style={{width:200}} placeholder="预约日期" onChange={(date, dateString)=>{
              searchs.appointment_date = dateString;
              this.setState({searchs})
          }} />
          &nbsp;&nbsp;
          <Select defaultValue={0} placeholder="性别" style={{ width: 120 }} onChange={(v)=>{
              searchs.sex = v;
              this.setState({searchs})
          }}>
            <Option value={0}>全部性别</Option>
            <Option value={1}>男</Option>
            <Option value={2}>女</Option>
          </Select>
          &nbsp;&nbsp; 
          <Select defaultValue={0} style={{ width: 120 }} onChange={(v)=>{
              searchs.time_bucket = v;
              this.setState({searchs})
          }}>
            <Option value={0}>全部时间段</Option>
            <Option value={1}>上午</Option>
            <Option value={2}>下午</Option>
          </Select>
          &nbsp;&nbsp; 
          <Select defaultValue={0} style={{ width: 120 }} onChange={(v)=>{
              searchs.check_method = v;
              this.setState({searchs})
          }}>
            <Option value={0}>全部检查方式</Option>
            <Option value={1}>普通</Option>
            <Option value={2}>无痛</Option>
          </Select>
          &nbsp;&nbsp;
          <Select defaultValue={0} style={{ width: 120 }} onChange={(v)=>{
              searchs.check_project = v;
              this.setState({searchs})
          }}>
            <Option value={0}>全部检查项目</Option>
            {
              checkProjects.map((v,k)=>(
                <Option key={k} value={v.value}>{v.label}</Option>
              ))
            }
          </Select>
          &nbsp;&nbsp;
          <Button onClick={async ()=>{
            let {searchs} = this.state;
            searchs.page = 1
            await this.loadList(searchs)
          }}>搜索</Button>
        <div style={{height:15}}></div>
        <Table rowKey={`id`} pagination={{
            pageSize:data.size,
            total:data.total,
            current:searchs.page,
            onChange:async (page)=>{
              let {searchs} = this.state;
              searchs.page = page
              await this.loadList(searchs)
            }
        }} dataSource={data.list} loading={loading} columns={columns} />
      </div>
      
    )
  }
}


