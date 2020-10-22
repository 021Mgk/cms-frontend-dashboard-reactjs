import React, { useState, useEffect, useRef } from 'react'
import { Formik } from 'formik';
import * as yup from 'yup';


export default function FileManager() {
    const refs = useRef()

    const [message, setMessage] = useState();
    const [files, setFiles] = useState([]);
    const [count, setCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(8);
    const [pageNumber, setPageNumber] = useState(0);
    const [filterTXT, setFilterTXT] = useState('');


    useEffect(() => {
        if (filterTXT !== null) {
            getData(currentPage, pageSize, filterTXT);
        } else {
            getData(currentPage, pageSize);
        }

    }, [count, currentPage, pageSize])
    //add filterTxt to live filter




    const getData = async (currentPage, pageSize, fileName) => {
        let fetchURL = ''
        if (fileName) {
            fetchURL = `http://localhost:8080/api/v1/files/${currentPage}/${pageSize}/${fileName}`;
        }
        else {
            fetchURL = `http://localhost:8080/api/v1/files/${currentPage}/${pageSize}`;
        }
        const resp = await fetch(fetchURL, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
            },
        });
        const data = await resp.json();
        setFiles(data.data);
        setCount(data.count);
        console.log("DATA.count ", data.count)
        console.log("count ", count);
        console.log("pageSize ", pageSize);
        const pageCount = count / pageSize;
        console.log("pageCount ", pageCount);
        if (count % pageSize !== 0) {
            setPageNumber(Math.ceil(pageCount))
        }
        else {
            setPageNumber(pageCount)
        }

    }


    const handleCopy = (txt) => {
        const el = document.createElement('textarea');
        el.value = txt;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }

    const FileManagerValidation = yup.object().shape({
        files: yup.mixed().required("لطفا فایل  را وارد نمایید")
    });

    const scrollToRef = (ref) => {
        window.scrollTo(0, ref.current.offsetTop)
    }

    const handleSearch = (txt) => {
        setFilterTXT(txt);
    }
    const handleGetFilterData = () => {
        getData(currentPage, pageSize, filterTXT);
    }
    return (
        <>
            <h5> {message && message} </h5>

            <Formik
                initialValues={{ files: null }}
                validationSchema={FileManagerValidation}
                onSubmit={async (values, { setSubmitting, resetForm }) => {


                    let formData = new FormData();
                    for (const key of Object.keys(values.files)) {
                        formData.append('files', values.files[key])
                    }

                    const resp = await fetch('http://localhost:8080/api/v1/files', {
                        method: 'POST',
                        credentials: 'include',
                        headers: {
                            'Accept': 'application/json',
                        },
                        body: formData
                    });
                    if (resp.ok) {
                        setMessage("  ثبت با موفقیت انجام شد")
                        resetForm({ files: '' })
                        getData();
                    } else {
                        setMessage("لطفا مجدد تلاش کنید مشکلی در ثبت فرم وجود دارد.")
                    }

                    setSubmitting(false);
                }}
            >
                {({
                    errors,
                    touched,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    setFieldValue
                }) => (
                        <form className='form__style' onSubmit={handleSubmit} autoComplete='off' encType="multipart/form-data">
                            <div className="field__holder">
                                <label htmlFor="cover">  فایل  </label>
                                <input
                                    multiple
                                    type='file'
                                    name='files'
                                    onBlur={handleBlur}
                                    onChange={e => {
                                        setFieldValue("files", e.target.files)
                                    }}
                                />
                                <span>  {errors.files && touched.files && errors.files}</span>
                            </div>
                            <div className="btn_holder">
                                <input type='submit' disabled={isSubmitting} value="ارسال" />
                            </div>
                        </form>
                    )}
            </Formik>

            <div className="search__file">
                <p>جستجو: </p>
                <input onChange={(e) => handleSearch(e.target.value)} value={filterTXT} />
                <button onClick={handleGetFilterData}> send  </button>
                <button onClick={() => {setCurrentPage(1); setFilterTXT(''); getData(currentPage, pageSize); }}> reset </button>
            </div>
            <div className="file__manager" ref={refs}>
                {
                    files.map(f => (
                        <>
                            <div className="file__viewe">
                                <div className="file__view-img">
                                    <img src={f.fileURL} alt={f.name} />
                                </div>
                                <p key={f.id} >{f.name}</p>
                                <div className="options">
                                    <i onClick={() => handleCopy(f.fileURL)}> COPY </i>
                                </div>
                            </div>
                        </>
                    )
                    )
                }
            </div>


            <div className="paging">
                <div className="paging__pages">
                    {
                        [...Array(pageNumber)].map((_, i) => (
                            <> <i onClick={() => { scrollToRef(refs); setCurrentPage(i + 1); }}>{i + 1}</i> </>
                        ))
                    }
                </div>

                <div className="paging__count">
                    <select onChange={(e) => { scrollToRef(refs); setCurrentPage(1); setPageSize(e.target.value); }}>
                        <option value="8">8 آیتم</option>
                        <option value="12">12 آیتم</option>
                        <option value="16">16 آیتم</option>
                        <option value="20">20 آیتم</option>
                    </select>
                </div>
            </div>


        </>
    )
}
