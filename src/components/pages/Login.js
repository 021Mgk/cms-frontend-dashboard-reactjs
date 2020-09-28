import React from 'react'
import { Formik} from 'formik';
import * as yup from 'yup';
import Cookies from 'js-cookie';



const INITIALVALUE = {
    username: '',
    password: ''
};
export default function Login() {
    const LoginFormValidation = yup.object().shape({
        username: yup.string().min(3, "کلمه کاربری حداقل 5 حرف می باشد.").required('لطفا نام کاربری صحیح وارد نمایید'),
        password: yup.string().min(6, " کلمه عبور حداقل 6 حرف می باشد").required('لطفا کلمه عبور صحیح وارد نمایید')
    });
    return (
        <div>

            <Formik
                initialValues={INITIALVALUE}
                validationSchema={LoginFormValidation}
                onSubmit={async (values, { setSubmitting }) => {
                const res =  await fetch('http://localhost:8080/auth/login', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type' : 'application/json'
                        },
                        credentials: 'include',
                        body: JSON.stringify(values)
                    });
                    const response = await res.json();
                    Cookies.set("user" , true);
                    console.log(response.token, response.success)
                    console.log("token" , Cookies.get("token"));
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
