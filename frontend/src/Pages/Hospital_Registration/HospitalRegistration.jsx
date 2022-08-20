import React, { useState } from "react";
import FormInput from "../../components/FormInput/form-input";
import "./Style.scss";

export default function HospitalRegistration() {
  const [Images, setImages] = useState([]);
  const [name, setName] = useState("");
  const [runningImage, setRunningImage] = useState(null);
  const [ImageError, setImageError] = useState("");
  const [image, setImage] = useState(null);

 const RemoveImage = (R_img) => {
    let newImages = [];
    Images.map(img => {
      if(img !== R_img){
        newImages.push(img)
      }
    })

    setImages(newImages);
 }

  const handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  const onChangeFile = (e) => {
    let imageFile = e.target.files[0];

    setRunningImage(imageFile);

    if (!imageFile) {
      setImageError("Please Select All Fields of Images");
      return false;
    }

    if (!imageFile.name.match(/\.(jpg|jpeg|png|gif)$/)) {
      setImageError("Please select valid image.");
      return false;
    }

    imageFile = URL.createObjectURL(e.target.files[0]);

    setImages([imageFile, ...Images]);

    setRunningImage(null);
  };
  return (
    <div className="Register_Page">
      <div className="Register_Card">
        <h1>Registeration For Hospital</h1>
        <div className="pick_images">
              { Images && Images.map(img => {
                return ( <div className="image" >
                 
                   <img src={img} height="100%" width="100%" alt="hospital"/> 
                   <i class="fa fa-times"
                   onClick={() => RemoveImage(img)}
                   ></i>
                   </div>)
              })}
          </div>
        <form className="my_signup_form">
          {
            Images.length !== 5 && <div className="image_space">
           
            <label class="custom-file-upload">
              <input type="file" value={runningImage}  onChange={onChangeFile}/>
            <i class="fa fa-2x fa-camera"></i>
        </label>
        
         
        </div>
          }
          <FormInput
            type="text"
            name="displayName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            label="Display Name"
            required
          />
        </form>
      </div>
    </div>
  );
}
