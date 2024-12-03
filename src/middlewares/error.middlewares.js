const Response = require('../helpers/Response.helpers');

module.exports = (err, req, res) => {
  try {
    const status = err.status || 500;
    const message = err.message || 'Something went wrong';

    Response(res).status(status).error(message).send();
  } catch (error) {
    // next(error);
    console.log({ error });
  }
};
