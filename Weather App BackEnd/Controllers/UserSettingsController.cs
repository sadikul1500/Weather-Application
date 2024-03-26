using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WeatherAppAPI.Model.DataModel;
using WeatherAppAPI.Model.EntityModel;
using WeatherAppAPI.Services;

namespace WeatherAppAPI.Controllers
{
    [Route("user-settings")]
    [ApiController]
    public class UserSettingsController : ControllerBase
    {
        private readonly ISettingsService _settingsService;
        public UserSettingsController(ISettingsService settingsService)
        {
            _settingsService = settingsService;
        }

        //Get: user-settings/user/5
        /// <summary>
        /// Get settings info of an user, given user id
        /// </summary>
        /// <param name="userId"></param>
        /// <returns></returns>
        [HttpGet("user/{userId}")]
        public ActionResult GetSettingsByUserId(int userId)
        {
            var settings = _settingsService.GetSettingsByUserId(userId);
            if(settings == null)
            {
                return NotFound();
            }

            else
            {
                return Ok(settings);
            }
        }

        //Get: user-settings/2
        /// <summary>
        /// Get settings by settings id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        [HttpGet("{id}")]
        public ActionResult GetSettings(int id)
        {
            var settings = _settingsService.GetSettings(id);
            if (settings == null)
            {
                return NotFound();
            }

            else
            {
                return Ok(settings);
            }
        }

        //Post: user-settings
        [HttpPost]
        public ActionResult Add(SettingsModel settings)
        {
            var response = _settingsService.AddSettings(settings);

            if (response.IsSuccessful)
            {
                settings.Id = response.Id;
                return CreatedAtAction("GetSettings", new { id = settings.Id }, settings);
            }
            else
            {
                return Problem(response.Message);
            }
        }

        //Put: user-settings/2
        [HttpPut("{id}")]
        public ActionResult Update(int id, SettingsModel settings)
        {
            var response = _settingsService.UpdateSettings(id, settings);

            if (response.IsSuccessful)
            {
                settings.Id = response.Id;
                return CreatedAtAction("GetSettings", new { id = settings.Id }, settings);
            }
            else
            {
                return Problem(response.Message);
            }
        }
    }
}
