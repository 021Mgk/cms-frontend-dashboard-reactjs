import React, { useState } from 'react';
import PropTypes from 'prop-types'

const TabManager = ({ activeTab, handleTab, tabs }) => {
    return (
        <div className="tab-manager">
            {tabs.map(({ label, value }, index) => (
                <div
                    key={index}
                    className={`tab ${value === activeTab ? 'selected-tab' : ''}`}
                    onClick={() => { handleTab(value); }}
                >
                    {label}
                </div>
            ))}
        </div>
    );
}

TabManager.propTypes = {
    activeTab: PropTypes.number.isRequired,
    handleTab: PropTypes.func.isRequired,
    tabs: PropTypes.arrayOf(Object).isRequired,
};

export default TabManager;