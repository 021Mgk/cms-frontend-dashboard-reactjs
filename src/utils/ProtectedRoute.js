import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({
    component: Component,
    layout: Layout,
    isAuth,
    ...rest
}) => {

    Layout = (Layout === undefined) ? props => (<>{props.children}</>) : Layout;



    return (<Route
        {...rest}
        render={props => {

            if (isAuth) {
                return (
                    <Layout>
                        <Component {...props} />
                    </Layout>
                )
            } else {
                return <Redirect to="/login" />
            }
        }
        } />
    )
}

export default ProtectedRoute;