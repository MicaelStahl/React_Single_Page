using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using React_Single_Page.Database;
using React_Single_Page.Interfaces;
using React_Single_Page.Models;

namespace React_Single_Page.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class CarAPIController : ControllerBase
    {
        private readonly ICarRepository _car;
        private readonly CarDbContext _db;

        public CarAPIController(ICarRepository car, CarDbContext db)
        {
            _car = car;
            _db = db;
        }

        // GET: api/CarAPI
        [HttpGet]
        public List<Car> Get()
        {
            var cars = _db.Cars.ToList();

            return new List<Car>(cars);
        }

        // GET: api/CarAPI/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/CarAPI
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT: api/CarAPI/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int? id)
        {
            if (id != null || id != 0)
            {
                var car = _db.Cars.SingleOrDefault(x => x.Id == id);

                _db.Cars.Remove(car);
                _db.SaveChanges();

                _car.DeleteCar(id);
            }
        }
    }
}
