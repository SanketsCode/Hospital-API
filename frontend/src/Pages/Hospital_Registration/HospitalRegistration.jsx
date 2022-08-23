import React, { useState } from "react";
import { StoreImages } from "../../Firebase/firebase.utils";
import ErrorMsg from "../../components/ErrorMsg/ErrorMsg";
import FormInput from "../../components/FormInput/form-input";
import SelectInput from "../../components/SelectInput/SelectInput";
import "./Style.scss";

export default function HospitalRegistration() {
  const [Images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Contact, setContact] = useState("");
  const [Address, setAddress] = useState("");
  const [District, setDistrict] = useState("Pune");
  const [State, setState] = useState("Maharashtra");
  const [runningImage, setRunningImage] = useState("");
  const [error,setError] = useState("");

  const RemoveImage = (R_img) => {
    let newImages = [];
    Images.map((img) => {
      if (img !== R_img) {
        newImages.push(img);
      }
    });

    setImages(newImages);
  };

  const onChangeFile = (e) => {
    let imageFile = e.target.files[0];
    if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      setError("Please select valid image.");
      return false;
    }
    setRunningImage(imageFile);
    if (!imageFile) {
      setError("Please Select All Fields of Images");
      return false;
    }
   
    imageFile = URL.createObjectURL(e.target.files[0]);

    setImages([imageFile, ...Images]);

    setRunningImage(null);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!Images){
      setError("You Need To Select Images")
    }else{
      const newImages = await StoreImages(Images);
      console.log(newImages);
    }
  }


  return (
    <div className="Register_Page">
      <div className="Register_Card">
        <h1>Registeration For Hospital</h1>
        {Images.length > 0 && (
          <div className="pick_images">
            {Images &&
              Images.map((img) => {
                return (
                  <div className="image" key={img}>
                    <img src={img} height="100%" width="100%" alt="hospital" />
                    <i className="fa fa-times" onClick={() => RemoveImage(img)}></i>
                  </div>
                );
              })}
          </div>
        )}
        {
          error && <ErrorMsg error={error} onClick={() => {setError("")}} />
        }
        <form onSubmit={handleSubmit} className="my_signup_form">
          {Images.length !== 5 && (
            <div className="image_space">
              <label className="custom-file-upload">
                <input
                  type="file"
                  value={runningImage}
                  onChange={onChangeFile}
                />
                <i className="fa fa-2x fa-camera"></i>
              </label>
            </div>
          )}
          <FormInput
            type="text"
            name="hispitalName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Hospital Name"
            required
          />
          <FormInput
            type="text"
            name="hispitalEmail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Hospital Email"
            required
          />
          <FormInput
            type="password"
            name="Password"
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            required
          />
          <FormInput
            type="number"
            name="hispitalContact"
            value={Contact}
            onChange={(e) => setContact(e.target.value)}
            label="Hospital Contact"
            required
          />
          <FormInput
            type="text"
            name="hispitalAddress"
            value={Address}
            onChange={(e) => setAddress(e.target.value)}
            label="Hospital Address"
            required
          />
          <SelectInput
            values={["Pune", "Mumbai", "Satara", "Karad"]}
            label="District"
            value={District}
            onChange={(e) => setDistrict(e.target.value)}
          />
          <SelectInput
            values={["Maharashtra"]}
            label="State"
            value={State}
            onChange={(e) => setState(e.target.value)}
          />
          <button type="submit" className="custom-button">
              Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
