import { useState } from 'react';
import { auth, googleProvider } from '../config/firebase';
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth';

export const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    console.log(auth?.currentUser?.email);
    const signIn = async () => {
        await createUserWithEmailAndPassword(auth, email, password);
    };
    const signInWithGoogle = async () => {
        await signInWithPopup(auth, googleProvider);
    };
    const signsOut = async () => {
        await signOut(auth);
    };

    return (
        <div>
            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={signIn}>Sign In </button>
            <button onClick={signInWithGoogle}>Sign In With Google </button>
            <button onClick={signsOut}>Logout</button>
        </div>
    );
};

export default auth;
