using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Cors;
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

        public CarAPIController(ICarRepository car)
        {
            _car = car;
        }

        // GET: api/CarAPI
        [HttpGet]
        public List<Car> Get()
        {
            var cars = _car.AllCars();

            return new List<Car>(cars);
        }

        // GET: api/CarAPI/GetBrands
        [HttpGet("{Car}")]
        public List<string> GetBrands()
        {
            var brands = _car.AllBrands();

            if (brands != null || brands.Count != 0)
            {
                return brands;
            }
            return null;
        }

        // POST: api/CarAPI
        [HttpPost]
        public Car Post(Car car)
        {
            if (!ModelState.IsValid)
            {
                return null;
            }
            var newCar = _car.CreateCar(car);

            if (newCar == null)
            {
                return null;
            }
            return newCar;
        }

        // PUT: api/CarAPI/5
        [HttpPut("{id}")] //Another word for Edit.
        public Car Put(int? id, Car car)
        {
            if (ModelState.IsValid)
            {
                if (id != null || id != 0)
                {
                    car.Id = (int)id;

                    var newCar = _car.EditCar(car);

                    if (newCar != null)
                    {
                        return newCar;
                    }
                }
            }
            return null;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int? id)
        {
            if (id != null || id != 0)
            {
                _car.DeleteCar(id);
            }
        }
    }
}
