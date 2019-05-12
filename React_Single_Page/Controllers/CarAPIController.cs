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

        // GET: api/CarAPI/GetBrands
        [HttpGet("{Car}")]
        public List<string> GetBrands()
        {
            var brands = new List<string>();

            foreach (var item in _db.Brands)
            {
                brands.Add(item.Name);
            }

            if (brands != null)
            {
                return brands;
            }
            return null;
        }

        // POST: api/CarAPI
        [HttpPost]
        public List<Car> Post(Car car)
        {
            if (ModelState.IsValid)
            {
                var boolean = _car.CreateCar(car);

                if (boolean)
                {
                    return _db.Cars.ToList();
                }
            }
            return null;
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
                var car = _db.Cars.SingleOrDefault(x => x.Id == id);

                _db.Cars.Remove(car);
                _db.SaveChanges();

                _car.DeleteCar(id);
            }
        }
    }
}
