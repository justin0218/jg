import Link from 'next/link'
import Head from 'next/head'
import Router from 'next/router'
import {Button,Input} from 'antd'
import Left from '../components/left'
import Nav from '../components/nav'
import Loading from '../common/loading'
export default ({ children, title = '提交预约申请' }) => (
  <div>
    <Head>
      <title>{ title }</title>
      <meta charSet='utf-8' />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no, minimal-ui, viewport-fit=cover" /> 
      <script src="https://res.wx.qq.com/open/libs/weuijs/1.2.1/weui.min.js"></script>     
      <link rel="stylesheet" href="/static/weui.css" />
    </Head>
    { children }  
  </div>
)