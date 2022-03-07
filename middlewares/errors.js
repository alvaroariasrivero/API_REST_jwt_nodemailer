const error404 = (req,res,next) => {
    const data = {
      message:"Error! 404 not found",
      error:404
    }
      res.status(404).render('error',{data});
  }

const errors = {
    error404
    // otro error aquí...
}
module.exports = errors;