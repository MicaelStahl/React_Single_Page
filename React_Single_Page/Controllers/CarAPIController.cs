using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using React_Single_Page.Database;
using React_Single_Page.Interfaces;
using React_Single_Page.Models;
using React_Single_Page.ViewModels;

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

        // GET: api/CarAPI/GetBrands
        [HttpGet("{Car}")]
        public List<string> GetBrands()
        {
            var brands = new List<string>();

            foreach (var item in _db.Cars)
            {
                brands.Add(item.Brand);
            }

            if (brands != null)
            {
                return brands;
            }
            return null;
        }

        // POST: api/CarAPI
        [HttpPost]
        public CreateCarVM Post([FromBody] Car car)
        {
            CreateCarVM newCar = new CreateCarVM();
            if (ModelState.IsValid)
            {

                var response = _car.CreateCar(car);

                newCar.Car = response;

                if (newCar.Car != null)
                {
                    newCar.Message = "Your car was successfully created!";
                    return newCar;
                }
                newCar.Message = "There was an error when creating the car. please try again.";
                return newCar;
            }
            newCar.Message = "Please fill in all inputs and try again.";
            return newCar;
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
