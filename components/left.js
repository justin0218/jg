import Layout from '../components/layout'
import axios from 'axios'
import readStream from '../utils/util'
import protobuf from "../proto/blog_pb";
import {apiHost} from '../utils/config';
import Event from '../utils/emiter';
import { Menu, Icon } from 'antd';
const { SubMenu } = Menu;

export default class extends React.Component {
  static async getInitialProps({ req,query,jsonPageRes }) {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
    return { userAgent,query,jsonPageRes }
  }

  state = {
    path:"",
    orderIndex:[],
    tps:[],
    rankingList:[],
    name:"",
    recommends:[],
    leftStyle:{},
    medata:{}
  }

 

  async componentDidMount(){
    console.log("start")

    setTimeout(()=>{
      document.getElementById("t").setAttribute("class","shadownone")
      document.getElementById("loading").style.display = "none";
    },500)

  }

  render() {
    const {path,orderIndex,tps,name,rankingList,recommends,leftStyle,medata} = this.state
    return (
        <div className="left_box" id="left_box" style={leftStyle}>
          <Menu
            mode="inline"
          >
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="mail" />
                  <span>博客管理</span>
                </span>
              }
            >
              <Menu.Item key="1" onClick={()=>{location.href = "/article"}}>新建文章</Menu.Item>
              <Menu.Item key="2">文章列表</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="appstore" />
                  <span>账本管理</span>
                </span>
              }
            >
              <Menu.Item key="5">记一笔账</Menu.Item>
              <Menu.Item key="6">收入分析</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub4"
              title={
                <span>
                  <Icon type="setting" />
                  <span>音乐管理</span>
                </span>
              }
            >
              <Menu.Item key="9">上传音乐</Menu.Item>
            </SubMenu>
          </Menu>  
      
        <style jsx>{`
        .tag{
          line-height: 24px;
          height: 24px;
          display: block;
          background: #999;
          float: left;
          padding: 3px 11px;
          margin: 10px 10px 0 0;
          border-radius: 8px;
          -moz-transition: all 0.5s;
          -webkit-transition: all 0.5s;
          -o-transition: all 0.5s;
          transition: all 0.5s;
          color: #FFF;
          text-decoration: none;
        }
        .left_item .cation_item{
          margin-bottom: 10px;
          margin-left: 10px;
          cursor: pointer;
        }
        .left_item .cation_item:hover{
          color:#222;
        }
        .search{
          border: 1px solid #000;
          background: #000;
          border-radius: 0 5px 5px 0;
          position: relative;
        }
        .search .input_submit {
              border: 0;
              background: 0;
              color: #fff;
              outline: none;
              position: absolute;
              top: 10px;
              right: 8%;
              cursor: pointer;
          }
          .search input.input_text {
              border: 0;
              line-height: 36px;
              height: 36px;
              width: 72%;
              padding-left: 10px;
              outline: none;
          }
          .right_item p {
            margin: 20px 0 0 0;
            line-height: 22px;
            overflow: hidden;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            display: -webkit-box;
            -webkit-line-clamp: 2;
          }
          .right_item h3{
            font-size: 16px;
            line-height: 25px;
            text-shadow: #FFF 1px 1px 1px;
            color: #de4949;
            margin:0;
          }
          .right_item i{
            width: 150px;
            display: block;
            max-height: 100px;
            overflow: hidden;
            float: right;
            margin-left: 20px;
          }
          .right_item{
            background: rgba(255,255,255,0.8);
            padding: 15px;
            overflow: hidden;
            color: #797b7c;
            margin-bottom: 20px;
          }
          .left_box{
            width:256px;
            float:left;
            padding-bottom: 100%;
            background: #fff;
            position: fixed;
          }
          .left_item{
            background: rgba(255,255,255,0.5);
            margin-bottom: 20px;
            overflow: hidden;
          }
          .left_item ul li{
            width: 32%;
            overflow: hidden;
            float: left;
            height: 80px;
            margin-bottom: 2px;
            margin-right: 2px;
          }
          .left_item ul li img{
            width: 100%;
            height: 100%;
            -webkit-transition: all 0.5s;
            -moz-transition: all 0.5s;
            transition: all 0.5s;
            display:block;
          }
          .left_item h2{
            color: #333;
            font-size: 14px;
            line-height: 30px;
            padding-left: 20px;
            background: #fff;
            margin:0
          }
          .right_box{
            width:680px;
            float:right;
          }
          .about_me_i{
            width: 120px;
            float: left;
            clear: left;
            margin-right: 10px;
            overflow: hidden;
          }
        `}</style>
      </div>  
    )
  }
}


