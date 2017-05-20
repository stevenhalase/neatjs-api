import * as mongoose from 'mongoose';
let Schema = mongoose.Schema;

let PostSchema = new Schema({
	'title' : String,
	'createdon' : Date,
	'createdby' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'User'
	},
	'modifiedon' : Date,
	'modifiedby' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'User'
	},
	'status' : String,
	'visibility' : String,
	'publishedon' : Date,
	'publishedby' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'User'
	},
	'categories' : Array,
	'tags' : Array,
	'media' : Array,
	'fields' : Array
});

module.exports = mongoose.model('Post', PostSchema);
