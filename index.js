/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/


'use strict';

const Alexa = require('alexa-sdk');
const request = require('superagent');
// var AWS = require('aws-sdk');

const APP_ID = 'amzn1.ask.skill.ed442aba-79c5-456b-b663-90edbbcf2efe';  // TODO replace with your app ID (OPTIONAL).

const handlers = {
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
                let newsSource = res.body.result.source;
                let articles = res.body.result.articles
                this.emit(':tellWithCard', readNews(articles, newsSource));
            })

        function readNews(articles, newsSource) {
            let allArticles = 'This is whats happening on ' + newsSource + ' . . . .';
            let count = 0
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
                this.emit(':tellWithCard', res.body.result);
            })

    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
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
    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = APP_ID;
    // To enable string internationalization (i18n) features, set a resources object.
    // alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
