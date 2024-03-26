using Microsoft.AspNetCore.Mvc;
using WeatherAppAPI.Model.DataModel;
using WeatherAppAPI.Model.EntityModel;
using WeatherAppAPI.Services;

namespace WeatherAppAPI.Controllers
{
    [Route("location")]
    [ApiController]
    public class LocationController : ControllerBase
    {
        private readonly ILocationService _locationService;

        public LocationController(ILocationService locationService)
        {
            _locationService = locationService;
        }

        // GET: location
        [HttpGet]
        public ActionResult<List<LocationModel>> Locations()
        {
            var locations = _locationService.GetAllLocations();
            if (locations == null)
            {
                return NotFound();
            }
            return Ok(locations);
        }

        // GET: location/5
        [HttpGet("{id}")]
        public ActionResult<LocationModel> Location(int id)
        {
            var locationModel =  _locationService.GetLocation(id);

            if (locationModel == null)
            {
                return NotFound();
            }

            return locationModel;
        }

        //Post: location
        [HttpPost]
        public ActionResult<LocationModel> Add([FromBody]LocationModel locationModel)
        {
            var response = _locationService.AddLocation(locationModel);
            if (response.IsSuccessful)
            {
                locationModel.Id = response.Id;
                return CreatedAtAction("Location", new { id = locationModel.Id }, locationModel);
            }
            else
            {
                return Problem(response.Message);
            }
        }
    }
}
