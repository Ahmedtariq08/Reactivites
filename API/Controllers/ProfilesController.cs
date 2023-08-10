
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfilesController : BaseApiController
    {
        [HttpGet("{username}")]
        public async Task<IActionResult> GetProfile(string username)
        {
            return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
        }

        [HttpPut("{username}")]
        public async Task<IActionResult> UpdateProfile(Profile profile)
        {
            Console.WriteLine(profile);
            return HandleResult(await Mediator.Send(new Update.Command { Profile = profile }));
        }

    }
}