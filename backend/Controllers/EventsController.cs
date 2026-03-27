using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EventsController : ControllerBase
{
    private static List<Event> _events = new()
    {
        new Event { Id = 1, Title = "Stand-up hebdo", Description = "Point d'équipe chaque lundi", Date = DateTime.Now.AddDays(3), Location = "Salle Teams A" },
        new Event { Id = 2, Title = "Demo Day", Description = "Présentation des features du sprint", Date = DateTime.Now.AddDays(7), Location = "Salle plénière" },
        new Event { Id = 3, Title = "Afterwork", Description = "Soirée équipe au bar du coin", Date = DateTime.Now.AddDays(10), Location = "Le Comptoir" }
    };

    [HttpGet]
    public ActionResult<List<Event>> GetAll() => Ok(_events);

    [HttpGet("{id}")]
    public ActionResult<Event> GetById(int id)
    {
        var ev = _events.FirstOrDefault(e => e.Id == id);
        if (ev == null) return NotFound();
        return Ok(ev);
    }
}