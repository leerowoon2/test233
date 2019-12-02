module.exports = function(app)
{
     app.get('/main',function(req,res){
        res.render('index.html')
     });


     app.get('/:ckey',function(req,res){
         res.render('index.html')
     });
     
}