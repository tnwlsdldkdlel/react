import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
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

    return { doLogin, doLogout, moveToPath, moveToLoginReturn, isLogin }
}

export default useCustomLogin   