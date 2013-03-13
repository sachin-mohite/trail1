var http = require("http"),
	path = require("path"),
	fs = require("fs"),
	extensions = {
	".html" :"text/html",
	".css" : "text/css",
	".js" : "application/javascript",
	".png" : "image/png"
	};

http.createServer(function(req, res) {
	var filename = path.basename (req.url) || "index.html";
	var ext = path.extname(filename);
	
	localpath = __dirname + "/public/";
	
	if (extensions[ext])
	{
		localpath +=filename;
		
		path.exists( localpath, function(exits){
		
			if(exits)
			{
				getFile(localpath, extensions[ext], res);
			}
			else
			{
				res.writeHead(404);
				res.end();			
			}		
		});
	}
	
}).listen(8000, "127.0.0.1");

function getFile(localpath, res){

	fs.readFile(localpath, function(err, contents){
		if(!err)
		{
			res.end(contents);
		}
		else
		{
			res.writeHead(500);
			res.end();
		}
	});
}