import App from '../components/App';

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

function redirectToHome(nextState, replace) {
  var path = '/';
  if (auth.loggedIn()) {
    replace(path);
  }
}

function checkUrlExist(nextState, replace){
  replace('/');
}


const routes = {
  path: '/',
  component: App,
  indexRoute: {
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('../components/pages/RunListAdmin.js').default)
      }, 'RunListAdmin');
    }
  },
  childRoutes: [
    //site display part related routes
    {
      path: '/login',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/Login.js').default)
        }, 'Login');
      }
    },

    {
      path: '/signup',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/Signup.js').default)
        }, 'Signup');
      }
    },

    {
      path: '/report',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/RunReport.js').default)
        }, 'RunReport');
      }
    },

    {
      path: '*',
      onEnter: checkUrlExist
    }
  ],

};

export default routes;
