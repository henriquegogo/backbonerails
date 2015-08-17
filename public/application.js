// Model
var User = Backbone.Model.extend({
    urlRoot: "/users",
    validate: function(attrs) {
        if (attrs.age >= 18) {
            $("[name=age]").removeAttr("style");
        
        } else {
            $("[name=age]").css("border", "2px solid red");

        }
    }
});

// View
var View = Backbone.View.extend({
    el: "#form",
    initialize: function() {
      this.modelBinder = new Backbone.ModelBinder();
      this.modelBinder.bind(this.model, this.el);
    },
    events: {
      'blur input': 'save',
      'blur textarea': 'save'
    },
    save: function() {
      this.model.save();
    }
});

// Collection
var Users = Backbone.Collection.extend({
    model: User
});

var currentUser;

// Routes
var Routes = Backbone.Router.extend({
    routes: {
        "!/user/new": "newUser",
        "!/user/:id": "user",
    },
    user: function(id) {
        currentUser = new User({ id: id });
        currentUser.fetch();
        new View({ model: currentUser });
    },
    newUser: function() {
        currentUser = new User();
        new View({ model: currentUser });
    }
});

new Routes;
Backbone.history.start();

// MODEL
var henrique = new User({ name: "Henrique Gogó" });
henrique.set({ name: "Henrique Soares", wife: "Daiane Abreu", descricao: "Lindo e gatão" });
henrique.set("age", 27);

// COLLECTION
var employees = new Users([{ name: "Letícia" }, { name: "Mateus" }]);

employees.on("add", function(user) {
    console.log("New employee added. Welcome " + user.get("name") + "!");
});

employees.add({ name: "Roberto" });

// OTHERs
// var view = new View({ model: henrique });

