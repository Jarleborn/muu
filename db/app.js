var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

   var http = require('http');
 
// Connection URL 
var url = 'mongodb://localhost:27017/muudb';
// Use connect method to connect to the Server 
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server");
 
  insertDocuments(db, function() {
    db.close();
  });

});

var insertDocuments = function(db, callback) {
  // Get the documents collection 
  var collection = db.collection('documents');
  // Insert some documents 
  collection.insert([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the document collection")
    console.log(result.result.n);
    console.log(result.ops);
    callback(result);

  });
}


var content = {};
http.createServer(function(request, response) {
	response.writeHead(200, {
		"Content-Type": "text/json",
		'Access-Control-Allow-Origin': '*'
	});
	var body = '';
	var data;
	request.on('data', function(chunk) {
		body += chunk.toString('utf8');
		data = JSON.parse(body);
		getData(function(err, rows) {
			if (err) {
				content.hallo = "blöö"
				console.log(err);
			} else {
				response.write(JSON.stringify(rows));
				response.end();
			}

		});
	});
}).listen(8000, 'localhost');

