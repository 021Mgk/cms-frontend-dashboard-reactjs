import React, { useState } from 'react';
import { Formik, ErrorMessage } from 'formik';
import * as yup from 'yup';


const INITIALVALUE = {
    id: '',
    active: true,
    title: '',
    link: '',
    place: null,
    order: 0,
    icon: ''
};

const LinksForm = ({ editData, actionType, setActionType, getData }) => {

    const [iconPreview, setIconPreview] = useState();
    const [message, setMessage] = useState({});

    const LinksFormValidation = yup.object().shape({
        title: yup.string().required('لطفا عنوان را وارد نمایید'),
        link: yup.string().required('لطفا آدرس لینک را وارد نمایید'),
        place: yup.number().required('لطفا محل قرارگیری را انتخاب نمایید'),
    });
    return (
        <>
            {Object.keys(message).length !== 0 ? <div className={`alert ${message.type === 1 ? 'alert-success' : 'alert-danger'}`}> {message.msg} </div> : null}
            <Formik
                initialValues={editData || INITIALVALUE}
                validationSchema={LinksFormValidation}
                onSubmit={async (values, { setSubmitting }) => {

                    let formData = new FormData();
                    formData.append("file", values.icon);
                    formData.append("title", values.title);
                    formData.append("link", values.link);
                    formData.append("place", values.place);
                    formData.append("ord", values.ord);
                    formData.append("active", values.active);

                    if (actionType === "POST") {
                        const resp = await fetch('http://localhost:8080/api/v1/links', {
                            method: 'POST',
                            credentials: 'include',
                            headers: {
                                'Accept': 'application/json',
                            },
                            body: formData
                        });
                        if (resp.ok) {
                            setMessage({ msg: "ثبت با موفقیت انجام شد", type: 1 })
                            setActionType("PUT");
                            getData();
                        } else {
                            if (resp.status === 403) {
                                setInterval(() => window.location.reload(), 3000);
                            }
                            setMessage({ msg: "لطفا مجدد تلاش کنید مشکلی در ثبت فرم وجود دارد.", type: 2 })
                            console.log(resp)
                        }

                    }
                    if (actionType === "PUT") {
                        const resp = await fetch(`http://localhost:8080/api/v1/links/${editData?.id}`, {
                            method: 'PUT',
                            credentials: 'include',
                            headers: {
                                'Accept': 'application/json',
                            },
                            body: formData
                        });
                        if (resp.ok) {
                            getData();
                            setMessage({ msg: "به روز رسانی با موفقیت انجام شد", type: 1 })
                        } else {
                            setMessage({ msg: "لطفا مجدد تلاش کنید مشکلی در بروزرسانی فرم وجود دارد.", type: 2 })
                        }

                    }
                    setSubmitting(false);
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue
                }) => (
                        <form className='form__style' encType="multipart/form-data" onSubmit={handleSubmit} autoComplete='off'>

                            <div className="field__holder">
                                <label htmlFor="title">عنوان</label>
                                <input
                                    type='text'
                                    name='title'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.title}
                                />
                                <span>  {errors.title && touched.title && errors.title}  </span>
                            </div>

                            <div className="field__holder">
                                <label htmlFor="link">لینک</label>
                                <input
                                    type='text'
                                    name='link'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.link}
                                />
                                <span>    <ErrorMessage name='link' component='div' />  </span>
                            </div>

                            <div className="field__holder without__alarm">
                                <label htmlFor="icon">آیکون</label>
                                <input
                                    type='file'
                                    name='icon'
                                    onChange={(event) => {
                                        setIconPreview(window.URL.createObjectURL(event.target.files[0]))
                                        setFieldValue("icon", event.target.files[0])
                                    }}
                                    onBlur={handleBlur}
                                />
                                {
                                    (iconPreview || values.icon) && <img alt="image perview" src={iconPreview ? iconPreview : values.icon} style={{ width: "50px", height: "50px", float: "left" }} />
                                }

                            </div>

                            <div className="field__holder">
                                <label htmlFor="place">محل قرارگیری</label>
                                <select name="place"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.place}>
                                    <option value="0">انتخاب نمایید</option>
                                    <option value="1"> هدر</option>
                                    <option value="2"> فوتر</option>
                                    <option value="3"> لینک های کناری</option>
                                </select>
                                <span>   ... </span>
                            </div>

                            <div className="field__holder">
                                <label htmlFor="ord">اولویت نمایش </label>
                                <input
                                    type='number'
                                    name='ord'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.ord}
                                />
                                <span>   ... </span>
                            </div>

                            <div className="field__holder">
                                <label htmlFor="active">فعال  </label>
                                <input
                                    type='checkbox'
                                    name='active'
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    defaultChecked={values.active}
                                />
                                <span>   ... </span>
                            </div>
                            <div className="btn_holder">
                                <input type='submit' disabled={isSubmitting} value={actionType === "POST" ? "ثبت جدید" : "به روز رسانی"} />
                            </div>
                        </form>
                    )}
            </Formik>
        </>
    );
};


export default LinksForm;