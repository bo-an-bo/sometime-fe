import React, { useState } from 'react'
import { Form, Input, Button, Upload, Modal } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { createGroup } from '../../apis/groups'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

const normFile = (e) => {
    if (Array.isArray(e)) {
        return e
    }
    return e && e.fileList
}

const CreateForm = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [file, setFile] = useState(null)
    const [isProcessing, setIsProcessing] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [modalContent, setModalContent] = useState('')
    const navigate = useNavigate()

    const isAnyFieldEmpty = () => {
        return !name || !description
    }

    const showModal = (content) => {
        setModalContent(content)
        setIsModalVisible(true)
    }

    const handleOk = () => {
        setIsModalVisible(false)
        if (modalContent === '모임이 생성되었습니다.') {
            navigate('/group')
        }
    }

    const handleCreateGroup = async () => {
        if (isProcessing) {
            return
        }
        setIsProcessing(true)
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('description', description)
            formData.append('memberFile', file)
            await createGroup(formData)
            showModal('모임이 생성되었습니다.')
        } catch (error) {
            showModal('모임 생성에 실패했습니다.')
        } finally {
            setIsProcessing(false)
        }
    }

    const props = {
        name: 'file',
        accept: '.xlsx, .xls, .csv',
        multiple: false,
        showUploadList: true,
        beforeUpload: (file) => {
            setFile(file)
            return false
        },
    }

    return (
        <StyledForm
            name="basic"
            labelCol={{
                span: 3,
            }}
            wrapperCol={{
                span: 16,
            }}
            initialValues={{
                remember: true,
            }}
            autoComplete="off"
            onFinish={handleCreateGroup}
        >
            <StyledFormWrapper>
                <Title>모임 기본 정보 등록</Title>
                <StyledFormItems label="모임 이름" name="groupname">
                    <Input placeholder="ex) 열정 모임" onChange={(e) => setName(e.target.value)} />
                </StyledFormItems>
                <StyledFormItems label="모임 설명" name="groupdescription">
                    <Input placeholder="ex) 열정 있는 사람들의 모임" onChange={(e) => setDescription(e.target.value)} />
                </StyledFormItems>
            </StyledFormWrapper>
            <StyledFormWrapper>
                <Title>모임 회원 등록</Title>
                <StyledFormItems label="파일 업로드" valuePropName="fileList" getValueFromEvent={normFile}>
                    <Upload {...props}>
                        <Button icon={<UploadOutlined />}>파일 업로드</Button>
                    </Upload>
                </StyledFormItems>
            </StyledFormWrapper>
            <StyledFormItems>
                <StyledButton type="primary" htmlType="submit" disabled={isAnyFieldEmpty()}>
                    완료
                </StyledButton>
            </StyledFormItems>
            <Modal
                title="알림"
                open={isModalVisible}
                onOk={handleOk}
                footer={[
                    <Button key="ok" type="primary" onClick={handleOk}>
                        확인
                    </Button>,
                ]}
            >
                <p>{modalContent}</p>
            </Modal>
        </StyledForm>
    )
}

export default CreateForm

const StyledForm = styled(Form)`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: 50px;
`
const StyledFormWrapper = styled.div`
    width: 60%;
    @media (max-width: 768px) {
        width: 90%;
    }
    padding: 10px;
    margin: 20px;
    border-radius: 10px;
    background-color: rgba(0, 62.67, 151.94, 0.08);
`

const StyledButton = styled(Button)`
    width: 100px;
    height: 40px;
    font-family: 'Dotum Light';
    font-size: 18px;
    background-color: #003e97;
`

const Title = styled.h1`
    margin: 10px 40px;
    @media (max-width: 768px) {
        margin: 10px;
    }
    text-align: left;
    font-size: 32px;
    font-weight: 700;
    word-wrap: break-word;
    font-family: 'Dotum Bold';
`
const StyledFormItems = styled(Form.Item)`
    .ant-form-item-label {
        @media (max-width: 768px) {
            margin-left: 10px;
        }
        font-size: 24px;
        font-family: 'Dotum Light';
        font-weight: 700;
        word-wrap: break-word;
    }
    .ant-input {
        font-size: 14px;
        margin-top: 6px;
    }
    .ant-upload {
        margin-top: 6px;
    }
`
