import React from 'react'
import { Upload, Button, message } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import { extractTextFromPDF, extractTextFromDocx, extractNameEmailPhone } from '../utils/resumeParser'
import { useDispatch } from 'react-redux'
import { createCandidate, updateProfile } from '../features/candidatesSlice'


export default function ResumeUpload() {
const dispatch = useDispatch()


const handleFile = async (file) => {
try {
let text = ''
if (file.type === 'application/pdf' || file.name.endsWith('.pdf'))
