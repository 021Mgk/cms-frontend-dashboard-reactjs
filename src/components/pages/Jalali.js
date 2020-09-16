
import React, { useState } from 'react';
import DatePicker from 'react-datepicker2';
import momentJalaali from 'moment-jalaali';


export default function Jalali() {
    //momentjalaali() give current date 
    const [todayJalali, setTodayJalali] = useState(momentJalaali());
    const [todayMilady, setTodayMilady] = useState();

    const persionToEnglish = (date) => {
        const formated = date.format('YYYY-M-D');
        setTodayMilady(formated)
    };

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
                            persionToEnglish(value);
                        }}
                    />
                    <input
                        type='text'
                        placeholder='dd-mm-yyyy'
                        name='register_date'
                        value={todayMilady}
                    // style={{display:none}}
                    />
                    <span> .... </span>
                </div>
            </form>
        </div>
    )
}
