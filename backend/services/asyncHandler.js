const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    res.status(error.code || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export default asyncHandler;
// watch recent closure video

//simpler form
// function asyncHandler(fn){
//     return async function(req, res, next){
//         try{}
//          catch (error){}
//     }
// }
