import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";
import './App.css';
import firebaseConfig from "./firebase.config";


if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

function App() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    photo: ''
  });

  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const facebookProvider = new firebase.auth.FacebookAuthProvider();
  const githubProvider = new firebase.auth.GithubAuthProvider();


  const handleGoogleSignIn = () => {
    firebase.auth().signInWithPopup(googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user)
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorMessage);
      });

  }
  const handleFacebookSignIn = () => {
    firebase
      .auth().signInWithPopup(facebookProvider)
      .then((result) => {
        const user = result.user;  
        setUser(user)
        console.log(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        console.log(errorMessage, errorMessage, email);
      });
  }

  const handleGithubSignIn = () => {
    firebase
      .auth().signInWithPopup(githubProvider)
      .then((result) => {
        const user = result.user;
        setUser(user)
      }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorMessage);
      });
  }

  return (
    <div className="App">
      <h2>Login Logout System</h2>
      <button onClick={handleGoogleSignIn}> Sign With Google </button>
      <br></br>
      <button onClick={handleFacebookSignIn}> Sign In With Facebook </button>
      <br></br>
      <button onClick={handleGithubSignIn}>Sign In With GitHub</button>
      <div>
          <h3>Name:{user.displayName}</h3>
          <p>Email: {user.email}</p>
          <img src={user.photoURL} alt="" style={{ width: '200px' }} />
        </div>
    </div>
  );
}

export default App;
