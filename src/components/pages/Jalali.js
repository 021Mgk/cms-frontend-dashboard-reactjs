
import React, { useState } from 'react';
import DatePicker from 'react-datepicker2';
import momentJalaali from 'moment-jalaali';


export default function Jalali() {

    const [miladi, setMiladi] = useState();
    const [shamsi, setShamsi] = useState();




    //momentjalaali() give current date 
    const [todayJalali, setTodayJalali] = useState(momentJalaali());
    console.log("mmmmmmm", momentJalaali())
    let m = momentJalaali('1398/06/30', 'jYYYY/jM/jD')
    m = m.format('jYYYY/jM/jD', 'YYYY/m/D');
    console.log("miladi jadiddi", momentJalaali('1398/06/30'))
    //console.log("roze shamsi az db" , momentJalaali("2"))
    const [todayMilady, setTodayMilady] = useState();

    const persionToEnglish = (date) => {
        const formated = date.format('YYYY/M/D');
        setTodayMilady(formated)
    };

    const convertDate = (date, type) => {
        if (type === 's') {
            setShamsi()
        }
        if (type === 'm') {
            setMiladi(date.format('YYYY/M/D'))
            // momentJalaali('1398/06/30')
        }
    }

    return (
        <div>

            <form className='form__style'>


                <div className="field__holder">
                    <label htmlFor="title">   تاریخ ثبت </label>
                    <DatePicker
                        value={todayJalali}
                        persianDigits={true}
                        isGregorian={false}
                        timePicker={false}
                        onChange={(value) => {
                            convertDate(value, 's')
                            convertDate(value, 'm')
                            persionToEnglish(value);
                        }}
                    />

                    <br></br>
                    <h1>miladi</h1>
                    <input
                        type='text'
                        placeholder='dd-mm-yyyy'
                        name='miladi'
                        value={miladi}
                    />


                    <br></br>
                    <h1>shamsi</h1>
                    <input
                        type='text'
                        placeholder='dd-mm-yyyy'
                        name='shamsi'
                        value={momentJalaali(miladi)}
                    />
                    <span> .... </span>
                </div>
            </form>

            <DatePicker
                value={momentJalaali(miladi)}
                persianDigits={true}
                isGregorian={false}
                timePicker={false}
            />
        </div>
    )
}
