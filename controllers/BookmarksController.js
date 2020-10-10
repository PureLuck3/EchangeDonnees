const Repository = require('../models/Repository');
const Controller = require('./Controller');
const Response = require("../response");

module.exports =
class BookmarksController extends require('./Controller'){
    constructor(req, res){
        super(req, res);
        this.bookmarksRepository = new Repository('Bookmarks');
    }
    // GET: api/bookmarks
    // GET: api/bookmarks/{id}
    // GET: api/bookmarks/sort=name
    // GET: api/bookmarks/sort=category
    get(id){
        let queryParams = this.getQueryStringParams();
        let response = this.bookmarksRepository.getAll();
        if(queryParams[0] == null){
            this.response.JSON(Response.availableEndpoints());
        }
        if(!isNaN(id)){
            this.response.JSON(this.bookmarksRepository.get(id));
        }  
        else if(queryParams != undefined){   
            if(queryParams.name != undefined){
                if(queryParams.name[queryParams.name.length - 1] == '*'){
                    response = this.bookmarksRepository.getByNamePrefix(queryParams.name, response);
                }
                else{
                    response = this.bookmarksRepository.getByName(queryParams.name, response);
                }   
            }
            if(queryParams.category != undefined){
                response = this.bookmarksRepository.getByCategory(queryParams.category, response)
            }
            if(queryParams.sort == "name" && typeof(response) != "string"){
                response = this.bookmarksRepository.getSortName(response);
            }
            else if(queryParams.sort == "category" && typeof(response) != "string"){
                response = this.bookmarksRepository.getSortCategory(response);
            }        
        }
        this.response.JSON(response);
    }
    // POST: api/bookmarks body payload[{"Id": 0, "Name": "...", "Url": "...", "Category": "..."}]
    post(bookmark){
        // todo : validate bookmark before insertion
        // todo : avoid duplicates
        let newBookmark = this.bookmarksRepository.add(bookmark);
        if (newBookmark)
            this.response.created(newBookmark);
        else
            this.response.internalError();
    }
    // PUT: api/bookmarks body payload[{"Id":..., "Name": "...", "Url": "...", "Category": "..."}]
    // Le signet est modifier par rapport au ID insérer dans le body de la requête.
    put(bookmark){
        // todo : validate bookmark before updating
        if (this.bookmarksRepository.update(bookmark))
            this.response.ok();
        else 
            this.response.notFound();
    }
    // DELETE: api/bookmarks/{id}
    remove(id){
        if (this.bookmarksRepository.remove(id))
            this.response.accepted();
        else
            this.response.notFound();
    }
}