const db = require("../models");
const PageWiki = db.pageWikis;
const Category = db.categorys;
const Op = db.Sequelize.Op;
const fetch = require("node-fetch");

exports.create = (req, res) => {
  var pageWiki = {
    pageWikiId: req.body.pageWikiId,
    difficulty: req.body.difficulty,
    categoryId: req.body.categoryId,
  };
  
  PageWiki.create(pageWiki)
  .then(data => {
    res.send(data);
  }).catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the PageWiki."
    });
  });
};



exports.findAll = (req, res) => {
  const id = req.query.id;
  var condition = id ? { id: { [Op.like]: `%${id}%` } } : null;

  PageWiki.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pageWiki."
      });
    });
};

exports.findByCategory = (req, res) => {
  const category = req.query.category;
  var condition = category ? { category: { [Op.like]: `%${category}%` } } : null;

  PageWiki.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving pageWiki."
      });
    });
};


exports.addPages = (req, res) => {
    var json = createCategory(req, res);
    
};
async function createCategory(req, res){

    var category = {
      name: req.params.cat,
      lang: req.params.lang,
      parent: req.params.parent,
      actif: 1
    };
    var wpcontinue = '';
    Category.create(category).then(data => {

        wpcontinue = createWiki(req, res, data, wpcontinue, 0);

      
      res.send('add');
    }).catch(err => {
      res.status(500).send({
      message:
        err.message || "Some error occurred while creating the category."
      });
    });
}
  
  
async function apiWiki(endpoint){
		const response = await fetch(endpoint);
		if (!response.ok) {
			throw Error(response.statusText);
		}
		const json = await response.json();	
		return json;
		
}

async function createWiki(req, res, category, continu, i){

    const endpoint = `https://${category.lang}.wikipedia.org/w/api.php?action=query&format=json&list=projectpages&indexpageids=1&continue=-%7C%7C&utf8=1&wppassessments=1&wppprojects=${encodeURI(category.name)}&wpplimit=499${continu}`;
    console.log(endpoint);
    var json = await apiWiki(endpoint);
    var pages = json.query.projects[category.name];
    
    if(pages !== undefined){
      for(let i = 0; i < pages.length; i++){
        if(pages[i].assessment.importance == "maximum"){
            var importance = 2;
        }else if(pages[i].assessment.importance == "élevée"){
            var importance = 3;
        }else if(pages[i].assessment.importance == "moyenne"){
            var importance = 4;
        }else{
            var importance = 0;
        }

        if(importance == 2 || importance == 3 || importance == 4){
        
          const pageWiki = {
            pageWikiId: pages[i].pageid,
            difficulty: importance,
            categoryId: category.id,
            name: pages[i].title,
            lang: category.lang,
          };
        
          PageWiki.create(pageWiki).then(data => {
            console.log(pages[i].pageid);
            
          }).catch(err => {
            res.status(500).send({
              message:
                err.message || "Some error occurred while creating the page."
            });
          }); 
       
        }
      }
    }
    if(json.continue != undefined && i <= 10){
      return createWiki(req, res, category, "&wppcontinue=" + json.continue.wppcontinue, i++);
    }else{
      return 0;
    }
}


