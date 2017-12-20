/**
 * Copyright 2017 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
 
'use strict';


console.log('11111111111');

/*
const apiai = require('apiai');
const express = require('express');
const bodyParser = require('body-parser');

const SkypeBot = require('./skypebot');
const SkypeBotConfig = require('./skypebotconfig');

const REST_PORT = (process.env.PORT || 5000);

const botConfig = new SkypeBotConfig(
    process.env.APIAI_ACCESS_TOKEN,
    process.env.APIAI_LANG,
    process.env.APP_ID,
    process.env.APP_SECRET
);

const skypeBot = new SkypeBot(botConfig);



// console timestamps
require('console-stamp')(console, 'yyyy.mm.dd HH:MM:ss.l');

const app = express();
app.use(bodyParser.json());

app.post('/chat', skypeBot.botService.listen());

app.listen(REST_PORT, function () {
    console.log('Rest service ready on port ' + REST_PORT);
}); */

var restify = require('restify');
var builder = require('botbuilder');
var apiairecognizer = require('api-ai-recognizer');
var ignoreCase = require('ignore-case');
var HashMap = require('hashmap');
var map = new HashMap();



// Setup Restify Server
var server = restify.createServer(); //3978 -default port


// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: '1c9a8a8a-1c7a-4cfa-aa5f-c70a41304da8', //ee2fdc4d-7cf2-475b-8619-dc76e4f6f211
    appPassword: 'ahizAC17!vttMAYKH615*!$'  //rDLIBN7311[akjefyMB5)@{
});

// Listen for messages from users 
server.post('/chat', connector.listen());
//server.post('/chatbot', connector.listen());
//server.post('/', connector.listen());

var bot = new builder.UniversalBot(connector);

var recognizer = new apiairecognizer("63b8f1eb608f4e0ab4e8be8e436aac9e");

var intents = new builder.IntentDialog({
    recognizers: [
        recognizer
    ],
    intentThreshold: 0.2,
    recognizeOrder: builder.RecognizeOrder.series

});

console.log('-----CLEMENT-----> intents: ', intents);


console.log('\n\n\n');

bot.dialog('/',intents);



intents.matches('Default Welcome Intent',function(session, args){
	console.log('-----RAMA-----> intents: ', intents);
    console.log(' -----> Previous Intent: ',map.get("prev_intent"));
    console.log(' -----> Previous Input: ',map.get("prev_input"));
    console.log('----> session.message.text: ',session.message.text);


    session.sendTyping();  

   //if ( typeof map.get("prev_intent") === 'undefined' &&  typeof map.get("prev_input") === 'undefined') {
         
            
        var cards = [];
        var card = new builder.HeroCard(session)
        
       // .images([
         //   builder.CardImage.create(session, 'http://www.world-mirror.com/wp-content/uploads/2017/12/chat-on.jpg')
       // ])
        .title("Hello, I am Liz, a virtual agent for IT related services. \n")
        .subtitle('At the moment, I can help you to fix your problems related to laptop and desktop and can create a ticket if needed. For all other queries, you may want to call the IT helpdesk toll free number 1-800-123-4567.')
        .text("How can I help you now ?")

        cards.push(card);

        var reply = new builder.Message(session)
        .attachmentLayout(builder.AttachmentLayout.carousel)
        .attachments(cards); 

      
        session.send(reply);

    //}  else {
        
        //session.send('Please begin your conversation with " Hi / Hello " ');
    //}   
   
    // set current intent as previous intent for future conversation.
    map.set("prev_intent", args.intent);
    map.set("prev_input", session.message.text);
});


intents.matches('Default Fallback Intent',function(session, args){
   console.log(' -----> Previous Intent: ',map.get("prev_intent"));
   console.log(' -----> Previous Input: ',map.get("prev_input"));
   console.log('----> session.message.text: ',session.message.text);

   session.sendTyping();  

   if ( typeof map.get("prev_input") !== 'undefined' && map.get("prev_input")) {
         
            var fulfillment = builder.EntityRecognizer.findEntity(args.entities, 'fulfillment');
            console.log('----> fulfillment: ',fulfillment);
            if (fulfillment && fulfillment.entity != ''){
                var speech = fulfillment.entity;
                session.send(speech);
            } else {
                session.send('Sorry...Could you say that again ?'); 
            }

    }  else {
        
        //session.send('Please begin your conversation, saying " Hi / Hello " ');
        session.send("Please ask anything relevant to IT helpdesk. "); 
    }   
       
    
    // set current intent as previous intent for future conversation.
    map.set("prev_intent", args.intent);
    map.set("prev_input", session.message.text);
           
      
      
});

//Can you please specify if the problem is with a PC (desktop, laptop etc.) ?

intents.matches('Generic problem with PC',function(session, args){
    console.log(' -----> Previous Intent: ',map.get("prev_intent"));
    console.log(' -----> Previous Input: ',map.get("prev_input"));
    console.log('----> session.message.text: ',session.message.text);
    
    session.sendTyping();  

     if ( typeof map.get("prev_input") !== 'undefined' && map.get("prev_input")) {
         
         session.send("Can you please be specific about the problem so that I can create the ticket ?" );

    }  else {

        session.send('Please begin your conversation, saying " Hi / Hello " ');
    }   
     

    // set current intent as previous intent for future conversation.
        map.set("prev_intent", args.intent);
        map.set("prev_input", session.message.text);
});


//Can you please specify if it's a PC (desktop, laptop etc.)?

intents.matches('Specific problem with PC',function(session, args){
   console.log(' -----> Previous Intent: ',map.get("prev_intent"));
   console.log(' -----> Previous Input: ',map.get("prev_input"));
   console.log('----> session.message.text: ',session.message.text);
    
   session.sendTyping(); 

     if ( typeof map.get("prev_input") !== 'undefined' && map.get("prev_input")) {
           
            var entityIndex = session.message.text.toLowerCase();       

            if(entityIndex.indexOf("desktop") >= 0 || entityIndex.indexOf("laptop") >= 0 || entityIndex.indexOf("desk top") >= 0 
                || entityIndex.indexOf("notebook") >= 0 || entityIndex.indexOf("note book") >= 0 || entityIndex.indexOf("laptab") >= 0 || entityIndex.indexOf("lap tab") >= 0 
                || entityIndex.indexOf("lap top") >= 0 || entityIndex.indexOf("mac") >= 0 || entityIndex.indexOf("all-in-one") >= 0   || entityIndex.indexOf("all in one") >= 0 ){ 

                session.send("Got it. Can you please specify your asset name/id to create a trouble ticket?" );

            } else if(entityIndex.indexOf("system") >= 0 || entityIndex.indexOf("pc") >= 0 || entityIndex.indexOf("machine") >= 0 
                || entityIndex.indexOf("computer") >= 0 || entityIndex.indexOf("server") >= 0 || entityIndex.indexOf("workstation") >= 0 ){ 
                //console.log('');
                 session.send("Can you please be specific about the problem so that I can create the ticket?" );
            } else {
                session.send("Can you please specify the type (desktop, laptop, etc.) if it's a PC ?" );
            }

    }  else {
            session.send('Please begin your conversation, saying " Hi / Hello " ');
    }   

    
      // set current intent as previous intent for future conversation.
        map.set("prev_intent", args.intent);
        map.set("prev_input", session.message.text);
});


intents.matches('Yes Computer Issue',function(session, args){
    console.log(' -----> Previous Intent: ',map.get("prev_intent"));
    console.log(' -----> Previous Input: ',map.get("prev_input"));
    console.log('----> session.message.text: ',session.message.text);
    
    session.sendTyping();

    if ( typeof map.get("prev_input") !== 'undefined' && map.get("prev_input")) {
            console.log(' -----> machine: ',session.message.text.toLowerCase().indexOf("machine"));
            if(session.message.text.toLowerCase().indexOf("desktop") >= 0 || session.message.text.toLowerCase().indexOf("desk top") >= 0 
                || session.message.text.toLowerCase().indexOf("laptop") >= 0 || session.message.text.toLowerCase().indexOf("lap top") >= 0
                || session.message.text.toLowerCase().indexOf("mac") >= 0 || session.message.text.toLowerCase().indexOf("all-in-one") >= 0  
                || session.message.text.toLowerCase().indexOf("all in one") >= 0 ){
                    console.log(" -----> 1111");
                    session.send("Got it. Can you please specify your asset name/id to create a trouble ticket?" );

            } else {
                console.log(" -----> 2222");
                 session.send("Please specify the type (desktop, laptop, etc.) if it's a PC ?" );
            }

    } else {
           session.send('Please begin your conversation, saying " Hi / Hello " ');
    }   
    
    // set current intent as previous intent for future conversation.
    map.set("prev_intent", args.intent);
    map.set("prev_input", session.message.text);
});  

intents.matches('Irrelevant Questions',function(session, args){
   console.log(' -----> Previous Intent: ',map.get("prev_intent"));
   console.log(' -----> Previous Input: ',map.get("prev_input"));
   console.log('----> session.message.text: ',session.message.text);

   session.sendTyping();

    session.send('Please ask relevant to IT helpdesk. ');
    // set current intent as previous intent for future conversation.
    map.set("prev_intent", args.intent);
    map.set("prev_input", session.message.text);
});  


intents.matches('No Computer Issue',function(session, args){
   console.log(' -----> Previous Intent: ',map.get("prev_intent"));
   console.log(' -----> Previous Input: ',map.get("prev_input"));
   console.log('----> session.message.text: ',session.message.text);

   session.sendTyping();

    if ( typeof map.get("prev_input") !== 'undefined' && map.get("prev_input")) {
        
        session.send("Sorry, i can help you on Computer related issues only.." );
    } else {
            session.send('Please begin your conversation, saying " Hi / Hello " ');
    }   
    // set current intent as previous intent for future conversation.
    map.set("prev_intent", args.intent);
    map.set("prev_input", session.message.text);
});  



intents.matches('Do Not Know Computer Id',function(session, args){
    console.log(' -----> Previous Intent: ',map.get("prev_intent"));
    console.log(' -----> Previous Input: ',map.get("prev_input"));
    console.log('----> session.message.text: ',session.message.text);

     session.sendTyping();
        
        if ( typeof map.get("prev_input") !== 'undefined' && map.get("prev_input")) {
           
            //session.send("Is the Computer (Laptop, Desktop, etc...) officially assigned to you ?");
            //session.send(" or ");
            //session.send("You are using some other's one ?");

            var cards = [];
            var card = new builder.HeroCard(session)
            .title("Is the Computer (Laptop, Desktop, etc...) officially assigned to you ?")
            //.text("Is the Computer (Laptop, Desktop, etc...) officially assigned to you ?")
            .subtitle('(or)')
            .text("You are using some other's one ?")

            cards.push(card);

            var reply = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments(cards); 

        
            session.send(reply);
             
        } else {
            session.send('Please begin your conversation, saying " Hi / Hello " ');
        }   
         // set current intent as previous intent for future conversation.
        map.set("prev_intent", args.intent);
        map.set("prev_input", session.message.text);
});  



intents.matches('Get N Validate Asset Id',function(session, args){
    console.log(' -----> Previous Intent: ',map.get("prev_intent"));
    console.log(' -----> Previous Input: ',map.get("prev_input"));
    console.log('----> session.message.text: ',session.message.text);

    session.sendTyping();
     
    if ( typeof map.get("prev_input") !== 'undefined' && map.get("prev_input")) {
    
        var mysql = require('mysql');

            var connection = mysql.createConnection({
                host: '192.168.61.162', //192.168.61.155 , localhost
                port: '3306',
                user: 'root',
                password: 'root',
                database: 'helpdesk'
            });


        console.log('----> session.message.text: ',session.message.text);  
        var entityIndex = session.message.text.toLowerCase();       
        if(entityIndex.indexOf("ram-lp") >= 0 || entityIndex.indexOf("ram-comp") >= 0){ // check user-name and ends with '-lp'

                session.send(" Let me check the Asset ID….");
                session.sendTyping();
                console.log('\n\n');
               
                var selQuery = "select count(*) count from asset where asset_name = ? and assigned_to = 'java-ramanathan'";
                 connection.connect();
                if(connection != null){
                        connection.query(selQuery, ['ram-lp'], function (err, result) {
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
                
                var strTokens = session.message.text.toLowerCase().split(" ");
                console.log(' strTokens: ',strTokens);

                strTokens.forEach(function(element) {
                    console.log(' element: ',element);
                    if(element != '' && (element.indexOf("ram-lp") >= 0 || element.indexOf("ram-comp") >= 0)){
                         
                            connection.connect();

                            var selQuery = "select count(*) count from asset where asset_name = ? and assigned_to = 'java-ramanathan'";
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
                                session.send("Oops..! It seems the given Asset ID is invalid.");
                            }
                }, this);
        }
    }  else {
            session.send('Please begin your conversation, saying " Hi / Hello " ');
    }   
      // set current intent as previous intent for future conversation.
    map.set("prev_intent", args.intent);
    map.set("prev_input", session.message.text);
});


intents.matches("It's My PC",function(session, args){
    console.log(' -----> Previous Intent: ',map.get("prev_intent"));
    console.log(' -----> Previous Input: ',map.get("prev_input"));
    console.log('----> session.message.text: ',session.message.text);

       session.sendTyping(); 

      if (  typeof map.get("prev_input") !== 'undefined' && map.get("prev_input")) {
           
               
           if(typeof map.get("prev_intent") !== 'undefined' && map.get("prev_intent") && map.get("prev_intent") == 'Specific problem with PC' ){
               
                session.send("Please specify the type (desktop, laptop, etc.) if it's a PC ?" );
           } else {
                  
               
                    session.send("Let me explore....");

                    setTimeout(function () {
                                //session.send("OK, I could identify your PC from our database. It's liz-lp. Can you please elaborate the problem you are facing?.");
                                session.send("OK, I could identify your PC from our database. It's ram-lp.");
                    }, 6000);

                    setTimeout(function () {
                                //session.send("OK, I could identify your PC from our database. It's liz-lp. Can you please elaborate the problem you are facing?.");
                                session.send("Thank you, I have created a ticket for you. The ticket id is HD003456. Someone from IT department will attend your problem within 24 hours.");
                    }, 9000);
            }

    }  else {
            session.send('Please begin your conversation, saying " Hi / Hello " ');
    }   

    // set current intent as previous intent for future conversation.
    map.set("prev_intent", args.intent);
    map.set("prev_input", session.message.text);
   
});

intents.matches("It's Not My PC, But Got for Testing",function(session, args){
    console.log(' -----> Previous Intent: ',map.get("prev_intent"));
    console.log(' -----> Previous Input: ',map.get("prev_input"));
     console.log('----> session.message.text: ',session.message.text);
    
        session.sendTyping();

        if ( typeof map.get("prev_input") !== 'undefined' && map.get("prev_input")) {
               
            session.send("I am afraid I cannot find the Asset ID. Can you please figure out yourself and then come back to me?");

         }  else {
            session.send('Please begin your conversation, saying " Hi / Hello " ');
        }   
        // set current intent as previous intent for future conversation.
        map.set("prev_intent", args.intent);
        map.set("prev_input", session.message.text);
   
});



intents.matches("I Can Figure Out The Testing Asset Id",function(session, args){
    console.log(' -----> Previous Intent: ',map.get("prev_intent"));
    console.log(' -----> Previous Input: ',map.get("prev_input"));
    console.log('----> session.message.text: ',session.message.text);
     
        session.sendTyping();
        
        if ( typeof map.get("prev_input") !== 'undefined' && map.get("prev_input")) {
               
            session.send("Thanks, waiting for you !");

         }  else {
            session.send('Please begin your conversation, saying  " Hi / Hello " ');
        }   

        
        // set current intent as previous intent for future conversation.
        map.set("prev_intent", args.intent);
        map.set("prev_input", session.message.text);
   
});


intents.matches("I Cannot Figure Out The Testing Asset Id",function(session, args){
      
        console.log(' -----> Previous Intent: ',map.get("prev_intent"));
        console.log(' -----> Previous Input: ',map.get("prev_input"));
        console.log('----> session.message.text: ',session.message.text);


        session.sendTyping();
        
        if ( typeof map.get("prev_input") !== 'undefined' && map.get("prev_input")) {
               
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

         }  else {
            session.send('Please begin your conversation, saying " Hi / Hello " ');
        }   

       
        // set current intent as previous intent for future conversation.
        map.set("prev_intent", args.intent);
        map.set("prev_input", session.message.text);
   
});



// Enabling SMALL TALK

intents.onDefault(function(session, args){
    
    
    console.log(' -----> Previous Intent: ',map.get("prev_intent"));
    console.log(' -----> Previous Input: ',map.get("prev_input"));
    console.log('----> session.message.text: ',session.message.text);

        session.sendTyping();

    if ( typeof map.get("prev_intent") !== 'undefined' && map.get("prev_intent")  
                && (map.get("prev_intent") == 'Get N Validate Asset Id' || map.get("prev_intent") == 'Yes Computer Issue')) {
        
                session.send('Asset ID is invalid. Please try again with the proper one.');

        } else {
                
                var fulfillment = builder.EntityRecognizer.findEntity(args.entities, 'fulfillment'); 
                 console.log('fulfillment: ',fulfillment);

                if (fulfillment && fulfillment.entity != ''){
                    var speech = fulfillment.entity; 
                    console.log('speech: ',speech);
                    session.send(speech); 
                } else { 
                    session.send("Sorry...I couldn't understand, please ask anything relevant to IT helpdesk. "); 
                }
        }

        // set current intent as previous intent for future conversation.
        map.set("prev_intent", args.intent);
        map.set("prev_input", session.message.text);
}); 

server.listen(process.env.port || process.env.PORT || 7070, function () { //6060
   console.log('%s listening to %s', server.name, server.url); 
 
});

console.log('22222222222');