import React from 'react';
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
                if (actionType === "POST") {
                    console.log("avale post ", JSON.stringify(values, null, 2));
                    await fetch('http://localhost:8080/api/v1/links', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values)
                    });
                    setActionType("PUT");
                    getData();
                }
                if (actionType === "PUT") {
                    console.log(JSON.stringify(values, null, 2));
                    await fetch(`http://localhost:8080/api/v1/links/${editData?.id}`, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values)
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
                isSubmitting
            }) => (
                    <form className='form__style' onSubmit={handleSubmit} autoComplete='off'>

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

                        <div className="field__holder">
                            <label htmlFor="icon">آیکون</label>
                            <input
                                type='file'
                                name='icon'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.icon || ''}
                            />
                            <span>   ... </span>
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
                            <label htmlFor="order">اولویت نمایش </label>
                            <input
                                type='number'
                                name='order'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.order}
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

                        <input type='submit' disabled={isSubmitting} value={actionType === "POST" ? "ثبت جدید" : "به روز رسانی"} />
                    </form>
                )}
        </Formik>
    );
};


export default LinksForm;