import App from '../components/App'

if (typeof require.ensure !== 'function') require.ensure = (d, c) => c(require)

function redirectToHome(nextState, replace) {
  var path = nextState.params.lang == 'tc' ? '/tc' : '/';
  if (auth.loggedIn()) {
    replace(path)
  }
}

function checkUrlExist(nextState, replace){
  replace('/')
}

function checkLang(nextState, replace){
  var pathname = nextState.location.pathname
  if(pathname.substring(0, 3) == "/tc") {
    nextState.params.lang = 'tc'
  }
}

function checkChangeLang(prevState, nextState, replace){
  var pathname = nextState.location.pathname
  if(pathname.substring(0, 3) == "/tc") {
    nextState.params.lang = 'tc'
  }
}

const routes = {
  path: '/(tc)',
  component: App,
  indexRoute: { 
    getComponent(location, cb) {
      require.ensure([], (require) => {
        cb(null, require('../components/pages/Home.js').default)
      }, 'Home');
    }
  },
  onEnter: checkLang,
  onChange: checkChangeLang,
  childRoutes: [
    //site display part related routes
    {
      path: '(tc/)upload',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/Upload.js').default)
        }, 'Upload');
      }
    },

    {
      path: '(tc/)privacy',
      getComponent(location, cb) {
        require.ensure([], (require) => {
          cb(null, require('../components/pages/Privacy.js').default)
        }, 'Privacy');
      }
    },
    
    {
      path: '*',
      onEnter: checkUrlExist
    }
  ],

}

export default routes
