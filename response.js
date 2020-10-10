module.exports = 
class Response {
    constructor (res){
        this.res = res;
    }
    status(number){
        this.res.writeHead(number, {'content-type':'text/plain'});
        this.res.end();
    }
    ok() {
        // ok status
        this.status(200);
    }
    accepted() {
        // accepted status
        this.status(202);
    }
    created(jsonObj) {
        this.res.writeHead(201, {'content-type':'application/json'});
        this.res.end(JSON.stringify(jsonObj));
    }
    JSON(jsonObj) {
        this.res.writeHead(200, {'content-type':'application/json'});
        this.res.end(JSON.stringify(jsonObj));
    }  
    noContent() {
        // no content status
        this.status(204);
    }
    notFound() {
        // Fonction vide pour rediriger vers notFound() de server.js pour éviter d'envoyer plusieurs header....
        // Je sais Patrice...
    }
    forbidden() {
        // forbidden status
        this.status(403);
    }
    notAloud() {
        // Method not aloud status
        this.status(405);
    }
    conflict() {
      // Conflict status
      this.status(409);  
    }
    unsupported () {
        // Unsupported Media Type status
        this.status(415);
    }
    unprocessable() {
        // Unprocessable Entity status
        this.status(422);
    }
    badRequest() {
        // bad request status
        this.status(400);
    }
    internalError() {
        // internal error status
        this.status(500);
    }
    notImplemented() {
        //Not implemented
        this.status(501);
    }
    static availableEndpoints(){
        return [
            {
                method: "GET",
                signets: "/api/bookmarks"
            },
            {
                method: "GET",
                signetsTriésParNom: "/api/bookmarks?sort={name}"
            },
            {
                method: "GET",
                signetsTriésParCatégorie: "/api/bookmarks?sort={category}"
            },
            {
                method: "GET",
                signetParId: "/api/bookmarks/id"
            },
            {
                method: "GET",
                signetParNom: "/api/bookmarks?name={nom}"
            },
            {
                method: "GET",
                signetParDébutDeNom: "/api/bookmarks?name={ab*}"
            },
            {
                method: "GET",
                signetParCatégorie: "/api/bookmarks?category={sport}"
            },
            {
                method: "POST",
                ajouterSignet: "/api/bookmarks"
            },
            {
                method: "PUT",
                modifierSignet: "/api/bookmarks/id"
            },
            {
                method: "DELETE",
                supprimerSignet: "/api/bookmarks/id"
            }
        ]
    }  
}