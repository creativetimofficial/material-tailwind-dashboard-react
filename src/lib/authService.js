import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
} from 'firebase/auth';

import { auth } from './firebase';

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

export const loginWithEmail = ({ email, password }) =>
  signInWithEmailAndPassword(auth, email, password);

export const signupWithEmail = ({ email, password }) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginWithGoogle = () => signInWithPopup(auth, googleProvider);

export const loginWithGithub = () => signInWithPopup(auth, githubProvider);

export const logoutUser = () => signOut(auth);
