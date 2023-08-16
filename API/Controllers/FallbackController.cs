
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

//This fallback conrtoller is created for frontend application
//for any route that it does not know, it will redirect to index.html
namespace API.Controllers
{
    [AllowAnonymous]
    public class FallbackController : Controller
    {
        public IActionResult Index()
        {
            return PhysicalFile(Path.Combine(Directory.GetCurrentDirectory(),
                "wwwroot", "index.html"), "text/HTML");
        }
    }
}