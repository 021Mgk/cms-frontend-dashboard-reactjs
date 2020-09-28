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

    const LinksFormValidation = yup.object().shape({
        title: yup.string().required('لطفا عنوان را وارد نمایید'),
        link: yup.string().required('لطفا آدرس لینک را وارد نمایید'),
        place: yup.number().required('لطفا محل قرارگیری را انتخاب نمایید'),
    });
    return (
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
                    await fetch('http://localhost:8080/api/v1/links', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                        },
                        credentials: 'include',
                        body: formData
                    });
                    setActionType("PUT");
                    getData();
                }
                if (actionType === "PUT") {
                    await fetch(`http://localhost:8080/api/v1/links/${editData?.id}`, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                        },
                        credentials: 'include',
                        body: formData
                    });
                    getData();
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
                                (iconPreview || values.icon) && <img src={iconPreview ? iconPreview : values.icon} style={{ width: "50px", height: "50px", float: "left" }} />
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
    );
};


export default LinksForm;