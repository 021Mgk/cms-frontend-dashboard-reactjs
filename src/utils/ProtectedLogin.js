import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedLogin = ({
    component: Component,
    layout: Layout,
    isAuth,
    ...rest
}) => {

    Layout = (Layout === undefined) ? props => (<>{props.children}</>) : Layout;

    console.log("login protected  ", isAuth)

    return (<Route
        {...rest}
        render={props => {

            if (!isAuth) {
                return (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                )
            } else {
                return <Redirect to="/" />
            }
        }
        } />
    )
}

export default ProtectedLogin;