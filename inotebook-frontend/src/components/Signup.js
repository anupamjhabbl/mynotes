import { useContext, useState } from "react";
import NoteContext from "../context/notes/NoteContext";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [value, setValue] = useState({ "name": "", "email": "", "password": "" });
    const contextObj = useContext(NoteContext);
    let navigate = useNavigate();

    const onChangeMethod = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:5000/api/auth/createUser`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(value),
            });
            const mainResponse = await response.json();
            if (mainResponse.success) {
                contextObj.setSuccess(true);
                localStorage.setItem("token", mainResponse.authToken);
                contextObj.setAlertMethod("Successfully created the user");
                navigate('/');

            }
            else {
                contextObj.setAlertMethod("Some error ocuured");
            }
        }
        catch (error) {
            contextObj.setAlertMethod("Some error ocuured");
        }
        //   console.log(mainResponse);

    }

    return (
        <div className="container w-50" style={{ "marginTop": "130px" }}>
            <h1 className="text-center my-5">SignUp</h1>
            <form className="my-5" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" value={value.name} name="name" aria-describedby="emailHelp" onChange={onChangeMethod} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={value.email} name="email" aria-describedby="emailHelp" onChange={onChangeMethod} required />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={value.password} onChange={onChangeMethod} required />
                </div>
                <button type="submit" className={`btn btn-primary ${value.password.length <= 8 ? "disabled" : ""}`}>Submit</button>
            </form>
        </div>
    )
}

export default Signup;