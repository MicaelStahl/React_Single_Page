using React_Single_Page.Database;
using React_Single_Page.Interfaces;
using React_Single_Page.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace React_Single_Page.Repositories
{
    public class CarRepository : ICarRepository
    {
        private readonly CarDbContext _db;

        private readonly int Year = DateTime.Now.Year + 1;

        public CarRepository(CarDbContext db)
        {
            _db = db;
        }

        public List<Car> AllCars()
        {
            var cars = _db.Cars
                .ToList();

            return cars;
        }

        public List<string> AllBrands()
        {
            var brandName = new List<string>();

            foreach (var item in _db.Brands)
            {
                brandName.Add(item.Name);
            }
            return brandName;
        }

        public Car CreateCar(Car car)
        {
            if (string.IsNullOrWhiteSpace(car.ModelName) ||
                string.IsNullOrWhiteSpace(car.Brand) ||
                string.IsNullOrWhiteSpace(car.Color) ||
                car.ProductionYear < 1900 || car.ProductionYear > Year ||
                car.Id != 0)
            {
                return null;
            }
            var newCar = new Car()
            {
                ModelName = car.ModelName,
                Brand = car.Brand,
                Color = car.Color,
                ProductionYear = car.ProductionYear
            };

            if (newCar != null)
            {
                _db.Cars.Add(newCar);

                _db.SaveChanges();

                return newCar;
            }
            return null;
        }

        public bool DeleteCar(int? id)
        {
            if (id != null || id != 0)
            {
                var car = _db.Cars.SingleOrDefault(x => x.Id == id);

                if (car != null)
                {
                    _db.Cars.Remove(car);

                    _db.SaveChanges();

                    return true;
                }
            }
            return false;
        }

        public Car EditCar(Car car)
        {
            if (string.IsNullOrWhiteSpace(car.ModelName) ||
                string.IsNullOrWhiteSpace(car.Brand) ||
                string.IsNullOrWhiteSpace(car.Color) ||
                car.ProductionYear < 1900 || car.ProductionYear > Year)
            {
                return null;
            }
            var original = _db.Cars.SingleOrDefault(x => x.Id == car.Id);

            if (original != null)
            {
                original.ModelName = car.ModelName;
                original.Brand = car.Brand;
                original.Color = car.Color;
                original.ProductionYear = car.ProductionYear;

                _db.SaveChanges();

                return original;
            }
            return null;
        }

        public Car FindCar(int? id)
        {
            if (id != null || id != 0)
            {
                Car car = _db.Cars.SingleOrDefault(x => x.Id == id);

                if (car != null)
                {
                    return car;
                }
            }
            return null;
        }
    }
}
