import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL, list } from "firebase/storage"
import { getDatabase, ref as dbref, get, child, set, push, update } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyAIq-CEwpHPDsdY3k4VxOsOtAuomb78fJI",
  authDomain: "social-cat-17fa5.firebaseapp.com",
  databaseURL: "https://social-cat-17fa5-default-rtdb.firebaseio.com/",
  projectId: "social-cat-17fa5",
  storageBucket: "social-cat-17fa5.appspot.com",
  messagingSenderId: "544384703117",
  appId: "1:544384703117:web:f816b9b0ac20cf7a03e0c4",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);
const db = getDatabase(app);

export const createUserAccount = async (email, password, displayName) => {
  try{
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(userCredential.user, { displayName });
      return userCredential.user.uid
  }catch(error){
      console.log(`error occured : ${error}`)
  }
}

export const userSignIn = async (email, password) => {
  try{
      await signInWithEmailAndPassword(auth, email, password)
  }catch(error){
      console.log(`error occured : ${error}`)
  }
}

export const userInfo = async() => {
  try{
    const user = auth.currentUser;
    return user.displayName
  }
  catch(err){
    console.error(err)
  }
}

export const getCurrentUser = async() => {
  try{
    const user = auth.currentUser
    return user.email
  }
  catch(err){
    console.error(err)
  }
}

export const getCurrentUserId = async() => {
  try{
    const user = auth.currentUser
    return user.uid
  }
  catch(err){
    console.error(err)
  }
}

export const userSignOut = async() => {
  try{
    await signOut(auth)
  }
  catch(err){
    console.error(err)
  }
}

export const uploadProfilePhoto = async(file, userId) => {
  try{
    const storageRef = ref(storage, `user-profiles/${userId}`);
    const userRef = ref(storageRef, 'profile-image.jpg')
    await uploadBytes(userRef, file);
    const downloadURL = await getDownloadURL(userRef);
    await updateProfile(auth.currentUser, { photoURL: downloadURL });
  }
  catch(err) {
    console.error(err)
  }
}

export const getProfilePhoto = async(useremail) => {
  try{
    const storage = getStorage();
    const profileImageRef = ref(storage, `user-profiles/${useremail}/profile-image.jpg`);
    return await getDownloadURL(profileImageRef);
  }
  catch(err){
    console.error(err)
  }
}

export const post = async(useremail, file, orignalName, userId) => {
  try{
    const storageRef = ref(storage, `user-post/${useremail}/${orignalName}`)
    await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(storageRef)
    const postdbref = dbref(db, "users-post/" + userId)
    await push(postdbref, {
      url: downloadURL,
      likes: 0,
      liked: true
    })
  }
  catch(err){
    console.error(err)
  }
}

export const gettingAllPost = async(useremail) => {
  try{
    const postRef = await ref(storage, `user-post/${useremail}`)
    const posts = await list(postRef)
    return posts.items
  }
  catch(err){
    console.error(err)
  }
}

export const showAllPost = async (userId) => {
  try{
    const dbRef = dbref(db);
    const snapshot = await get(child(dbRef, `users-post/${userId}`))

    if(snapshot.exists()){
      return snapshot.val()
    }else {
      console.log("No data available");
      return null;
    }
  }
  catch(error){
    console.error(error)
    throw error
  }
};

export const userDatabase = async (userId, email, displayName) => {
  try{
    const postdbref = dbref(db, "users-details/" + userId)
    await set(postdbref, {
      id: email,
      username: displayName,
      viewers : 0
    })
  }
  catch(err){
    console.log(err)
  }
}

export const gettingSearchUserDetails = async (searchedUser) => {
  try{
    const dbRef = dbref(db);
    const snapshot = await get(child(dbRef, `users-details/${searchedUser}`))

    if(snapshot.exists()){
      console.log(snapshot.val())
      return snapshot.val()
    }else {
      console.log("No data available");
      return null;
    }
  }
  catch(err){
    console.log(err)
  }
}

export const gettingUserDetails = async (User) => {
  try{
    const dbRef = dbref(db);
    const snapshot = await get(child(dbRef, `users-details/${User}`))

    if(snapshot.exists()){
      console.log(snapshot.val())
      return snapshot.val()
    }else {
      console.log("No data available");
      return null;
    }
  }
  catch(err){
    console.log(err)
  }
}


export const addingViewer = async (userId, viewerId, viewerNumber) => {
  try{
    const postdbref = dbref(db, "users-viewers-details/" + userId + "/" + viewerNumber)
    await set(postdbref, {
      viewerId : viewerId
    }) 
  }
  catch(err){
    console.log(err)
  }
}

export const updateTotalViewers = async (userId, totalViewers) => {
  try{
    const viewerRef = dbref(db, "users-details/" + userId)
    await update(viewerRef, {
      viewers : totalViewers
    })
  }
  catch(err){
    console.log(err)
  }
}