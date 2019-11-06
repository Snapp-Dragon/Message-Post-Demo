import {http} from './http';
import {ui} from './ui';

// Get POST when the dom loads
document.addEventListener('DOMContentLoaded', getPosts);

//listen for add post
document.querySelector('.post-submit').addEventListener('click', submitPost);


//listen for delete 
document.querySelector('.posts').addEventListener('click', deletePosts);


//listen for edit state 
document.querySelector('.posts').addEventListener('click',enableEdit);



//listen for cancel 
document.querySelector('.card-form').addEventListener('click', cancelEdit);




//get post 

function getPosts(){

  http.get('http://localhost:3000/posts')
  .then(data => ui.showPost(data))
  .catch(err => console.log(err));
}


//add post
function submitPost(){

  // get the form data

  const title = document.querySelector('#title').value;

  const body = document.querySelector('#body').value;

  const id = document.querySelector('#id').value;


  
  const data = {

    title,
    body
  }



  //validate input

  if(title === '' || body === ''){

    window.alert("Please fill in all fields");
  } else{


    //check for id
    if(id === ''){
      //create post
    http.post('http://localhost:3000/posts',data)
    .then(data =>{
  
     
      ui.clearFields();
  
      getPosts();
  
  
  
  
    })
    .catch(err => console.log(err));


    }else{


      //update the post
    http.put(`http://localhost:3000/posts/${id}`,data)
    .then(data =>{
  
     
   
      ui.changeFormState('add');
      getPosts();
  
  
  
  
    })
    .catch(err => console.log(err));



    }


    

  }


  




}


//delete post
function deletePosts(e){

  e.preventDefault();

  if(e.target.parentElement.classList.contains('delete')){


    const id = e.target.parentElement.dataset.id;
    if(confirm('Are you sure?')){

      http.delete(`http://localhost:3000/posts/${id}`)
      .then(data =>{

        getPosts();

      })
      .catch(err => console.log(err));
    }
  }


}

//enable edit

function enableEdit(e){

  e.preventDefault();

  //event delegation
  if(e.target.parentElement.classList.contains('edit')){

      const id = e.target.parentElement.dataset.id;

      const title =  e.target.parentElement.previousElementSibling.previousElementSibling.textContent;

      const body = e.target.parentElement.previousElementSibling.textContent;

      const data =  {

        id,
        title,
        body
      }


      //fill the form with the current post
       ui.fillForm(data);


  }


}

function cancelEdit(e){

  if(e.target.classList.contains('post-cancel')){

    ui.changeFormState('add');
  }


}