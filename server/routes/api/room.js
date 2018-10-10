const Room = require('../../models/Room');

module.exports = (app) => {

	app.post('/api/createRoom', function (req, res, next) {
	  let {body} = req;
	  let {roomName} = body;
	  let {email} = body;

	  if (!roomName) {
	    return res.send({
	      success: false,
	      message: 'Error: roomName cannot be blank.'
	    });
	  }
	  if (!email) {
	    return res.send({
	      success: false,
	      message: 'Error: Email cannot be blank.'
	    });
	  }
	  email = email.toLowerCase();
	  email = email.trim();


	  Room.find({
	    roomName: roomName
	  }, (err, records) => {
	    if (err) {
	      return res.send({
	        success: false,
	        message: 'Error: Server error'
	      });
	    } else if (records.length > 0) {
	      return res.send({
	        success: false,
	        message: 'Error: Room already exists.'
	      });
	    }

	    // Save the new room
	    const newRoom = new Room();

	    newRoom.roomName = roomName;
	    newRoom.email = email;
	    newRoom.save((err, doc) => {
	      if (err) {
	        return res.send({
	          success: false,
	          message: 'Error: Server error'
	        });
	      }
	      return res.send({
	        success: true,
	        message: 'Successfully created room and joined the user in room',
	        roomName: doc.roomName,
	        email: doc.email
	      });
	    });
	  });

	});

	app.post('/api/joinRoom', function (req, res, next) {
	  let {body} = req;
	  let {roomName} = body;
	  let {email} = body;

	  if (!roomName) {
	    return res.send({
	      success: false,
	      message: 'Error: roomName cannot be blank.'
	    });
	  }
	  if (!email) {
	    return res.send({
	      success: false,
	      message: 'Error: Email cannot be blank.'
	    });
	  }
	  email = email.toLowerCase();
	  email = email.trim();


	  Room.find({
	    roomName: roomName
	  }, (err, records) => {
	    if (err) {
	      return res.send({
	        success: false,
	        message: 'Error: Server error'
	      });
	    } else if (records.length == 0) {
	      return res.send({
	        success: false,
	        message: 'Error: Room doesnt exist.'
	      });
	    }
	    const newRoom = new Room();

	    newRoom.roomName = roomName;
	    newRoom.email = email;
	    newRoom.save((err, doc) => {
	      if (err) {
	        return res.send({
	          success: false,
	          message: 'Error: Server error'
	        });
	      }
	      return res.send({
	        success: true,
	        message: 'Successfully joined the user in room',
	        roomName: doc.roomName,
	        email: doc.email
	      });
	    });
	  });

	});

};
