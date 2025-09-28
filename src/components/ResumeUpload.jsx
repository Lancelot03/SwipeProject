import React from 'react'
import { Upload, Button, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { extractTextFromPDF, extractTextFromDocx, extractNameEmailPhone } from '../utils/resumeParser'
import { useDispatch } from 'react-redux'
import { createCandidate } from '../features/candidatesSlice'

export default function ResumeUpload() {
  const dispatch = useDispatch()

  const handleFile = async (file) => {
    try {
      let text = ''

      if (file.type === 'application/pdf' || file.name.endsWith('.pdf')) {
        text = await extractTextFromPDF(file)
      } else if (file.name.endsWith('.docx')) {
        text = await extractTextFromDocx(file)
      } else {
        message.error('Only PDF or DOCX files are supported')
        return false
      }

      const parsed = extractNameEmailPhone(text)
      dispatch(createCandidate({ profile: parsed }))
      message.success('Candidate created. Please go to Interviewee tab to continue.')
      return false // prevent upload to server

    } catch (e) {
      console.error(e)
      message.error('Failed to parse resume. Try a simpler PDF or use DOCX.')
      return false
    }
  }

  return (
    <div style={{ marginBottom: 16 }}>
      <Upload
        beforeUpload={handleFile}
        showUploadList={false}
        accept=".pdf,.docx"
      >
        <Button icon={<InboxOutlined />}>Upload Resume (PDF or DOCX)</Button>
      </Upload>
    </div>
  )
}
