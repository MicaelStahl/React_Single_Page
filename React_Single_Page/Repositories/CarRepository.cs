﻿using React_Single_Page.Database;
using React_Single_Page.Interfaces;
using React_Single_Page.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React_Single_Page.Repositories
{
    public class CarRepository : ICarRepository
    {
        private readonly CarDbContext _db;

        private readonly int Year = DateTime.Now.Year;

        public CarRepository(CarDbContext db)
        {
            _db = db;
        }

        public List<Car> AllCars()
        {
            return _db.Cars.Where(x => x.Id == x.Id).ToList();
        }

        public Car CreateCar(Car car)
        {
            if (!string.IsNullOrWhiteSpace(car.ModelName) ||
                !string.IsNullOrWhiteSpace(car.Brand) ||
                !string.IsNullOrWhiteSpace(car.Color) ||
                car.ProductionYear > 1900 || car.ProductionYear <= Year)
            {
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
            if (!string.IsNullOrWhiteSpace(car.ModelName) ||
                !string.IsNullOrWhiteSpace(car.Brand) ||
                !string.IsNullOrWhiteSpace(car.Color) ||
                car.ProductionYear > 1900 || car.ProductionYear <= Year)
            {
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

        public Car SortCarBy(string sortBy)
        {
            if (string.IsNullOrWhiteSpace(sortBy))
            {
                if (sortBy.Contains("ModelName"))
                {
                    var sortedCars = _db.Cars.Where(x => x.Id == x.Id).ToList();

                    // Work on this later. I don't know how to configure this one.
                }
            }
            return null;
        }
    }
}
