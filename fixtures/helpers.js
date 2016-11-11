global.assert = require('assert');

const CUSTOM_COMMANDS = {
    login: function (userType = 'seller') {

        let username = process.env.SELLER_USERNAME;
        let password = process.env.SELLER_PASSWORD;

        if (userType === 'buyer') {
            username = process.env.BUYER_USERNAME
            password = process.env.BUYER_PASSWORD
        }

        var self = this;
        return new Promise(function (resolve, reject) {
            self.url('/login')
                .waitForExist('#input_email_address')
            
            self.setValue('#input_email_address', username);
            self.setValue('#input_password', password);
            self.click('.button-save');

            if (self.url().value.indexOf('/digital-service-professionals/opportunities') !== -1) {
                resolve();    
            } else {
                reject();
            }
        });
    }
};

Object.keys(CUSTOM_COMMANDS).forEach(function (command) {
    browser.addCommand(command, CUSTOM_COMMANDS[command])
});