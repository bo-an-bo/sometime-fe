import React from 'react'
import styled, { keyframes } from 'styled-components'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import LoginKakao from '../Login/LoginKakao'
import { Button } from 'antd'
import { MainSection, TitleText } from './MainStyle'
import { IoIosArrowDown } from 'react-icons/io'

// 애니메이션 정의
const bounce = keyframes`
    0%, 20%, 50%, 80%, 100% {
        transform: translateY(0);
    }
    40% {
        transform: translateY(-20px);
    }
    60% {
        transform: translateY(-10px);
    }
`

// 화살표 컴포넌트 스타일
const ScrollDownArrow = styled.div`
    position: relative;
    width: 30px;
    height: 30px;
    animation: ${bounce} 2s infinite;
    margin: 20px auto;
`

const Main1 = () => {
    const { user } = useAuth()
    const navigate = useNavigate()

    const onClickHandler = () => {
        navigate('/group')
    }

    return (
        <div>
            <MainSection>
                <HeaderContainer>
                    <LogoContainer>
                        <StyledLogoImg src={'/img/sumtime_white.svg'} alt="logo_white_img"></StyledLogoImg>
                        <StyledText>모임의 계산을 쉽게</StyledText>
                    </LogoContainer>
                    <StyledButtonContainer>
                        {user ? (
                            <>
                                <StyledContent style={{ color: 'white' }}>
                                    <span
                                        style={{
                                            backgroundColor: '#F8FAFF',
                                            padding: '0px 7px 0px 7px',
                                            borderRadius: '100px',
                                            color: '#173E92',
                                            fontFamily: 'Dotum Bold',
                                            marginRight: '5px',
                                        }}
                                    >
                                        {user.nickname}
                                    </span>
                                    님 환영합니다.
                                </StyledContent>
                                <StyledButtonStart onClick={onClickHandler}>sumtime 시작하기</StyledButtonStart>
                            </>
                        ) : (
                            <LoginKakao />
                        )}
                    </StyledButtonContainer>
                </HeaderContainer>

                <MainTitleText>
                    sumtime에 오신 것을 환영합니다
                    <br />
                    저희 서비스를 이렇게 사용하실 수 있어요
                </MainTitleText>

                <StyledContentSection>
                    <StyledImgContainer>
                        <StyledTableImg src={'img/main/member_table.png'} alt="example_tabel" />
                    </StyledImgContainer>
                    <StyldMainText>
                        <StyledContent style={{ fontFamily: 'Dotum Bold', fontSize: '1.1rem' }}>
                            sumtime과 함께 필요한 데이터를 마음껏 다루어 보세요!
                        </StyledContent>
                        <StyledContent style={{ fontFamily: 'Dotum Bold', fontSize: '1rem' }}>
                            이런 걸 할 수 있어요
                        </StyledContent>
                        <StyledContent>✔️ 모임 회비 안 낸 사람 조회</StyledContent>
                        <StyledContent>✔️ 간식 행사와 같은 모임 내 이벤트 생성</StyledContent>
                        <StyledContent>✔️ 쉽고 빠른 회원 조회, 삭제</StyledContent>
                    </StyldMainText>
                </StyledContentSection>
                <ScrollDownArrow style={{ marginTop: '12vh' }}>
                    <IoIosArrowDown style={{ color: '#173E92' }} />
                </ScrollDownArrow>
            </MainSection>
        </div>
    )
}

export default Main1

const MainTitleText = styled(TitleText)`
    text-align: left;
    font-size: 1.5rem;
    justify-content: left;
    padding-right: 40%;
    padding-left: 3%;

    @media (max-width: 768px) {
        font-size: 1.1rem;
        padding-right: 30%;
        padding-left: 3%;
    }
`

const StyledText = styled.div`
    color: #fff;
    font-family: 'Dotum Bold', serif;
    font-size: ${(props) => (props.isopen ? '2vh' : '3vh')};
    @media (max-width: 768px) {
        font-size: 2vh;
    }
`

const StyledContent = styled.div`
    font-family: 'Dotum Medium', serif;
    font-size: 90%;
    @media (max-width: 768px) {
        font-size: 80%;
    }
`

const LogoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;
    padding-left: 44%;
    @media (max-width: 768px) {
        padding-left: 0;
        text-align: center;
    }
`

const StyledButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-content: center;
    align-items: center;
    gap: 20px;
    padding-right: 5%;
    @media (max-width: 768px) {
        padding-top: 5%;
        padding-right: 0;
        flex-direction: row;
    }
`

const StyledButtonStart = styled(Button)`
    font-family: 'Dotum Bold', serif;
    width: 20vh;
    height: auto;
    align-content: center;
`

const StyledLogoImg = styled.img`
    height: 100px;
    align-self: center; // 중앙 정렬을 위해 추가
    width: ${(props) => (props.isopen ? '10vh' : '15vh')};
    @media (max-width: 768px) {
        width: 10vh;
    }
`

const StyledImgContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    @media (max-width: 768px) {
        width: 100%;
    }
`

const StyledTableImg = styled.img`
    box-shadow: 0 0 3vh rgba(0, 0, 0, 0.3);
    max-width: 480px;
    border-radius: 3%;
    @media (max-width: 768px) {
        width: 270px; // 모바일에서 테이블 이미지 크기 조정
        height: auto;
    }
`

const StyledContentSection = styled.div`
    margin-top: 50px;
    display: flex;
    gap: 30px;
    height: ${(props) => (props.isopen ? '55vh' : '30vh')};
    align-items: center; // 수직 중앙 정렬 추가
    @media (max-width: 768px) {
        flex-direction: column;
        height: auto;
    }
`

const StyldMainText = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
    text-align: left;
    @media (max-width: 768px) {
        text-align: center;
        padding: 0 20px;
    }
`

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 10px 0;
    background-color: #173e92;
    width: 100%;
    justify-content: space-between;
    margin-bottom: 20px;
    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 10px 20px;
    }
`
