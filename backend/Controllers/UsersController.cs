using Microsoft.AspNetCore.Mvc;
using backend.Models;

namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private static List<User> _users = new()
    {
        new User { Id = 1, Name = "Marie Dupont", Role = "Product Manager", Email = "marie@jint.com", AvatarUrl = "https://i.pravatar.cc/150?img=1" },
        new User { Id = 2, Name = "Lucas Martin", Role = "Développeur Full-Stack", Email = "lucas@jint.com", AvatarUrl = "https://i.pravatar.cc/150?img=2" },
        new User { Id = 3, Name = "Sophie Bernard", Role = "Designer UX", Email = "sophie@jint.com", AvatarUrl = "https://i.pravatar.cc/150?img=3" },
        new User { Id = 4, Name = "Thomas Petit", Role = "DevOps Engineer", Email = "thomas@jint.com", AvatarUrl = "https://i.pravatar.cc/150?img=4" }
    };

    [HttpGet]
    public ActionResult<List<User>> GetAll() => Ok(_users);

    [HttpGet("{id}")]
    public ActionResult<User> GetById(int id)
    {
        var user = _users.FirstOrDefault(u => u.Id == id);
        if (user == null) return NotFound();
        return Ok(user);
    }
}