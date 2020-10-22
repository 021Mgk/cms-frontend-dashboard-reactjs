import React, { useState } from "react";
import TabManager from '../multistepforms/TabManager'
import "./style.css";


const INITIALVALUE = {
    name: '',
    family: '',
    email: ''
}

const TABS = [
    { label: "Tab 1", value: 1 },
    { label: "Tab 2", value: 2 },
    { label: "Tab 3", value: 3 }
];

export default function Forms() {
    const [activeTab, handleTab] = useState(1);
    const [formValues, setFormValues] = useState(INITIALVALUE)

    const handleChange = (e) => {
        setFormValues({ ...formValues, [e.target.name]: e.target.value })
    }

    return (
        <div className="App">
            {
                activeTab !== 4 ?
                    (<>
                        <TabManager tabs={TABS} activeTab={activeTab} handleTab={handleTab} />
                        <div className="tab-content">
                            <div className={activeTab === 1 ? "yes1" : "no1"}>
                                <label>name</label>
                                <input name="name" value={formValues.name} onChange={e => handleChange(e)} />

                                <button onClick={() => handleTab(2)} disabled={!formValues.name}>next</button>
                            </div>
                            <div className={activeTab === 2 ? "yes1" : "no1"}>
                                <label>family</label>
                                <input name="family" value={formValues.family} onChange={e => handleChange(e)} />
                                <button onClick={() => handleTab(3)} disabled={!formValues.family}>next</button>
                                <button onClick={() => handleTab(1)}>prev</button>
                            </div>
                            <div className={activeTab === 3 ? "yes1" : "no1"}>
                                <label>email</label>
                                <input name="email" value={formValues.email} onChange={e => handleChange(e)} />
                                <button onClick={() => handleTab(2)}>prev</button>
                            </div>
                            <button onClick={() => { alert(JSON.stringify(formValues, null, 4)); handleTab(4) }}>send</button>
                        </div>
                    </>)

                    :
                    <div className={activeTab === 4 ? "yes1" : "no1"} >
                        <button onClick={() => handleTab(1)}>new</button>
                        <h1>Ops!!</h1>
                    </div>
            }
        </div>
    )
}

