using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ArticlesController : ControllerBase
{
    // Notre "base de données" en mémoire (liste statique partagée)
    private static List<Article> _articles = new()
    {
        new Article { Id = 1, Title = "Bienvenue chez Jint", Content = "Notre nouvelle plateforme intranet est en ligne !", Author = "Marie Dupont" },
        new Article { Id = 2, Title = "Mise à jour produit Q1", Content = "Découvrez les nouvelles fonctionnalités déployées ce trimestre.", Author = "Lucas Martin" }
    };

    // GET /api/articles → récupérer tous les articles
    [HttpGet]
    public ActionResult<List<Article>> GetAll()
    {
        return Ok(_articles);
    }

    // GET /api/articles/1 to récupérer un article par son id
    [HttpGet("{id}")]
    public ActionResult<Article> GetById(int id)
    {
        var article = _articles.FirstOrDefault(a => a.Id == id);
        if (article == null) return NotFound();
        return Ok(article);
    }

    // POST /api/articles to créer un nouvel article
    [HttpPost]
    public ActionResult<Article> Create(Article article)
    {
        article.Id = _articles.Any() ? _articles.Max(a => a.Id) + 1 : 1;
        article.PublishedAt = DateTime.Now;
        _articles.Add(article);
        return CreatedAtAction(nameof(GetById), new { id = article.Id }, article);
    }

    // DELETE /api/articles/1 to supprimer un article
    [HttpDelete("{id}")]
    public ActionResult Delete(int id)
    {
        var article = _articles.FirstOrDefault(a => a.Id == id);
        if (article == null) return NotFound();
        _articles.Remove(article);
        return NoContent();
    }
}