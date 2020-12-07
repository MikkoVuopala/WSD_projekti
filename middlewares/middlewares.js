//imports

const errorMiddleware = async(context, next) => {
    try {
      await next();
    } catch (e) {
      console.log(e);
    }
};

//exports
export { errorMiddleware };

