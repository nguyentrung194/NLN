import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import environment from "../../config";
import { UserContext } from "../../contexts/user-reducer";

export const Admin = () => {
    const { addToast } = useToasts();
    const { classes, setClasses } = useContext(UserContext);
    const { class_id } = useParams();
    const [users, setUsers] = useState([] as any)
    axios({
        url: environment.api + 'class',
        method: 'GET',
        headers: {
            'Content-type': 'application/json'
        },
    }).then((res) => {
        console.log(classes);
        if (classes?.length === 0 && classes?.length !== res.data.length) {
            setClasses({ classes: [...res.data] })
        }
    }).catch((err) => {
        console.log(err)
        addToast("Error!", {
            appearance: 'error',
            autoDismiss: true,
        });
    })

    useEffect(() => {
        if (class_id) {
            axios({
                url: environment.api + 'users',
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
                params: {
                    class_id: class_id,
                }
            }).then((res) => {
                console.log(users);
                setUsers([...res.data])
            }).catch((err) => {
                console.log(err)
                addToast("Error!", {
                    appearance: 'error',
                    autoDismiss: true,
                });
            })
        }
    }, [class_id])

    return (
        <div className="flex justify-center items-center">
            <div className="max-w-3xl">
                <div className="p-2 text-center">
                    <Link to="/admin/create">Create new class</Link>
                </div>
                <div className="grid grid-cols-10 p-2 border-b-2 border-blue-400">
                    <div className="p-2 col-span-2 text-center">
                        <p>Class id</p>
                    </div>
                    <div className="p-2 col-span-2 text-center">
                        <p>Class name</p>
                    </div>
                    <div className="p-2 col-span-6 text-center">
                        <p>Time</p>
                    </div>
                </div>
                {classes?.map((el: any[]) => {
                    const time = new Date(Date.parse(el[2]));
                    return (
                        <Link to={`/admin/${el[0]}`}><div key={el[0]} className="grid grid-cols-10 p-2">
                            <div className="p-2 col-span-2 text-center">
                                <p>{el[0]}</p>
                            </div>
                            <div className="p-2 col-span-2 text-center">
                                <p>{el[1]}</p>
                            </div>
                            <div className="p-2 col-span-6 text-center">
                                <p>
                                    {
                                        time.getDate()
                                        + '-'
                                        + (time.getMonth() + 1)
                                        + '-'
                                        + time.getFullYear()
                                        + ' '
                                        + time.getHours()
                                        + ':'
                                        + time.getMinutes()
                                        + ':'
                                        + time.getSeconds()
                                    }
                                </p>
                            </div>
                        </div></Link>
                    )
                })}
                {users.length ? <div className="grid grid-cols-10 p-2 border-b-2 border-blue-400">
                    <div className="p-2 col-span-2 text-center">
                        <p>Class id</p>
                    </div>
                    <div className="p-2 col-span-2 text-center">
                        <p>Class name</p>
                    </div>
                    <div className="p-2 col-span-6 text-center">
                        <p>Time</p>
                    </div>
                </div> : <></>}
                {users?.map((el: any[]) => {
                    const time = new Date(Date.parse(el[3]));
                    return (
                        <div key={el[0]} className="grid grid-cols-10 p-2">
                            <div className="p-2 col-span-2 text-center">
                                <p>{el[1]}</p>
                            </div>
                            <div className="p-2 col-span-2 text-center">
                                <p>{el[2]}</p>
                            </div>
                            <div className="p-2 col-span-6 text-center">
                                <p>
                                    {
                                        time.getDate()
                                        + '-'
                                        + (time.getMonth() + 1)
                                        + '-'
                                        + time.getFullYear()
                                        + ' '
                                        + time.getHours()
                                        + ':'
                                        + time.getMinutes()
                                        + ':'
                                        + time.getSeconds()
                                    }
                                </p>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}