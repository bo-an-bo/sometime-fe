import React, { useState, useEffect } from 'react'
import { addMember, getMember } from '../../apis/members'
import { Button, Modal, Input } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const StyledInput = styled(Input)`
    margin-bottom: 5px;
`

const StyledAddButton = styled(Button)`
    font-family: 'Dotum Light';
    font-size: 18px;
    width: 100px;
    height: 40px;
    margin: 10px 10px 0 0;
    background-color: #003f98;
`

const AddMember = ({ groupId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({})
    const [propNames, setPropNames] = useState([])
    const [name, setName] = useState('')

    console.log('propNames:', propNames)

    useEffect(() => {
        const fetchMemberData = async () => {
            try {
                const data = await getMember(groupId)
                const memberInfo = data.memberInfo || {}
                console.log('memberInfo:', memberInfo)
                const initialFormData = {}
                const propNamesArray = [...memberInfo]
                propNamesArray.forEach((propName) => {
                    initialFormData[propName] = memberInfo[propName] || ''
                })

                setFormData(initialFormData)
                setPropNames(propNamesArray)
            } catch (error) {
                console.error('Failed to fetch member data:', error)
            }
        }
        fetchMemberData()
    }, [groupId])

    const isAnyFieldEmpty = () => {
        return propNames.some((propName) => !formData[propName])
    }

    const handleInputChange = (e, propName) => {
        setFormData({
            ...formData,
            [propName]: e.target.value,
        })
    }

    console.log('formData:', formData)

    const handleAddMember = async () => {
        setLoading(true)
        await addMember(groupId, name, formData)
        setLoading(false)
        setIsModalOpen(false)
        alert('회원 추가가 완료되었습니다.')
        window.location.reload()
    }

    return (
        <>
            <StyledAddButton type="primary" onClick={() => setIsModalOpen(true)}>
                회원 추가
            </StyledAddButton>
            <Modal
                title="회원 추가"
                open={isModalOpen}
                onOk={handleAddMember}
                onCancel={() => setIsModalOpen(false)}
                confirmLoading={loading}
                okButtonProps={{ disabled: isAnyFieldEmpty() }}
            >
                <StyledInput placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
                {propNames.map((propName) => (
                    <StyledInput
                        key={propName}
                        placeholder={propName}
                        value={formData[propName]}
                        onChange={(e) => handleInputChange(e, propName)}
                    />
                ))}
            </Modal>
        </>
    )
}

AddMember.propTypes = {
    groupId: PropTypes.string.isRequired,
}

export default AddMember
