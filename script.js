let section = document.querySelector("section");

let add = document.querySelector("form button");
add.addEventListener("click", e =>{
    e.preventDefault();

    let form = e.target.parentElement;
    let todoText = form.children[0].value;
    let todoYear = form.children[1].value;
    let todoMonth = form.children[2].value;
    let todoDate = form.children[3].value;

    if(todoText === ""){
        alert("請輸入事項！");
        return;
    }

    let todo = document.createElement("div");
    todo.classList.add("todo");
    let text = document.createElement("p");
    text.classList.add("todo-text");
    text.innerText = todoText;
    let time = document.createElement("p");
    time.classList.add("todo-time");
    time.innerText = todoYear + "/" + todoMonth + "/" + todoDate;
    todo.appendChild(text);
    todo.appendChild(time);

    let completeButton = document.createElement("button");
    completeButton.classList.add("complete");
    completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
    completeButton.addEventListener("click", e => {
        let todoItem = e.target.parentElement;
        console.log(todoItem);
        todoItem.classList.toggle("done");
      });
    

    let trashButton = document.createElement("button");
    trashButton.classList.add("trash");
    trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    trashButton.addEventListener("click", e =>{
        let todoItem = e.target.parentElement;
        todoItem.addEventListener("animationend", () =>{
            let text = todoItem.children[0].innerText;
            let myListArray = JSON.parse(localStorage.getItem("list"));
            myListArray.forEach((item, index) =>{
                if (item.todoText == text){
                    myListArray.splice(index, 1);
                    localStorage.setItem("list", JSON.stringify(myListArray));
                }
            });           
            todoItem.remove();
        });
        todoItem.style.animation = "scaleDown 0.3s forwards";        
    });

    todo.appendChild(completeButton);
    todo.appendChild(trashButton);

    todo.style.animation = "scaleUp 0.3s forwards";

    let myTodo = {
        todoText: todoText,
        todoYear: todoYear,
        todoMonth: todoMonth,
        todoDate: todoDate
    };

    let myList  = localStorage.getItem("list");
    if (myList == null){
        localStorage.setItem("list", JSON.stringify([myTodo]));
    }else{
        let myListArray = JSON.parse(myList);
        myListArray.push(myTodo);
        localStorage.setItem("list", JSON.stringify(myListArray));
    }

    console.log(JSON.parse(localStorage.getItem("list")));

    form.children[0].value = "";
    form.children[1].value = "";
    form.children[2].value = "";
    form.children[3].value = "";
    
    section.appendChild(todo);
});

let myList = localStorage.getItem("list");
if (myList !== null){
    let myListArray = JSON.parse(myList);
    myListArray.forEach(item =>{

        let todo = document.createElement("div");
        todo.classList.add("todo");
        let text = document.createElement("p");
        text.classList.add("todo-text");
        text.innerText = item.todoText;
        let time = document.createElement("p");
        time.classList.add("todo-time");
        time.innerText = item.todoYear + "/" + item.todoMonth + "/" + item.todoDate;
        todo.appendChild(text);
        todo.appendChild(time);

        let completeButton = document.createElement("button");
        completeButton.classList.add("complete");
        completeButton.innerHTML = '<i class="fa-solid fa-check"></i>';
        completeButton.addEventListener("click", e => {
            let todoItem = e.target.parentElement;
            console.log(todoItem);
            todoItem.classList.toggle("done");
        });
        

        let trashButton = document.createElement("button");
        trashButton.classList.add("trash");
        trashButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        trashButton.addEventListener("click", e =>{
            let todoItem = e.target.parentElement;
            todoItem.addEventListener("animationend", () =>{
                let text = todoItem.children[0].innerText;
                let myListArray = JSON.parse(localStorage.getItem("list"));
                myListArray.forEach((item, index) =>{
                    if (item.todoText == text){
                        myListArray.splice(index, 1);
                        localStorage.setItem("list", JSON.stringify(myListArray));
                    }
                });           
                todoItem.remove();
            })
            todoItem.style.animation = "scaleDown 0.3s forwards";        
        });

        todo.appendChild(completeButton);
        todo.appendChild(trashButton);

        todo.style.animation = "scaleUp 0.3s forwards";

        section.appendChild(todo);
    });
}