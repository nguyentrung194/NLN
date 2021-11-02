/* eslint-disable jsx-a11y/img-redundant-alt */
import axios from "axios";
import { useFormik } from "formik";
import React, { useContext, useRef, useState } from "react";
import { useToasts } from "react-toast-notifications";
import Webcam from "react-webcam";
import environment from "../../config";
import { UserContext } from "../../contexts/user-reducer";

function decodeBase64Image(dataString: string) {
    const matches: any = dataString.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    const response: any = {};

    if (matches?.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = matches[2];
    console.log(Buffer.from(matches[2], 'base64'))

    return response;
}

export const Login = () => {
    const { login, takePiture, images } = useContext(UserContext);
    const videoConstraints = {
        width: 1280,
        height: 720,
        facingMode: "user"
    };
    const webcamRef: any = useRef(null);
    const [imgSrc, setImgSrc] = useState('')
    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        takePiture({ image: decodeBase64Image(imageSrc).data })
        console.log(images)
        setImgSrc(imageSrc)
    };
    const { addToast } = useToasts();
    const formik = useFormik({
        initialValues: {
            class_id: '',
            email: '',
        },
        onSubmit: async (values) => {
            try {
                formik.setSubmitting(true);
                const time = new Date()
                const messName = await axios({
                    url: environment.api + 'login',
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    data: {
                        email: values.email,
                        encode: images.join(",,"),
                        class_id: 1,
                    }
                })
                const arrayMess = messName.data.split(",")
                const name = arrayMess[0]
                if (name === "You are unknown first register your self") {
                    addToast("You are unknown first register your self", {
                        appearance: 'info',
                        autoDismiss: true,
                    });

                }
                else if (name === "Unknown") {
                    addToast("Unknown", {
                        appearance: 'info',
                        autoDismiss: true,
                    });
                }
                else {
                    login({ ...values, name: name, time, isLogin: true, user_id: arrayMess[-1] })

                    addToast(`Wellcome ${name}`, {
                        appearance: 'success',
                        autoDismiss: true,
                    });
                }

                formik.setSubmitting(false);
            } catch (error) {
                addToast("Let try again!", {
                    appearance: 'error',
                    autoDismiss: true,
                });
                console.log(error);
                formik.setSubmitting(false);
            }
        },
    });
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="max-w-sm pr-5">
                <p>You should take 2-4 clear photos.</p>
                {imgSrc ? <img src={imgSrc} alt="image preview2" /> : null}
                <p>Count image: {images.length}</p>
                <Webcam
                    audio={false}
                    height={720}
                    forceScreenshotSourceSize={true}
                    mirrored={true}
                    screenshotQuality={1}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    width={1280}
                    videoConstraints={videoConstraints}
                />
                <button
                    className="py-6 my-2 text-lg font-bold cursor-pointer transition-all duration-300 
                delay-75 rounded-full appearance-none flex items-center justify-center flex-shrink-0
                text-center no-underline text-white bg-blue-400 h-12 w-full disabled:opacity-50
                hover:bg-blue-700 active:bg-blue-300 shadow-xl"
                    onClick={capture}>Capture photo</button>
            </div>
            <div className="w-full max-w-xs">
                <form
                    className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
                    onSubmit={formik.handleSubmit}
                >
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Class ID:
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            name="class_id"
                            type="text"
                            value={formik.values.class_id}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" >
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                            name="email"
                            type="text"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                        />
                    </div>
                    <div className="pb-8 w-64">
                        <button
                            className="py-6 my-2 text-lg font-bold cursor-pointer transition-all duration-300 
            delay-75 rounded-full appearance-none flex items-center justify-center flex-shrink-0
            text-center no-underline text-white bg-blue-400 h-12 w-full disabled:opacity-50
            hover:bg-blue-700 active:bg-blue-300 shadow-xl"
                            disabled={formik.isSubmitting}
                            type="submit"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}