import api from './index'

export const loginServer = async () => {

    try {
        return await api.get(`/auth/login?kakaoToken=${encodeURIComponent(localStorage.getItem('kakaoToken'))}`)
    } catch (error) {
        console.error('server kakao login:', error.response ? error.response.data : error.message)
        throw error
    }
}

export const signOutServer = async () => {
    try {
        return await api.get(`/auth/signout?kakaoToken=${encodeURIComponent(localStorage.getItem('kakaoToken'))}`)
    } catch (error) {
        console.error('server server signout:', error.response ? error.response.data : error.message)
        throw error
    }
}
