module.exports = {
	getConnection: getConnection
};

function getDbOpts(opts) {
	opts = opts || {
		host: 'localhost',
		db: 'my-app',
		port: 27017
	};
	opts.port = opts.port || 27017;
	return opts;
}

function getConnection(opts, cb) {
	opts = getDbOpts(opts);

	var mongodb = require('mongodb'),
		MongoClient = require('mongodb').MongoClient;		
		
	if (opts.uri instanceof Array) {
		opts.uri = opts.uri[0];
	}

	MongoClient.connect(opts.uri, {safe: true}, function (err, db) {
		if (err) {
			return cb(err);
		}

		var collection = new mongodb.Collection(db, 'migrations');
		cb(null, {
			connection: db,
			migrationCollection: collection
		});
	});
}
