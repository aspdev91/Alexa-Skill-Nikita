/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/


'use strict';

const Alexa = require('alexa-sdk');
const request = require('superagent');

const APP_ID = undefined;  // TODO replace with your app ID (OPTIONAL).

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetFact');
    },
    'CallNikita': function () {
        this.emit('GetFact');
    },
    'GetFact': function () {

        request.get('https://awesomo.top/nikita')
            .end((err, res) => {
                if (err) {
                    console.log("There's been an error.")
                    console.log(err)
                };
                console.log(res)
                let speechOutput = res.result;
                this.emit(':tellWithCard', "Nikita's Response", speechOutput);
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
    alexa.resources = languageStrings;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
