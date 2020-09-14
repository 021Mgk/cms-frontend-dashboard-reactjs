import React, { useState, useEffect } from 'react';
import ModalView from '../elements/ModalView'



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




export default function Article() {
  const [data, setData] = useState();

  const [modal, setModal] = useState(false);

  const [actionType, setActionType] = useState();

  const [editArticle, setEditArticle] = useState(INITIALVALUE);


  useEffect(() => {
    getDATA();
  }, [])

  const getDATA = async () => {
    console.log("GET DATA INVOKE")
    const res = await fetch('http://localhost:8080/api/v1/articles', {
      method: 'GET',
    });
    const articles = await res.json();
    setData(articles)
  }



  const editHandler = (id) => {
    const arti = data.find((d) => d.id === id);
    setActionType("PUT");
    setEditArticle(arti);
    setModal(true);
  };

  const addHandler = () => {
    setActionType("POST");
    setEditArticle(INITIALVALUE);
    setModal(true);
  }

  return (
    <>
      <div className='area'>
        <button onClick={() => addHandler()}>add new one</button>
        <table>
          <thead>
            <tr className='table-head'>
              <th className='column1'>ردیف</th>
              <th className='column2'>عنوان</th>
              <th className='column3'>نوع</th>
              <th className='column4'>تعداد بازدید</th>
              <th className='column5'>تاریخ ثبت</th>
              <th className='column6'>وضعیت</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((d, index) => (
              <tr key={d.id} onClick={() => editHandler(d.id)}>
                <td className='column1'>{index + 1}</td>
                <td className='column2'>{d.title}</td>
                <td className='column3'>{d.type}</td>
                <td className='column4'> {d.views}</td>
                <td className='column5'> {d.register_date}</td>
                <td className='column6'>{d.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal ? (
        <ModalView article={editArticle} actionType={actionType} setActionType={setActionType} getData={()=>getDATA()} setModal={setModal} />
      ) : null}
    </>
  );
}
