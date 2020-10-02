module.exports = {
  signUp: async(req, res, next) => {
    console.log('UsersController.Signup() called')
  },

  signIn: async(req, res, next) => {
    console.log('UsersController.Signin() called')
  },

  getPosts: async(req, res, next) => {
    console.log('UsersController.getPosts() called')
  }
}