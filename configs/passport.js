import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20';
import { userModel } from '../models/user.js';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
  try {
    const user = await userModel.findById(id)
    done(null, user);
  } catch (err) {
    done(err,null)
  }
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:  process.env.CALLBACK_URL
  }, async (accessToken, refreshToken, profile, done)=> {

   try {
     const  existingUser = await userModel.findOne({googleId:profile.id})
     if (existingUser) {
        return done(null,existingUser)
      }

   const user = await userModel.create({
      googleId: profile.id,
      email: profile.emails[0].value,
      userName: profile.displayName,
      avatar: profile.photos[0].value,
    })
     return done(null,user)
   } catch (error) {
    done(error,null)
   }
  }
));
