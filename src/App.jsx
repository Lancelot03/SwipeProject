import React from 'react'
import { Layout, Tabs } from 'antd'
import ResumeUpload from './components/ResumeUpload'
import InterviewChat from './components/InterviewChat'
import Dashboard from './components/Dashboard'
import { useSelector } from 'react-redux'


const { Content } = Layout


export default function App(){
const candidates = useSelector(s=>s.candidates)
const firstId = candidates.order[0]


return (
<Layout style={{padding:20}}>
<div className="header">
<h1>AI Interview Assistant</h1>
<div>Built for Swipe Internship</div>
</div>
<Content>
<Tabs defaultActiveKey="interviewee">
<Tabs.TabPane tab="Interviewee" key="interviewee">
<div style={{display:'flex', gap:20}}>
<div style={{flex:1}}>
<ResumeUpload/>
<div style={{marginTop:12}}>
<InterviewChat candidateId={firstId} />
</div>
</div>
<div style={{width:360}}>
<Dashboard />
</div>
</div>
</Tabs.TabPane>
<Tabs.TabPane tab="Interviewer" key="interviewer">
<Dashboard />
</Tabs.TabPane>
</Tabs>
</Content>
</Layout>
)
}
