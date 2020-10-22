import React, { useState, useEffect } from 'react';
import ModalView from '../elements/ModalView';
import LinksForm from '../elements/LinksForm';

const INITIALVALUE = {
  id: '',
  active: true,
  title: '',
  link: '',
  place: 0,
  ord: 0,
  icon: '',
};

export default function Article() {
  const [data, setData] = useState();

  const [modal, setModal] = useState(false);

  const [actionType, setActionType] = useState();

  const [editLinks, setEditLinks] = useState(INITIALVALUE);

  useEffect(() => {
    getDATA();
  }, []);

  const getDATA = async () => {
    console.log('GET DATA INVOKE');
    const res = await fetch('http://localhost:8080/api/v1/userLinks', {
      method: 'GET',
      credentials: 'include',
    });
    const links = await res.json();
    setData(links);
  };

  const editHandler = async (id) => {
    // const link = data.find((d) => d.id === id);
    const res = await fetch(`http://localhost:8080/api/v1/links/${id}`, {
      method: 'GET',
      credentials: 'include',
    });
    const link = await res.json();
    setActionType('PUT');
    setEditLinks(link);
    setModal(true);
  };

  const addHandler = () => {
    setActionType('POST');
    setEditLinks(INITIALVALUE);
    setModal(true);
  };

  return (
    <>
      <div className='area'>
        <button className='btn btn-add' onClick={() => addHandler()}>
          {' '}
          ثبت جدید{' '}
        </button>
        <table>
          <thead>
            <tr className='table-head'>
              <th className='column1'>ردیف</th>
              <th className='column2'>عنوان</th>
              <th className='column3'>لینک</th>
              <th className='column4'>محل قرارگیری</th>
              <th className='column5'> الویت نمایش</th>
              <th className='column6'>فعال</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((d, index) => (
              <tr key={d.id} onClick={() => editHandler(d.id)}>
                <td className='column1'>{index + 1}</td>
                <td className='column2'>{d.title}</td>
                <td className='column3'>{d.link}</td>
                <td className='column4'> {d.place}</td>
                <td className='column5'> {d.ord}</td>
                <td className='column6'>{d.active ? ' فعال' : ' غیرفعال '}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {modal ? (
        <ModalView title='پیوندها' setModal={setModal}>
          <LinksForm
            editData={editLinks}
            actionType={actionType}
            setActionType={setActionType}
            getData={() => getDATA()}
          />
        </ModalView>
      ) : null}
    </>
  );
}
