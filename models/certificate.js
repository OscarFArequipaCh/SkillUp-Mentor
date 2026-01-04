export class Certificate {
    constructor(id, description, dateUpload, url, user){
        this.id = id;
        this.description = description;
        this.dateUpload = dateUpload || new Date().toISOString();
        this.url = url;
        this.user = user; // reference to User
    }
}

export default Certificate;