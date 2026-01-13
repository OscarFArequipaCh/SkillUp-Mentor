export class Resource {
  constructor(id, resource_url, description, course) {
    this.id = id;
    this.resource_url = resource_url;
    this.description = description;
    this.course = course;
  }
}

export default Resource;