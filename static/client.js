$(document).ready(() => {

    const socket = io.connect();
    let currentUser;

    // Get leaderboard on user join
    socket.emit('get current leaderboard');

    // When create user button is clicked, log in with entered username
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

    // When cookie is clicked, send update to server
    $('#cookie-click-btn').click((e)=>{
        e.preventDefault();
        socket.emit('cookie click');
    })

    // Update leaderboard when a user leaves
    socket.on('user has left', () => {
        socket.emit('get current leaderboard');
    })

    // Update cookie click text with correct number
    socket.on('cookie click', (clicks) => {
        $('#clicks').text(clicks);
    })

    // Update leaderboard table with current standings
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
