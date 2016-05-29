var restify = require('restify');
var builder = require('botbuilder');

var dialog = require('./luis-dialog');

var bot = new builder.BotConnectorBot({
    appId: process.env.appId || 'YourAppId', 
    appSecret: process.env.appSecret || 'YourAppSecret' 
});
bot.add('/', dialog);

var server = restify.createServer();
server.post('/v1/messages', bot.verifyBotFramework(), bot.listen());

server.get('/', restify.serveStatic({
    directory: 'static',
    file: 'index.html'
}))

server.listen(process.env.port || 8080, function () {
   console.log('%s listening to %s', server.name, server.url); 
});

