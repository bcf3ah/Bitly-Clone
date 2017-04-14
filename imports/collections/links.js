//import mongo and validation dependencies
import {Mongo} from 'meteor/mongo';
import validUrl from 'valid-url';
import {check, Match} from 'meteor/check';

//Meteor Method to save data to Links collection securely
Meteor.methods({
	'links.insert': function(url){
		console.log("Trying to save "+url+" to collection");
		check(url, Match.Where(url => validUrl.isUri(url)));

		//if check succeeds, ready to generate token then save it and url to collection in db
		const token = Math.random().toString(36).slice(-5);
		Links.insert({url: url, token: token, clicks: 0});
	}
})

//export it
export const Links = new Mongo.Collection('links');