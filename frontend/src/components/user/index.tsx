import axios from "axios";
import React, { useContext } from "react";
import { useToasts } from "react-toast-notifications";
import environment from "../../config";
import { UserContext } from "../../contexts/user-reducer";

export const User = () => {
    // const { addToast } = useToasts();

    // const { user_id } = useContext(UserContext);
    // axios({
    //     url: environment.api + 'histories',
    //     method: 'GET',
    //     headers: {
    //         'Content-type': 'application/json'
    //     },
    //     data: {
    //         user_id: user_id,
    //     }
    // }).then((res) => {
    //     console.log(res);
    // }).catch((err) => {
    //     console.log(err)
    //     addToast("Error!", {
    //         appearance: 'error',
    //         autoDismiss: true,
    //     });
    // })

    return (
        <div>
            User
        </div>
    )
}