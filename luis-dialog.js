var builder = require('botbuilder');
var events = require('./events');

var dialog = new builder.LuisDialog(process.env.luisUrl || 'https://api.projectoxford.ai/luis/v1/application?id=SECRET');

dialog.on('event_time', [
    (session, args, next) => {
        var eventEntity = builder.EntityRecognizer.findEntity(args.entities, 'event');
        if (eventEntity) {
            var event = getMatchingEvent(eventEntity.entity);
            if (event) {
                return next({ response: { entity: event } });
            }
        } else if (session.userData.lastEvent) {
            return next({ response: { entity: session.userData.lastEvent } });
        }
        builder.Prompts.choice(session, 'I don\'t understand. Are you talking about:', events.items);
    },
    (session, results, next) => {
        var event = events.items[results.response.entity];
        session.userData.lastEvent = results.response.entity;
        session.send(`${event.name} is at ${event.start}`);
    }
]);

dialog.on('event_location', [
    (session, args, next) => {
        var eventEntity = builder.EntityRecognizer.findEntity(args.entities, 'event');
        if (eventEntity) {
            var event = getMatchingEvent(eventEntity.entity);
            if (event) {
                return next({ response: { entity: event } });
            }
        } else if (session.userData.lastEvent) {
            return next({ response: { entity: session.userData.lastEvent } });
        }
        builder.Prompts.choice(session, 'I don\'t understand. Are you talking about:', events.items);
    },
    (session, results, next) => {
        var event = events.items[results.response.entity];
        session.userData.lastEvent = results.response.entity;
        session.send(`${event.name} is at ${event.location}`);
    }
]);

dialog.on('tell_me_about_conf', builder.DialogAction.send(`The 5th annual Polyglot Unconference is an event that encourages software developers and operators from different backgrounds, stacks and oppinons to come together for a day of spontaneous sharing, teaching and learning.

It starts at 8am on Saturday, May 28, 2016.`));

dialog.on('hello', builder.DialogAction.send('Hey there'));

dialog.onDefault(builder.DialogAction.send('no match'));

function getMatchingEvent(value) {
    var entity = builder.EntityRecognizer.findBestMatch(events.synonyms, value);
    if (entity) {
        return events.synonyms[entity.entity];
    }
}

module.exports = dialog;

