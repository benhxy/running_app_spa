import App from '../components/App';

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require);

function redirectToLogin(nextState, replace) {
  var path = '/login';
  if (!localStorage.getItem("RunAppToken")) {
    replace({
      pathname: path,
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

function handleLogOut() {
  localStorage.removeItem("RunAppToken");
  localStorage.removeItem("RunAppRole");
  localStorage.removeItem("RunAppUserId");
}

function checkUrlExist(nextState, replace){
  replace('/');
}


const routes = {
  path: '/',
  component: App,
  indexRoute: {
    onEnter: redirectToLogin,
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('../components/pages/RunList.js').default)
      }, 'RunList');
    }
  },
  childRoutes: [
    //site display part related routes
    {
      path: '/signup',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/Signup.js').default)
        }, 'Signup');
      }
    },

    {
      path: '/login',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/Login.js').default)
        }, 'Login');
      }
    },

    {
      path: '/logout',
      onEnter: handleLogOut
    },

    {
      path: '/run',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/RunList.js').default)
        }, 'RunList');
      }
    },

    {
      path: '/run/report',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/RunReport.js').default)
        }, 'RunReport');
      }
    },

    {
      path: '/run/:id',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/RunDetail.js').default)
        }, 'RunDetail');
      }
    },

    {
      path: '/run_admin',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/RunListAdmin.js').default)
        }, 'RunListAdmin');
      }
    },

    {
      path: '/run_admin/:id',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/RunDetailAdmin.js').default)
        }, 'RunDetailAdmin');
      }
    },

    {
      path: '/user',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/UserList.js').default)
        }, 'UserList');
      }
    },

    {
      path: '/user/:id',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/UserDetail.js').default)
        }, 'UserDetail');
      }
    },

    {
      path: '/about',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/About.js').default)
        }, 'About');
      }
    },

    {
      path: '*',
      onEnter: checkUrlExist
    }
  ],

};

export default routes;
