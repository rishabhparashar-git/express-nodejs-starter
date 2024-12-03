const { PORT } = process.env;

module.exports = async app => {
  await require('./db.startup')(app);
  require('./routes.startup')(app);
  require('./error.startup')();

  //Starting Server
  app.listen(PORT || 3001, () => {
    console.log('🚀 Eduthum Server is Running on PORT =>', PORT || 3001);
  });
};
