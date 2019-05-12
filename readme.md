RESTFUL ROUTES

name         url                verb        desc                                                Mongoose Method
===================================================================================================================
INDEX       /dogs               GET         Display a list of all dogs                          Dog.find()
NEW         /dogs/new           GET         Displays form to make new dog                       N/A
CREATE      /dogs               POST        Add new dog to DB                                   Dog.create()
SHOW        /dogs/:id           GET         Shows info about one dog                            Dog.findById()
EDIT        /dogs/:id/edit      GET         Show edit form for one dog                          Dog.findById()
UPDATE      /dogs/:id           PUT         Update a particular dog, then redirect somewhere    Dog.findByIdAndUpdate()
DESTROY     /dogs/:id           DELETE      Delete a particular dog, then redirect somewhere    Dog.findByIdAndRemove()


REST(Representational State Transfer) - a mapping between HTTP routes and CRUD

CREATE
READ
UPDATE
DESTROY


