const passport = require('passport');
const OutlookStrategy = require('passport-outlook');
const config = require('config');

const credentials = config.get('credentials');

module.exports = function (app) {
    "use strict";

    var _user = null;

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new OutlookStrategy({
            clientID: credentials.clientID,
            clientSecret: credentials.clientSecret,
            callbackURL: credentials.callbackURL
        },
        (accessToken, refreshToken, profile, done) => {
            let user = {
                outlookId: profile.id,
                name: profile.DisplayName,
                email: profile.EmailAddress,
                accessToken: accessToken
            };
            if (refreshToken)
                user.refreshToken = refreshToken;
            if (profile.MailboxGuid)
                user.mailboxGuid = profile.MailboxGuid;
            if (profile.Alias)
                user.alias = profile.Alias;

            return done(null, user);
        }
    ));
    passport.serializeUser((user, done) => {
        _user = user;
        done(null, user);
    });
    passport.deserializeUser((id, done) => {
        done(null, _user);
    });
    app.get('/auth/outlook', passport.authenticate('windowslive', {
        scope: ['openid', 'profile', 'https://outlook.office.com/Mail.Read']
    }), (req, res) => {
    });
    app.get('/auth/outlook/callback', passport.authenticate('windowslive', {
        failureRedirect: '/error'
    }), (req, res) => {
        res.redirect('/');
    });
    app.get('/logout', (req, res) => {
        req.logout();
        res.redirect('/');
    });
};
