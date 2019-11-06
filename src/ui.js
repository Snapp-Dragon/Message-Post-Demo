class UI{

    //constructor 
    constructor(){

        this.post = document.querySelector('.posts');
        this.titleInput = document.querySelector('#title');
        this.bodyInput = document.querySelector('#body');
        this.idInput = document.querySelector('#id');
        this.postSubmit = document.querySelector('.post-submit');
        this.forState = 'add';
    }

    showPost(posts){

       let output = '';

       //loop through the array of posts
       posts.forEach((post)=>{

        //for each post append to the output variable
        output += `<div class = "card mb-3">
                        <div class = "card-body">
                            <h4 class = "card-title">${post.title}</h4>
                            <p class = "card-text">${post.body}</p>


                            <a href ="#" class = "edit card-link" data-id = "${post.id}">
                            <i class= "fa fa-pencil"></i>
                            </a>


                            <a href ="#" class = "delete card-link" data-id = "${post.id}">
                            <i class= "fa fa-remove"></i>
                            </a>
                        
                        </div>
        
                    </div>
                    `;
        


       });

       this.post.innerHTML= output;


    }

    // showAlert(message, className){

    //     this.clearAlert();

    //     //create div
    //     const div = document.createElement('div');

    //     //add classes

    //     div.className = className;

    //     //add text
    //     div.appendChild(document.createTextNode(message));


    //     //insert into the dom
    //     const container = document.querySelector('.postContainer');

    //     //get post
    //     const posts = document.querySelector('.posts');


    //     //insert alert div
    //     container.insertBefore(div,posts);

    //     //timeout

    //     setTimeout(()=>{
            
    //         this.clearAlert();
    //     }, 3000);

    // }




   

   //clear all fields
    clearFields(){

        this.titleInput.value = '';
        this.bodyInput.value = '';

    }

    //fill form to edit
    fillForm(data){

        this.titleInput.value = data.title;
        this.bodyInput.value = data.body;
        this.idInput.value = data.id;

        //change form state 
        this.changeFormState('edit');

    }

    clearIdInput(){

        this.idInput.value = '';
    }



    //change the form state
    changeFormState(type){

        if(type === 'edit'){

            //chage the text and color of the button
            this.postSubmit.textContent = 'Update Post';
            this.postSubmit.className = 'post-submit btn btn-outline-warning btn-block';

            //create cancel buttin
            const button = document.createElement('button');

            

            //set classes for button
            button.className = 'post-cancel btn btn-outline-danger btn-block';

            // add the text into the button
            button.appendChild(document.createTextNode('Cancel edit'));

            //get the parent
            const cardForm = document.querySelector('.card-form');


            //get the element to insert before
            const formEnd = document.querySelector('.form-end');


            cardForm.insertBefore(button, formEnd);



        } else{

            
            //chage the text and color of the button
            this.postSubmit.textContent = 'Post A Message';
            this.postSubmit.className = 'post-submit btn btn-outline-info btn-block';


            //remove cancel button if there
            if(document.querySelector('.post-cancel')){

                document.querySelector('.post-cancel').remove();
            }

            //clear id from hidden fields
            this.clearIdInput();

            //clear text
            this.clearFields();


        }
    }
}

//export the class to be used 

export const ui = new UI();