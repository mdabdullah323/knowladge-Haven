import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";

export const initializeFirebase = () => {
    if(!firebase.apps.length){
        firebase.initializeApp(firebaseConfig);
    } else {
        firebase.app();
    }
}

export const createUser = async (email, password) => {

    return firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            return userCredential.user;
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`${errorCode} \n ${errorMessage}`);
        });
}

export const signInWithEmailAndPassword = async (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            return userCredential.user;
        })
        .catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(`${errorCode} \n ${errorMessage}`);
        });
}

export const logOut = async () => {
    return firebase.auth().signOut().then(() => {
        // Sign-out successful.
    }).catch(error => {
        alert(error);
    });
}

const signIn = async (provider) => {
    return firebase.auth()
    .signInWithPopup(provider)
    .then(result => {
        return result.user;
    }).catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`${errorCode} \n ${errorMessage}`);
    });
}

export const facebookSignIn = async () => {
    const facebookProvider = new firebase.auth.FacebookAuthProvider();
    return signIn(facebookProvider);
}

export const googleSignIn = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    return signIn(googleProvider);
}