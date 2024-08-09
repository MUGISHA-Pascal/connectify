const passport = require("passport");
const googleStrategy = require("passport-google-oauth20");
const keys = require("../keys");
const User = require("../src/models/user");

passport.use(
  new googleStrategy(
    {
      callbackURL: "/auth/google/redirect",
      clientID: keys.clientID,
      clientSecret: keys.clientSecret,
    },
    async (accessToken, refreshToken, profile, done) => {
      await User.findOne(profile.id).then((currentuser) => {
        if (currentuser) {
          //found user
        } else {
          const newUser = new User({
            username: profile.displayName,
            googleId: profile.id,
            photo: profile._json.picture,
          }).save();
        }
      });
    }
  )
);
