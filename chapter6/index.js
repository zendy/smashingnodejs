var net = require( 'net' );
var server;
var count = 0;
var users = {};

server = net.createServer( function ( conn ) {
  // handle connection
  // console.log( '\033[90m    new connection!\033[39m' );
  conn.setEncoding( 'utf8' );

  // the nickname for the current connection
  var nickname;

  conn.write(
    '\n > welcome to \033[92mnode-chat\033[39m!'
    + '\n > ' + count + ' other people are connected at this time.'
    + '\n > please write your name and press enter: '
  );

  count++;

  conn.on( 'data', function( data ) {
    // console.log( data );
    // remove the 'enter' character
    data = data.replace( '\r\n', '' );

    if ( !nickname ) {
      if ( users[ data ] ) {
        conn.write( '\033[93m> nickname already in use. try again:\033[39m ' );
        return;
      } else  {
        nickname = data;
        users[ nickname ] = conn;

        /*for ( var key in users ) {
          users[ key ].write( '\033[90m  > ' + nickname + ' joined the room\033[39m\n' );
        }*/
        broadcast( '\033[90m  > ' + nickname + ' joined the room\033[39m\n' );
      }
    } else {
      // otherwise you consider it a chat message
      /*for ( var key in users ) {
        if ( key != nickname ) {
          users[ key ].write( '\033[96m  > ' + nickname + ':\033[39m ' + data + '\n' );
        }
      }*/
      broadcast( '\033[96m  > ' + nickname + ':\033[39m ' + data + '\n', true );
    }
  });

  conn.on( 'close', function() {
    count--;
    broadcast( '\033[90m > ' + nickname + ' left the room\033[39m\n' );
    users[ nickname ] = null;
  });

  function broadcast( msg, exceptMyself ) {
    for ( var key in users ) {
      if ( !exceptMyself || key != nickname ) {
        users[ key ].write( msg );
      }
    }
  }
});

server.listen( 3000, function() {
  console.log( '\033[96m    server listening on *:3000\033[39m' );
});