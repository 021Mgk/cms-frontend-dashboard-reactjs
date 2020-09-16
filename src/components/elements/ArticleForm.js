import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker2';
import momentJalaali from 'moment-jalaali';





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

    const [formValues , setFormValues] = useState(editData || INITIALVALUE)

    const [todayJalali, setTodayJalali] = useState(momentJalaali());
    const [todayMilady, setTodayMilady] = useState();


    const persionToEnglish = (date) => {
        const formated = date.format('YYYY-M-D');
        setTodayMilady(formated);
        setFormValues({...formValues , register_date : todayMilady})
    };

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
                if (actionType === "POST") {
                    console.log("avale post ", JSON.stringify(values, null, 2));
                    await fetch('http://localhost:8080/api/v1/articles', {
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
                    await fetch(`http://localhost:8080/api/v1/articles/${editData?.id}`, {
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

                        <pre>
                            {JSON.stringify(values, null, 4)}
                        </pre>

                        <div className="field__holder">
                            <label htmlFor="title">   تاریخ ثبت </label>
                            <DatePicker
                                value={todayJalali}
                                persianDigits={true}
                                isGregorian={false}
                                timePicker={false}
                                onChange={(value) => {
                                    persionToEnglish(value);
                                  //  values.register_date = todayMilady
                                }}
                            />
                            <input
                                type='text'
                                placeholder='dd-mm-yyyy'
                                name='register_date'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={actionType == "PUT" ? (values.register_date ? values.register_date : null) : todayMilady}
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
                            <label htmlFor="text">   متن </label>
                            <input
                                type='text'
                                name='text'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.text}
                            />
                            <span>   ... </span>
                        </div>

                        <div className="field__holder">
                            <label htmlFor="thumbnail">  تصویر کوچک </label>
                            <input
                                type='file'
                                name='thumbnail'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.thumbnail || ''}
                            />
                            <span>   ... </span>
                        </div>

                        <div className="field__holder">
                            <label htmlFor="cover">  تصویر بزرگ </label>
                            <input
                                type='file'
                                name='cover'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.cover || ''}
                            />
                            <span>   ... </span>
                        </div>


                        <div className="field__holder">
                            <label htmlFor="attachment">  پیوست </label>
                            <input
                                type='file'
                                name='attachment'
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.attachment || ''}
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


                        <br />

                        {/* {errors.email && touched.email && errors.email}
                              <input
                                  type="password"
                                  name="password"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.password}
                              />
                              {errors.password && touched.password && errors.password} // */}

                        <input type='submit' disabled={isSubmitting} value={actionType === "POST" ? "ثبت جدید" : "به روز رسانی"} />
                    </form>
                )}
        </Formik>
    );
};
