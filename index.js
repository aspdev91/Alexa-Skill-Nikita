/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

var Alexa = require('alexa-sdk');
var request = require('superagent');
var getLatestTrainTimes = require('mta.js');
// var AWS = require('aws-sdk');

var APP_ID = 'amzn1.ask.skill.ed442aba-79c5-456b-b663-90edbbcf2efe';  // TODO replace with your app ID (OPTIONAL).

var handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'CallNikita': function () {
        this.emit('GetFact');
    },
    'Unhandled': function () {
        this.emit(':ask', "I couldn't process that");
    },
    'news': function () {

        request.get('https://awesomo.top/nikita?command=news+on+techcrunch')
            .end((err, res) => {
                if (err) {
                    console.log("There's been an error.")
                    console.log(err)
                };
                console.log(res)
                var newsSource = res.body.result.source;
                var articles = res.body.result.articles
                this.emit(':tellWithCard', "According to Nikita, " + readNews(articles, newsSource));
            })

        function readNews(articles, newsSource) {
            var allArticles = 'This is whats happening on ' + newsSource + ' . . . .';
            var count = 0
            for (var article of articles) {
                if (count >= 3) {
                    break
                }
                allArticles += article.title;
                allArticles += '.   .   .   .   .'
                allArticles += article.description;
                allArticles += ' next up . . .'
                count += 1
            }

            return allArticles
        }
    },
    'weather': function () {

        request.get('https://awesomo.top/nikita?command=weather+in+new+york')
            .end((err, res) => {
                if (err) {
                    console.log("There's been an error.")
                    console.log(err)
                };
                this.emit(':tellWithCard', "According to Nikita, " + res.body.result);
            })

    },
    'train': function () {

        request.get('http://mtaapi.herokuapp.com/api?id=G18S')
            .end((err, res, body) => {
                if (err) {
                    console.log("There's been an error.")
                    console.log(err)
                };
                var trainSchedule = getLatestTrainTimes(res.body.result.arrivals)
                this.emit(':tellWithCard', "According to Nikita, " + trainSchedule);
            })

    },
    'AMAZON.HelpIntent': function () {
        var speechOutput = this.t('HELP_MESSAGE');
        var reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'SessionEndedRequest': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
};

exports.handler = (event, context) => {
    var alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    // alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};


