import { checkInFunction, singInFunction, logOut, getUserPostData,
         deletePost, updatePost} from './controller-function/function-firebase.js';

export const checkInOnSubmit = () => {
  const name = document.querySelector('#user-name').value;
  const information = document.querySelector('#information').value;
  const email = document.querySelector('#email').value;
  const password = document.querySelector('#password').value;

  const firestore = firebase.firestore();
  let nameUser = name;
  let informationUser = information;
  let emailRef = email;
  let users = firestore.collection('users');
  let data = {
    name: nameUser,
    information: informationUser,
    email: emailRef,
  };

  checkInFunction(email, password)
    .then(() => {
      data.userId = firebase.auth().currentUser.uid;
      users.add(data);
      window.location.hash = '#/signIn';
    })
    .catch(() => {
    });
};
export const signInOnSubmit = () => {
  const userEmail = document.querySelector('#email-si').value;
  const userPassword = document.querySelector('#password-si').value;
  singInFunction(userEmail, userPassword)
    .then(() => {
    })
    .catch((error) => {
      alert(error);
    });
};



export const addPostOnSubmit = () => {
  const contentPost = document.querySelector('#text-area');
  getUserPostData(contentPost.value)
  .then(() => {
    window.location.hash = '#/perfil';
  })
  .catch(() => {})
  // .then((
  // swal('¡Genial!', 'Tu post se subió satisfactoriamente', 'success'))
  // .catch((err) => error => {
  //   console.error('Error adding document: ', error);
  // })
};

export const deletePostOnSubmit = (objPost) => 
  deletePost(objPost.id);

export const updatePostSubmit = (content) => {
  console.log('gola')
  document.querySelector('.text-area').value = content;
  const botonGuardar = document.querySelector('#post');
  botonGuardar.innerHTML = 'Guardar';
  botonGuardar.addEventListener('click', () => {
     updatePost()
 .then (() => {
  botonGuardar.innerHTML = 'Guardar';
  document.querySelector('.text-area').value = '';

 })
.catch (() => {})
console.log('haaaaaaaa')
  })
}



export const logOutOnSubmit = () => {
  logOut()
    .then(() => {
      window.location.hash = '#/signIn';
    })
    .catch(() => { });
};