import React, { useEffect, useState } from 'react' // eslint-disable-line no-unused-vars
import { useNavigate } from 'react-router-dom' // eslint-disable-line no-unused-vars
import styled from 'styled-components' // eslint-disable-line no-unused-vars
import LogoColor from '../../IMG/logo_color.svg'
import exmTab from '../../IMG/exmple_table.svg'

import { Button } from 'antd'
import LogoutKakao from '../../Components/Login/LogoutKakao'
import LoginKakao from '../../Components/Login/LoginKakao'

const MainPage = () => {
    const navigate = useNavigate()
    const onClickHandler = () => {
        navigate('/group')
    }

    useEffect(() => {
        const storedNickname = localStorage.getItem('nickname')
        if (storedNickname) {
            setNickname(storedNickname)
        } else {
            setNickname('')
        }
    }, [])


    const [nickname, setNickname] = useState('')

    return (
        <StyledLayoutMain>
            <LogoContainer>
                <StyledLogoImg src={LogoColor} alt="logo_white_img"></StyledLogoImg>
                <StyledText style={{ fontSize: '4vh' }}>모임의 계산을 쉽게</StyledText>
            </LogoContainer>

            <StyledContentSection>
                <StyledTableImg src={exmTab} alt="example_tabel" />
                <StyldMainText>
                    <StyledText style={{ fontSize: '1.4rem', marginBottom: '5px' }}>sumtime과 함께 필요한 데이터를 마음껏 다루어
                        보세요!</StyledText>
                    <StyledText style={{ fontSize: '1.2rem' }}>이런 걸 할 수 있어요</StyledText>
                    <StyledContent>✔️ 모임 회비 안 낸 사람 조회</StyledContent>
                    <StyledContent>✔️ 간식 행사와 같은 모임 내 이벤트 생성</StyledContent>
                    <StyledContent>✔️ 쉽고 빠른 회원 조회, 삭제</StyledContent>

                </StyldMainText>
            </StyledContentSection>
            <StyledButtonContainer>
                {nickname &&
                    <StyledContent><span
                        style={{
                            backgroundColor: '#b9d5ff',
                            padding: '0px 5px 0px 5px',
                            margin: '0px 5px 0px 0px',
                            borderRadius: '10px',
                        }}>{nickname}</span>님
                        환영합니다.
                    </StyledContent>}
                <StyledButtonStart onClick={onClickHandler}>sumtime 시작하기</StyledButtonStart>
                {nickname ? (
                    <LogoutKakao onLogout={() => setNickname('')} />

                ) : (
                    <LoginKakao onLogin={() => setNickname(localStorage.getItem('nickname'))} />
                )}
            </StyledButtonContainer>
        </StyledLayoutMain>
    )
}

const StyledText = styled.div`
    color: #003F98;
    font-family: 'Dotum Bold', serif;
`

const StyledContent = styled.div`
    color: #003F98;
    font-family: 'Dotum Medium', serif;
    font-size: 1rem;
`

const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const StyledButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    gap: 20px;

`
const StyledButtonStart = styled(Button)`
    font-family: 'Dotum Bold', serif;
    font-size: 20px;
    padding: 10px;
    width: 40vh;
    height: auto;
    align-content: center;
`


const StyledLayoutMain = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; // 중앙 정렬을 위해 추가
    margin-bottom: 2%;
    margin-top: 2%;
    width: 100%;
`


const StyledLogoImg = styled.img`
    width: 20vh;
    height: 15vh;
    align-self: center; // 중앙 정렬을 위해 추가

`

const StyledTableImg = styled.img`
    //width: 430px;
    //height: 300px;
    //margin: 20px auto; // 센터 정렬을 위해 수정

    @media (max-width: 768px) {
        width: 300px; // 모바일에서 테이블 이미지 크기 조정
        height: 210px;
    }
`

const StyledContentSection = styled.div`
    margin-top: 50px;
    margin-bottom: 50px;
    //padding-top: 20px;
    //padding-bottom: 20px;

    display: flex;
    flex-direction: row;
    gap: 20px;
    width: 100%;
    height: 35vh;
    background-color: #dceaff;
    font-family: 'Dotum Bold', serif;
    font-size: 20px;
    justify-content: center; // 콘텐츠를 중앙으로 정렬
    align-items: center; // 수직 중앙 정렬 추가
`

const StyldMainText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`

export default MainPage
