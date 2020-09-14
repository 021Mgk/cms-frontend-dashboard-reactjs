import React, { useState } from 'react';
import { Formik, ErrorMessage } from 'formik';
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

export const ArticleForm = ({ article, actionType, setActionType , getData }) => {



    const [onChangeValue, setOnChangeValue] = useState(
        momentJalaali('1399/6/20', 'jYYYY/jM/jD')
    );

    const persionToEnglish = () => {
        const formated = onChangeValue.format('YYYY/M/D');
        console.log(formated, ' formated');
        const mom = momentJalaali('1360/5/26', 'jYYYY/jM/jD');
        console.log('mom', mom);
    };

    const ArticleFormValidation = yup.object().shape({
        title: yup.string().required('لطفا عنوان را وارد نمایید'),
        type: yup.number().required('لطفا نوع را انتخاب نمایید'),
    });
    return (
        <Formik
            initialValues={article || INITIALVALUE}
            validationSchema={ArticleFormValidation}
            onSubmit={async (values, { setSubmitting }) => {
                if (actionType === "POST") {
                    console.log( "avale post " ,  JSON.stringify(values, null, 2));
                    await fetch('http://localhost:8080/api/v1/articles', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(values)
                    });
                    console.log( "asdasdasdasdasdasdasd");
                    // const article = await res.json();
                    // console.log(article);
                    console.log(actionType ,  "before set PUT");
                    setActionType("PUT");
                    console.log(actionType ,  "after set PUT");
                    console.log(actionType ,  "before  getDate in articelform");
                    getData();
                    console.log(actionType ,  "after  getDate in articelform");
                }
                if (actionType === "PUT") {
                    console.log(JSON.stringify(values, null, 2));
                     await fetch(`http://localhost:8080/api/v1/articles/${article?.id}`, {
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
                    <form className='form' onSubmit={handleSubmit} autoComplete='off'>
                        {/* // <input
                                  type="date"
                                  placeholder="dd-mm-yyyy"
                                  min="1997-01-01"
                                  name="register_date"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.register_date}
                              /> //
               //
                              <DatePicker
                                  timePicker={false}
                                  value={date}
                                  onChange={() => setDate(date)}                               
                              /> // */}

                        <DatePicker
                            value={onChangeValue}
                            persianDigits={true}
                            isGregorian={false}
                            timePicker={false}
                            onChange={(onChangeValue) => {
                                setOnChangeValue(onChangeValue);
                                persionToEnglish();
                            }}
                        />

                        <input
                            type='text'
                            placeholder='dd-mm-yyyy'
                            name='register_date'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.register_date || ''}
                        />

                        <br />

                        {/* <input
                            type='text'
                            name='id'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.id}
                        /> */}

                        <input
                            type='text'
                            name='title'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.title}
                        />

                        {errors.title && touched.title && errors.title}
                        <ErrorMessage name='title' component='div' />
                        <br />
                        <input
                            type='text'
                            name='summary'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.summary}
                        />
                        <br />
                        <input
                            type='text'
                            name='text'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.text}
                        />
                        <br />

                        <input
                            type='file'
                            name='thumbnail'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.thumbnail || ''}
                        />
                        <br />
                        <input
                            type='file'
                            name='cover'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.cover || ''}
                        />
                        <br />
                        <input
                            type='file'
                            name='attachment'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.attachment || ''}
                        />

                        <br />
                        <input
                            type='number'
                            name='status'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.status}
                        />

                        <br />

                        <input
                            type='number'
                            name='type'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.type}
                        />

                        {errors.type && touched.type && errors.type}
                        <ErrorMessage name='type' component='div' />
                        <br />
                        <input
                            type='number'
                            name='views'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.views}
                        />

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

                        <button type='submit' disabled={isSubmitting}>
                            {actionType === "POST" ? "ثبت جدید" : "به روز رسانی"}
                        </button>
                    </form>
                )}
        </Formik>
    );
};
