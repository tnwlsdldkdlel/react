import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginPostAsync } from "../../slices/loginSlice"
import { useNavigate } from 'react-router-dom';
import useCustomLogin from '../../hooks/useCustomLogin';

const initState = {
    email: "",
    pw: ""
}


function LoginComponent() {
    const [loginParam, setLoginParam] = useState(initState);
    const { moveToPath, doLogin } = useCustomLogin();

    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value;

        setLoginParam({ ...loginParam });
    }

    const handleClickLogin = (e) => {
        // dispath(login(loginParam))
        // unwrap 오류처리 try catch
        // 비동기지만 동기화된거처럼 결과를 받아서 보는 상황에 꽤 유리
        // replace true하면 뒤로가기 불가능.
        try {
            doLogin(loginParam)
                .unwrap()
                .then(data => {
                    console.log(data);
                    if (data == null) {
                        alert("이메일과 패스워드를 확인해주세요.");
                    } else {
                        alert("로그인 성공");
                        moveToPath("/");
                    }
                })
        } catch (error) {
            console.log(error);
        }

    }

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center">
                <div className="text-4xl m-4 p-4 font-extrabold text-blue-500">Login Component</div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-2/5 p-6 text-right font-bold">Email</div>
                    <input className="w-3/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="email" type={'text'} value={loginParam.email} onChange={handleChange} ></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-2/5 p-6 text-right font-bold">Password</div>
                    <input className="w-3/5 p-6 rounded-r border border-solid border-neutral-500 shadow-md"
                        name="pw" type={'password'} value={loginParam.pw} onChange={handleChange} ></input>
                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full justify-center">
                    <div className="w-2/5 p-6 flex justify-center font-bold">
                        <button className="rounded p-4 w-36 bg-blue-500 text-xl text-white"
                            onClick={handleClickLogin}>
                            LOGIN
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginComponent