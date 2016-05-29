var builder = require('botbuilder');
var dialog = require('./luis-dialog');

var textBot = new builder.TextBot();

textBot.add('/', dialog);

textBot.listenStdin();