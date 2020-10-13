import React, { useState, useEffect } from "react";
import FrontComponent from '../components/FrontComponent';
import Newsfeed from "./Newsfeed";
import { useAuth0 } from "@auth0/auth0-react";
import SignupSteps from "./SignupSteps";
import axios from 'axios';

export default function Front() {

    const [userState, setUserState] = useState({ 
        new_user: false 
    });

    const { user, isAuthenticated, isLoading } = useAuth0();
    
    useEffect(() => {
        if (isAuthenticated && !isLoading) {
            axios.get('/api/user/' + user.email)
                .then(res => {
                    if (res.data == null) {
                        setUserState({
                            new_user: true
                        })
                    } else {
                        setUserState({
                            new_user: false
                        })
                    }
                }).catch(err => {
                    console.log(err);
                })
        }
    }, [isAuthenticated, isLoading]);


    return (
        <>
            {isLoading ? <div>Loading ...</div>: null}
            {(isAuthenticated && userState.new_user) ? <SignupSteps /> 
            : (isAuthenticated && !userState.new_user) ? <Newsfeed /> 
            : <FrontComponent /> }
        </>
        
    );
}