// models/resourceModel.js
class Resource {
  constructor(id, resource_url, description, id_course) {
    this.id = id;
    this.resource_url = resource_url; // link a documento o video
    this.description = description;
    this.id_course = id_course;
  }
}
module.exports = Resource;