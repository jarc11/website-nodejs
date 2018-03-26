document.addEventListener('DOMContentLoaded', function () {

    $('#loginForm').submit(function(e){
        e.preventDefault();
        var request = {
            username: document.getElementById('username').value,
            password: document.getElementById('password').value
        }
        $.ajax({
            method: 'POST',
            url:'/api/users/login',
            data: request
        }).done(function(data) {
            alert(data.passwordCorrect);
        })
    });

})