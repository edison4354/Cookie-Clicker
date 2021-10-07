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
        socket.emit('cookie click');
    })

    socket.on('cookie click', (clicks) => {
        $('#clicks').text(clicks);
    })

    socket.on('update leaderboard', (standings) => {
        $('#leaderboard tr:not(:first-child').remove()
        for (user in standings) {
            $('#leaderboard tr:last').after(`
            <tr>
                <th>${standings[user].rank}</th>
                <th>${user}</th>
                <th>${standings[user].clicks}</th>
            </tr>
            `);
        }
    })
})
