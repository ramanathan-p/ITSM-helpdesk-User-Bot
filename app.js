var restify = require('restify');
var builder = require('botbuilder');
var apiairecognizer = require('api-ai-recognizer');
var ignoreCase = require('ignore-case');

// Setup Restify Server
var server = restify.createServer(); //3978 -default port
server.listen(process.env.port || process.env.PORT || 7070, function () { //6060
   console.log('%s listening to %s', server.name, server.url); 
});

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: '1c9a8a8a-1c7a-4cfa-aa5f-c70a41304da8', //ee2fdc4d-7cf2-475b-8619-dc76e4f6f211
    appPassword: 'ahizAC17!vttMAYKH615*!$'  //rDLIBN7311[akjefyMB5)@{
});

// Listen for messages from users 
//server.post('/api/messages', connector.listen());
server.post('/chatbot', connector.listen());

var bot = new builder.UniversalBot(connector);

var recognizer = new apiairecognizer("63b8f1eb608f4e0ab4e8be8e436aac9e");

var intents = new builder.IntentDialog({
    recognizers: [
        recognizer
    ],
    intentThreshold: 0.2,
    recognizeOrder: builder.RecognizeOrder.series

});



console.log('\n\n\n');

bot.dialog('/',intents);



intents.matches('Default Welcome Intent',function(session, args){
    console.log('\n\n');
    
    
    var fulfillment = builder.EntityRecognizer.findEntity(args.entities, 'fulfillment');
   // console.log('fulfillment: ',fulfillment);


    if (fulfillment){
        var speech = fulfillment.entity;
       
        session.sendTyping();

        console.log('----> session.message.text: ',session.message.text);
               
            session.send(speech);
           
    } else {
        session.send('Sorry...could you say that again.?');
    }
});


intents.matches('Default Fallback Intent',function(session, args){
    console.log('\n\n');
    
    console.log('--1--> args.intent: ', args.intent);
    
    var fulfillment = builder.EntityRecognizer.findEntity(args.entities, 'fulfillment');
    console.log('fulfillment: ',fulfillment);

   // var smallTalk = builder.EntityRecognizer.findEntity(args.entities, 'small talk');
   // console.log('smallTalk: ',smallTalk);

    if (fulfillment){
        var speech = fulfillment.entity;
       
        session.sendTyping();

        console.log('----> session.message.text: ',session.message.text);
        var entityIndex = session.message.text.toLowerCase();
        //if(entityIndex.indexOf("liz-lp") >= 0){

       // } else {
       
            session.send(speech);
      // }
      
    } else {
        session.send('Sorry...could you say that again.?');
    }
});


intents.matches('Generic problem with PC',function(session, args){
    console.log('\n\n');
    
    console.log('--1--> args.intent: ', args.intent);
    
    var fulfillment = builder.EntityRecognizer.findEntity(args.entities, 'fulfillment');
    console.log('fulfillment: ',fulfillment);


    if (fulfillment){
        var speech = fulfillment.entity;
       
        session.sendTyping();

        console.log('----> session.message.text: ',session.message.text);
               
            session.send(speech);
           
    } else {
        session.send('Sorry...could you say that again.?');
    }
});

/*
intents.matches('PC name',function(session, args){
    console.log('\n\n');
    console.log('args: ',args);
    console.log('--1--> args.intent: ', args.intent);
    
    var fulfillment = builder.EntityRecognizer.findEntity(args.entities, 'fulfillment');

    var fulfillment = builder.EntityRecognizer.findEntity(args.entities, 'fulfillment');
    console.log('fulfillment: ',fulfillment);


    if (fulfillment){
        var speech = fulfillment.entity;
       
        session.sendTyping();

        console.log('----> session.message.text: ',session.message.text);
               
            session.send(speech);
           
    } else {
        session.send('Sorry...could you say that again.?');
    }
}); */

intents.matches('Specific problem with PC',function(session, args){
    console.log('\n\n');
    console.log('args: ',args);
    console.log('--1--> args.intent: ', args.intent);
    
    console.log('-----> args.intent.result: ',args.intent.result);
    
    var fulfillment = builder.EntityRecognizer.findEntity(args.entities, 'fulfillment');
    console.log('fulfillment: ',fulfillment);

    /*
    bot.recognize("specfic_pc_problem_obtained11111", function(err, result) {
     console.log('\n\n');
      console.log('----> specfic_pc_problem_obtained');
      console.log('----> err',err);
      console.log('----> result',result);
    }); */

    if (fulfillment){
        var speech = fulfillment.entity;
       
        session.sendTyping();

        console.log('----> session.message.text: ',session.message.text);
               
            session.send(speech);
           
    } else {
        session.send('Sorry...could you say that again.?');
    }
});


intents.matches('Yes Computer Issue',function(session, args){
    console.log('\n\n');
    console.log('----> args: ',args);
    console.log('--1--> args.intent: ', args.intent);
    
    var fulfillment = builder.EntityRecognizer.findEntity(args.entities, 'fulfillment');
    console.log('fulfillment: ',fulfillment);
    if (fulfillment){
        var entity = fulfillment.entity;
       
        session.sendTyping();

//        session.send("Do you know your PC name ?");
          session.send("Can you please specify your asset name/id to create a trouble ticket ? " );
        
        
        //session.send("Please explain your issue in detail.");
      // session.send(card);
      
      
      /*
      setTimeout(function () {
          session.send("Hello, are you there...?");
      }, 120000); */

    } else {
        session.send('Sorry...could you say that again.?');
    }
});


intents.matches('No Computer Issue',function(session, args){
    console.log('\n\n');
    console.log('----> args: ',args);
    console.log('--1--> args.intent: ', args.intent);
    
    var fulfillment = builder.EntityRecognizer.findEntity(args.entities, 'fulfillment');
    console.log('fulfillment: ',fulfillment);
    if (fulfillment){
        var entity = fulfillment.entity;
       
        session.sendTyping();
        
        session.send("Sorry, i can help you on Computer related issues only..");
      // session.send(card);
      
      
      /*
      setTimeout(function () {
          session.send("Hello, are you there...?  please respond....");
      }, 120000); */

    } else {
        session.send('Sorry...could you say that again.?');
    }
});  



intents.matches('Do Not Know Computer Id',function(session, args){
        console.log('\n\n');
        console.log('args: ',args);
        console.log('--1--> args.intent: ', args.intent);
        session.sendTyping();
        console.log('----> session.message.text: ',session.message.text);
        session.send("Is the Computer (Laptop, Desktop and so on..) officially assigned to you or your are using some other's one?");
});  






intents.matches('Get N Validate Asset Id',function(session, args){
    console.log('\n\n');
    console.log('----> args: ',args);
    console.log('--1--> args.intent: ', args.intent);
    console.log('----> args.entities: ',args.entities);
    console.log('--2--> entities: ', session.message.entities);
    console.log('--3--> address: ', session.message.address);
    
    
    var fulfillment = builder.EntityRecognizer.findEntity(args.entities, 'fulfillment');
    console.log('fulfillment: ',fulfillment);
    
        session.sendTyping();

        var mysql = require('mysql');

            var connection = mysql.createConnection({
                host: 'localhost', //192.168.61.155
                port: '3306',
                user: 'root',
                password: 'Abe0101$',
                database: 'helpdesk'
            });


        console.log('----> session.message.text: ',session.message.text);  
        var entityIndex = session.message.text.toLowerCase();       
        if(entityIndex.indexOf("liz-lp") >= 0 || entityIndex.indexOf("liz-comp") >= 0){ // check user-name and ends with '-lp'

                session.send(" Let me check the Asset ID….");
                session.sendTyping();
                console.log('\n\n');
               
                var selQuery = "select count(*) count from hd_assets where asset_name = ? and assigned_to = 'liz@congruentindia.com'";
                 connection.connect();
                if(connection != null){
                        connection.query(selQuery, ['liz-lp'], function (err, result) {
                                console.log(" ------- Asset name is found @ DB -------- ");
                                console.log(' err: ', err);
                                 console.log(' selQuery result: ', result);
                                 
                                 var stringCount = JSON.stringify(result);
                                 console.log(' stringCount: ', stringCount);
                                 var json =  JSON.parse(stringCount);
                                 console.log(' json: ', json);
                                 console.log(' json.count: ', json[0].count);

                                console.log(' Closing the DB connection ........ !');
                                connection.end();

                                if(json[0].count == 1){
                                        setTimeout(function () {
                                            session.send("OK, I am able to figure out the Asset ID in our asset list.");
                                        }, 6000);
                                        /*
                                        setTimeout(function () {
                                            session.send("Can you please elaborate the problem you are facing?");
                                        }, 10000);
                                        */
                                        setTimeout(function () {
                                                    //session.send("OK, I could identify your PC from our database. It's liz-lp. Can you please elaborate the problem you are facing?.");
                                                    session.send("Thank you, I have created a ticket for you. The ticket id is HD003456. Someone from IT department will attend your problem within 24 hours.");
                                        }, 9000);       
                                } else {
                                        session.send(" Asset id is not found in our asset list.... Please check again.");
                                }
                        });
                    } 


        } else {
            //session.send(' Please enter valid laptop id.');
                session.send(" Let me check the Asset ID in our database….");
                session.sendTyping();
                console.log('\n\n');

                var strTokens = session.message.text.split(" ");
                console.log(' strTokens: ',strTokens);

                strTokens.forEach(function(element) {
                    console.log(' element: ',element);
                    if(element != '' && (element.indexOf("liz-lp") || element.indexOf("liz-comp") >= 0)){
                         
                            connection.connect();

                            var selQuery = "select count(*) count from hd_assets where asset_name = ? and assigned_to = 'liz@congruentindia.com'";
                            if(connection != null){
                                    connection.query(selQuery, [element], function (err, result) {
                                            console.log(" ------- Asset name is found @ DB -------- ");
                                            console.log(' err: ', err);
                                            console.log(' selQuery result: ', result);
                                            
                                            var stringCount = JSON.stringify(result);
                                            console.log(' stringCount: ', stringCount);
                                            var json =  JSON.parse(stringCount);
                                            console.log(' json: ', json);
                                            console.log(' json.count: ', json[0].count);

                                            console.log(' Closing the DB connection ........ !');
                                            connection.end();

                                            if(json[0].count == 1){
                                                    setTimeout(function () {
                                                        session.send("OK, I am able to figure out the Asset ID in our asset list.");
                                                    }, 6000);
                                                    /*
                                                    setTimeout(function () {
                                                        session.send("Can you please elaborate the problem you are facing?");
                                                    }, 10000); */

                                                    setTimeout(function () {
                                                                //session.send("OK, I could identify your PC from our database. It's liz-lp. Can you please elaborate the problem you are facing?.");
                                                                session.send("Thank you, I have created a ticket for you. The ticket id is HD003456. Someone from IT department will attend your problem within 24 hours.");
                                                    }, 9000);

                                            } else {
                                                    session.send("Hmm…  It seems the given Asset ID is not in the asset list. Can you please check once again?.");
                                            }
                                    });
                                } 
                            } else {
                                session.send("Oops..! It seems the given Asset ID is in invalid format.");
                            }
                }, this);
        }
   
});


intents.matches("It's My PC",function(session, args){
    console.log('\n\n');
    console.log('----> args: ',args);
    console.log('--1--> args.intent: ', args.intent);
    
        session.sendTyping();

        console.log('----> session.message.text: ',session.message.text);

        
               
        session.send("Let me explore....");

        setTimeout(function () {
                    //session.send("OK, I could identify your PC from our database. It's liz-lp. Can you please elaborate the problem you are facing?.");
                    session.send("OK, I could identify your PC from our database. It's liz-lp.");
        }, 6000);

        setTimeout(function () {
                    //session.send("OK, I could identify your PC from our database. It's liz-lp. Can you please elaborate the problem you are facing?.");
                    session.send("Thank you, I have created a ticket for you. The ticket id is HD003456. Someone from IT department will attend your problem within 24 hours.");
        }, 9000);
   
});

intents.matches("It's Not My PC, But Got for Testing",function(session, args){
    console.log('\n\n');
    console.log('----> args: ',args);
    console.log('--1--> args.intent: ', args.intent);
    
        session.sendTyping();

        console.log('----> session.message.text: ',session.message.text);
               
        session.send("I am afraid I cannot find the Asset ID. Can you please figure out yourself and then come back to me?");
   
});



intents.matches("I Can Figure Out The Testing Asset Id",function(session, args){
    console.log('\n\n');
    console.log('----> args: ',args);
    console.log('--1--> args.intent: ', args.intent);
    
        session.sendTyping();

        console.log('----> session.message.text: ',session.message.text);
               
        session.send("Thanks, waiting for you !");
   
});


intents.matches("I Cannot Figure Out The Testing Asset Id",function(session, args){
    console.log('\n\n');
    console.log('----> args: ',args);
    console.log('--1--> args.intent: ', args.intent);
    
        session.sendTyping();

        console.log('----> session.message.text: ',session.message.text);
               
        var cards = [];
        var card = new builder.HeroCard(session)
        .title("Sorry for the inconvenience.")
        .subtitle('However, I will escalate the issue to a human service executive that will contact you as soon as possible.')
        .text("In case this is very urgent, you may call our toll free number +1-800-123-4567 and follow the voice menu options to reach out to our call center executive. Good day!")

        cards.push(card);

        var reply = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(cards);

        session.send(reply);
   
});



// Enabling SMALL TALK

intents.onDefault(function(session, args){
    var fulfillment = builder.EntityRecognizer.findEntity(args.entities, 'fulfillment'); 
		if (fulfillment){ 
			var speech = fulfillment.entity; 
             console.log('speech: ',speech);
			session.send(speech); 
		} else { 
            session.send('Sorry...not sure how to respond to that'); 
	    }
}); 