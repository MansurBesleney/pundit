document.addEventListener("DOMContentLoaded", () =>{
    const loginForm = document.querySelector('#login')
    const createAccountForm = document.querySelector('#create-account')

    document.querySelector('#link-create-account').addEventListener("click", e =>{
        e.preventDefault();
        loginForm.classList.add("form-hidden");
        createAccountForm.classList.remove("form-hidden")
    });

    document.querySelector('#link-login').addEventListener("click", e =>{
        e.preventDefault();
        loginForm.classList.remove("form-hidden");
        createAccountForm.classList.add("form-hidden")
    });
    
});