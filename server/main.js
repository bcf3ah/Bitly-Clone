//import dependencies
import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
import {WebApp} from 'meteor/webapp';
import ConnectRoute from 'connect-route';

Meteor.startup(() => {
  Meteor.publish('links', function(){
	return Links.find({});
  });
});

//helper function for whenever someone visits localhost:3000/xxxxx
function onRoute(req, res, next){
	//extract the token and find the matching link in the links collection
	const link = Links.findOne({token: req.params.token});
	//if we find the correct link, redirect them to the long url
	if (link) {
		//update clicks in collection
		Links.update(link, {$inc: {clicks: 1}});
		res.writeHead(307, {'Location': link.url});
		res.end();
	} else {
	//if no match, send them back to React app
		next();	
	}
	
}

//Create middleware
const middleware = ConnectRoute(function(router){
	router.get('/:token', onRoute);
});


//Handle middleware in routes
WebApp.connectHandlers.use(middleware);