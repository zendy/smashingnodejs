var http = require( 'http' );

http.createServer(function( req, res ) {
  /*res.writeHead( 200 );*/
  console.log( req.headers );
  res.writeHead( 200, {'content-type': 'text/html'} );
  res.end( 'Hello <b>World</b>' );
  /*res.write( 'Hello' );

  setTimeout(function() {
    res.end( '<b>World</b>' );
  }, 5000);*/
}).listen( 3000 );