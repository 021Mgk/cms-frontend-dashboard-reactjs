import React from 'react'
import { connect } from 'react-redux';

const UserDetail = ({ user }) => {
    if (user !== undefined) {
        const { name, family, username, id } = user;
        return (
            <div className="user__detail">
                <p>id : {id}</p>
                <p>name : {name}</p>
                <p>family: {family}</p>
                <p>username : {username}</p>
            </div>
        )
    } else {
        return <div></div>
    }
}


const mapStateToProps = state => ({
    user: state.getUserInfo.user
})


export default connect(mapStateToProps)(UserDetail);