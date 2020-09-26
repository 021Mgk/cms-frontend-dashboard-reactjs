import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker2';
import momentJalaali from 'moment-jalaali';
import JoditEditor from "jodit-react";

const INITIALVALUE = {
    id: '',
    status: '',
    attachment: '',
    cover: '',
    register_date: '',
    summary: '',
    text: '',
    thumbnail: '',
    title: '',
    views: '',
    type: '',
};

export const ArticleForm = ({ editData, actionType, setActionType, getData }) => {

    const [formValues, setFormValues] = useState(editData || INITIALVALUE)
    const [miladi, setMiladi] = useState();
    const [todayJalali, setTodayJalali] = useState(momentJalaali())


    const convertDate = (date) => {
        setMiladi(date.format('YYYY/M/D'))
    }



    const ArticleFormValidation = yup.object().shape({
        title: yup.string().required('لطفا عنوان را وارد نمایید'),
        type: yup.number().required('لطفا نوع را انتخاب نمایید'),
    });

    return (
        <Formik
            //initialValues={editData || INITIALVALUE}
            initialValues={formValues}
            validationSchema={ArticleFormValidation}
            onSubmit={async (values, { setSubmitting }) => {

                let formData = new FormData();
                formData.append("status", +values.status);
                console.log("asdasd", typeof (values.status));
                formData.append("att", values.attachment);
                formData.append("cov", values.cover);
                formData.append("register_date", miladi);
                formData.append("thu", values.thumbnail);
                formData.append("summary", values.summary);
                formData.append("text", values.text);
                formData.append("title", values.title);
                formData.append("views", +values.views);
                formData.append("type", +values.type);

                if (actionType === "POST") {

                    await fetch('http://localhost:8080/api/v1/articles', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                        },
                        body: formData
                    });
                    setActionType("PUT");
                    getData();
                }
                if (actionType === "PUT") {
                    await fetch(`http://localhost:8080/api/v1/articles/${editData.id}`, {
                        method: 'PUT',
                        headers: {
                            'Accept': 'application/json',
                        },
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
                    <form className='form__style' onSubmit={handleSubmit} autoComplete='off' encType="multipart/form-data">

                        <div className="field__holder">
                            <label htmlFor="title">   تاریخ ثبت </label>
                            <DatePicker
                                value={values.register_date ? momentJalaali(values.register_date) : todayJalali}
                                persianDigits={true}
                                isGregorian={false}
                                timePicker={false}
                                onChange={(value) => {
                                    convertDate(value)
                                }}
                            />
                            <input
                                type='text'
                                name='register_date'
                                onBlur={handleBlur}
                                value={miladi}
                            // style={{display:none}}
                            />
                            <span> .... </span>
                        </div>

                        <div className="field__holder">
                            <label htmlFor="title">   عنوان </label>
                            <input
                                type='text'
                                name='title'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.title}
                            />
                            <span>   {errors.title && touched.title && errors.title} </span>
                        </div>



                        {/* <div className="field__holder">
                            <label htmlFor="text">   متن </label>
                            <input
                                type='text'
                                name='text'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.text}
                            />
                            <span>   ... </span>
                        </div> */}

                        <div className="editor__older" >
                            <label htmlFor="text">   متن </label>
                            <JoditEditor
                                onChange={handleChange}
                                value={values.text}
                                config={
                                    {
                                        direction: "rtl",
                                        defaultMode: 1,
                                        toolbarSticky: false,
                                        minHeight: 450
                                    }
                                }
                            />
                        </div>

                        <div className="field__holder">
                            <label htmlFor="summary">   خلاصه </label>
                            <input
                                type='text'
                                name='summary'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.summary}
                            />
                            <span>   ... </span>
                        </div>

                        <div className="field__holder">
                            <label htmlFor="thumbnail">  تصویر کوچک </label>
                            <input
                                type='file'
                                name='thumbnail'
                                onChange={e => {
                                    setFieldValue("thumbnail", e.target.files[0])
                                }}
                                onBlur={handleBlur}
                            />
                            <span>   ... </span>
                        </div>

                        <div className="field__holder">
                            <label htmlFor="cover">  تصویر بزرگ </label>
                            <input
                                type='file'
                                name='cover'
                                onBlur={handleBlur}
                                onChange={e => {
                                    setFieldValue("cover", e.target.files[0])
                                }}
                            />
                            <span>   <img src={values.cover} />  </span>
                        </div>

                        <div className="field__holder">
                            <label htmlFor="attachment">  پیوست </label>
                            <input
                                type='file'
                                name='attachment'
                                onChange={e => {
                                    setFieldValue("attachment", e.target.files[0])
                                }}
                                onBlur={handleBlur}
                            />
                            <span>   ... </span>
                        </div>

                        <div className="field__holder">
                            <label htmlFor="status">  وضعیت </label>
                            <select
                                name='status'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.status}>
                                <option value="0"> انتخاب کنید </option>
                                <option value="1"> ثبت اولیه  </option>
                                <option value="2">  انتشار </option>
                                <option value="3">  حذف </option>
                            </select>
                            <span>   ... </span>
                        </div>

                        <div className="field__holder">
                            <label htmlFor="type">  نوع </label>
                            <select
                                name='type'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.type}>
                                <option value="0"> انتخاب کنید </option>
                                <option value="1">  مقاله  </option>
                                <option value="2"> خدمات  </option>
                            </select>
                            <span>    {errors.type && touched.type && errors.type} </span>
                        </div>

                        <div className="field__holder">
                            <label htmlFor="views"> تعداد نمایش </label>
                            <input
                                type='number'
                                name='views'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.views}
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
