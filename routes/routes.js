import passport from 'passport';
import userRoute from '../Controller/User.js';

const routes = (app) => {
  app
    .route('/all')
    .get(passport.authenticate('jwt', { session: false }), userRoute);

  app
    .route('/signin')
    .get(userRoute);

};

export default routes;