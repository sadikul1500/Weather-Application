using Microsoft.AspNetCore.Mvc;
using WeatherAppAPI.Model.DataModel;
using WeatherAppAPI.Model.EntityModel;
using WeatherAppAPI.Services;

namespace WeatherAppAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // Get: user/3
        [HttpGet("{id:int}")]
        public ActionResult GetUser(int id)
        {
            var user = _userService.GetUser(id);
            if(user == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(user);
            }
        }

        //Get: user/sadi/password
        //[HttpGet("{username}/{password}")]
        //public ActionResult GetUser(string username, string password)
        //{
        //    var user = _userService.GetUser(username, password);
        //    if (user == null)
        //    {
        //        return NotFound();
        //    }
        //    else
        //    {
        //        return Ok(user);
        //    }
        //}

        [HttpPost("login")]
        public ActionResult GetUser([FromBody] LoginModel loginModel)
        {
            var user = _userService.GetUser(loginModel.username, loginModel.password);
            if (user == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(user);
            }
        }

        // Get: user
        /// <summary>
        /// Get all users
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult GetUsers()
        {
            var users = _userService.GetUsers();
            if (users == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(users);
            }
        }

        // Post: user/add
        [HttpPost]
        public ActionResult AddUser(UserModel userModel)
        {
            var response = _userService.AddUser(userModel);

            if (response.IsSuccessful)
            {
                userModel.Id = response.Id;
                return CreatedAtAction("GetUser", new { id = response.Id }, userModel);
            }
            else
            {
                return Problem(response.Message);
            }
        }
    }
}
