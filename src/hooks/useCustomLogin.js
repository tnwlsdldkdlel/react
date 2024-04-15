import { useDispatch, useSelector } from 'react-redux';
import { Navigate, createSearchParams, useNavigate } from 'react-router-dom';
import { loginPostAsync, logout } from '../slices/loginSlice';

const useCustomLogin = () => {
    const navigate = useNavigate();
    const dispath = useDispatch(); //  redux store에 변경된 state값을 저장하기 위해서
    const loginState = useSelector(state => state.logSlice);
    const isLogin = loginState !== undefined ? true : false;

    const doLogin = (loginParam) => {
        return dispath(loginPostAsync(loginParam));
    }

    const doLogout = () => {
        dispath(logout());
    }

    const moveToPath = (path) => {
        navigate({ pathname: path }, { replace: true });
    }

    const moveToLoginReturn = () => {
        return <Navigate replace to="/member/login/" />;
    }

    const exceptionHandle = (ex) => {
        console.log("Exception------------------------")
        console.log(ex)
        const errorMsg = ex.response.data.error
        const errorStr = createSearchParams({ error: errorMsg }).toString()
        if (errorMsg === 'REQUIRE_LOGIN') {
            alert("로그인 해야만 합니다.")
            navigate({ pathname: '/member/login', search: errorStr })
            return
        }

        if (ex.response.data.error === 'ERROR_ACCESSDENIED') {
            alert("해당 메뉴를 사용할 수 있는 권한이 없습니다.")
            navigate({ pathname: '/member/login', search: errorStr })
            return
        }
    }

    return { doLogin, doLogout, moveToPath, moveToLoginReturn, isLogin, exceptionHandle }
}

export default useCustomLogin   