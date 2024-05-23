import React from 'react'
import MemberList from '../../Components/Tables/MemberList'
import styled from 'styled-components'
import { useEffect } from 'react'
import { useSelectedRows, useDeleteMemberIds } from '../../store/member'
import AddMemberButton from '../../Components/Buttons/AddMemberButton'
import DeleteMemberButton from '../../Components/Buttons/DeleteMemberButton'

const ShowGroupDetails = () => {
    const { selectedRows } = useSelectedRows()

    const { deleteMemberIds, setDeleteMemberIds } = useDeleteMemberIds()
    const groupId = window.location.href.split('/')[4]

    useEffect(() => {
        const ids = selectedRows.map((row) => row._id)

        setDeleteMemberIds(ids)
    }, [selectedRows, setDeleteMemberIds])
    return (
        <StyledPageLayout>
            <ButtonWrapper>
                <AddMemberButton groupId={groupId} />
                <DeleteMemberButton groupId={groupId} memberIds={deleteMemberIds} />
            </ButtonWrapper>
            <MemberList groupId={groupId} />
        </StyledPageLayout>
    )
}

const StyledPageLayout = styled.div`
    width: 100%;
    margin: 2%;
`
const ButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    gap: 5px;
    // padding: 10px;
    font-family: 'Dotum Light';
    margin: 0 2% 2% 2%;
`
export default ShowGroupDetails
