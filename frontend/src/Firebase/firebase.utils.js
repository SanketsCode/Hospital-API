

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig ={
    apiKey: "AIzaSyCIE2CJG84gYSXMp21i596U7qkcdoRUENY",
    authDomain: "crwn-db-39f39.firebaseapp.com",
    projectId: "crwn-db-39f39",
    storageBucket: "crwn-db-39f39.appspot.com",
    messagingSenderId: "891234527730",
    appId: "1:891234527730:web:0faa780caffdee7657236b"
}

let Firebase = firebase.initializeApp(firebaseConfig);


//putting images to storage
export const StoreImages = async(Images) => {
    console.log(Images);
    let newImages = [];
    for(let i=0;i<Images.length;i++){
        let response = await fetch(Images[i]);
        let blob = await response.blob();
        let ref = Firebase.storage().ref().child(`hospitals/${Date.now()}`);
        await (ref.put(blob));
        let link = await ref.getDownloadURL();
        newImages.push(link);
      }
    console.log(newImages);
    return newImages;

}


export default Firebase; 
