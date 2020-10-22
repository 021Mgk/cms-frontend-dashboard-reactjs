import React, { useState } from 'react'
import { Formik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux'
import { getUserInfo, login } from '../../actions/index'
import Cookies from 'js-cookie';



const INITIALVALUE = {
    username: '',
    password: ''
};
const Login = ({ dispatch }) => {
    const [message, setMessage] = useState();

    const LoginFormValidation = yup.object().shape({
        username: yup.string().min(3, "کلمه کاربری حداقل 5 حرف می باشد.").required('لطفا نام کاربری صحیح وارد نمایید'),
        password: yup.string().min(6, " کلمه عبور حداقل 6 حرف می باشد").required('لطفا کلمه عبور صحیح وارد نمایید')
    });

    return (
        <div>
            <div> {message && message}</div>
            <Formik
                initialValues={INITIALVALUE}
                validationSchema={LoginFormValidation}
                onSubmit={async (values, { setSubmitting }) => {
                    Cookies.remove("token");
                    const res = await fetch('http://localhost:8080/auth/login', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include',
                        body: JSON.stringify(values)
                    });
                    const response = await res.json();
                    if (response.success) {
                        dispatch(login);
                        dispatch(getUserInfo(response.userInfo))
                    } else {
                        setMessage(response.message);
                    }
                }
                }
            >
                {
                    ({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        isSubmitting
                    }) => (
                            <form className='form__style' onSubmit={handleSubmit} autoComplete='off'>

                                <div className="field__holder">
                                    <label htmlFor="title">نام کاربری</label>
                                    <input
                                        type='text'
                                        name='username'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.username}
                                    />
                                    <span>  {errors.username && touched.username && errors.username}  </span>
                                </div>

                                <div className="field__holder">
                                    <label htmlFor="link">کلمه عبور</label>
                                    <input
                                        type='password'
                                        name='password'
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.password}
                                    />
                                    <span>    {errors.password && touched.password && errors.password}  </span>
                                </div>
                                <div className="btn_holder">
                                    <input type='submit' disabled={isSubmitting} value="ورود" />
                                </div>
                            </form>
                        )
                }
            </Formik>
        </div>
    )
}


export default connect()(Login);