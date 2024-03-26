using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WeatherAppAPI.Model.DataModel;
using WeatherAppAPI.Services;

namespace WeatherAppAPI.Controllers
{
    [Route("profile")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IProfileService _profileService;
        private readonly IUserService _userService;
        public ProfileController(IProfileService profileService, IUserService userService)
        {
            _profileService = profileService;
            _userService = userService;
        }

        //Get: profile/user/5
        /// <summary>
        /// Get Profile info of an user, given user id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet("user/{userId}")]
        public ActionResult GetProfileByUserId(int userId)
        {
            var profile = _profileService.GetProfileByUserId(userId);
            if (profile == null)
            {
                return NotFound();
            }

            else
            {
                return Ok(profile);
            }
        }

        //Get: profile/2
        /// <summary>
        /// Get Profile by profile id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public ActionResult GetProfile(int id)
        {
            var profile = _profileService.GetProfile(id);
            if (profile == null)
            {
                return NotFound();
            }

            else
            {
                return Ok(profile);
            }
        }

        [HttpGet("user/{userId}/more-info")]
        public ActionResult GetProfileAdditionalInfo(int userId)
        {
            var profile = _profileService.GetProfileByUserId(userId);
            if (profile == null)
            {
                return NotFound();
            }

            else
            {
                var additionalInfo = new
                {
                    profile.Email,
                    profile.Address,
                    profile.Phone
                };
                return Ok(additionalInfo);
            }
        }

        [HttpGet("user/{userId}/basic-info")]
        public ActionResult GetProfileBasicInfo(int userId)
        {
            var profile = _profileService.GetProfileByUserId(userId);
            if (profile == null)
            {
                return NotFound();
            }

            else
            {
                var user = _userService.GetUser(userId);
                var basicInfo = new
                {
                    user.Username,
                    profile.FullName
                };
                return Ok(basicInfo);
            }
        }

        //Post: profile
        [HttpPost]
        public ActionResult Add(ProfileModel profile)
        {
            var response = _profileService.AddProfile(profile);

            if (response.IsSuccessful)
            {
                profile.Id = response.Id;
                return CreatedAtAction("GetProfile", new { id = profile.Id }, profile);
            }
            else
            {
                return Problem(response.Message);
            }
        }

        //Put: profile/2
        [HttpPut("{id}")]
        public ActionResult Update(int id, ProfileModel profile)
        {
            var response = _profileService.UpdateProfile(profile);

            if (response.IsSuccessful)
            {
                profile.Id = response.Id;
                return CreatedAtAction("GetProfile", new { id = profile.Id }, profile);
            }
            else
            {
                return Problem(response.Message);
            }
        }
    }
}
