var http = require( 'http' );
var qs = require( 'querystring' );

http.createServer(function( req, res ) {
  res.writeHead( 200, {'content-type': 'text/html'} );

  if ( '/' == req.url ) {
    res.end(
      [
        '<form method="post" action="/url">',
        '<h1>My form</h1>',
        '<fieldset>',
        '<label>Personal information</label>',
        '<p>What is your name?</p>',
        '<input type="text" name="name" />',
        '<p><button>Submit</button></p>',
        '</form>'
      ].join( '' )
    );
  } else if ( '/url' == req.url && 'POST' == req.method ) {
    /*res.end( 'You sent a <em>' + req.method + '</em> request' );*/
    var body = '';

    req.on( 'data', function( chunk ) {
      body += chunk;
    });

    req.on( 'end', function() {
      /*res.end( '<p>Content-Type: ' + req.headers[ 'content-type' ] + '</p><p>Data:</p><pre>' + body + '</pre>' );*/
      res.end( '<p>Your name is <b>' + qs.parse( body ).name + '</b></p>' );
    });
  } else {
    res.writeHead( 404 );
    res.end( 'Not Found' );
  }
}).listen( 3000 );