$(document).ready(() => {

    const socket = io.connect();
    let currentUser;

    $('#create-user-btn').click((e)=>{
        e.preventDefault();
        if($('#username-input').val().length > 0){
          socket.emit('new user', $('#username-input').val());
          // Save the current user when created
          currentUser = $('#username-input').val();
          $('.username-form').remove();
          $('.main-container').css('display', 'flex');
        }
    });

    $('#cookie-click-btn').click((e)=>{
        e.preventDefault();
        socket.emit('cookie click')
    })
})
