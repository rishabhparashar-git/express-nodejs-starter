class BasicServices {
  constructor(model) {
    this.model = model;
  }
  create = body => {
    return this.model.create({ ...body });
  };
  find = filter => {
    return this.model.find({ ...filter });
  };
  findOne = filter => {
    return this.model.findOne({ ...filter });
  };
  findById = id => {
    return this.model.findById(id);
  };
  findByIdAndUpdate = (id, body) => {
    return this.model.findByIdAndUpdate(id, { ...body });
  };
  findByIdAndDelete = id => {
    return this.model.findByIdAndDelete(id);
  };
}

module.exports = BasicServices;
