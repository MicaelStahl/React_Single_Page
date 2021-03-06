﻿using Microsoft.AspNetCore.Mvc;
using React_Single_Page.Interfaces;
using React_Single_Page.Models;
using System.Threading.Tasks;

namespace React_Single_Page.Controllers
{
    public class CarsController : Controller
    {
        private readonly ICarRepository _car;

        public CarsController(ICarRepository car)
        {
            _car = car;
        }

        public IActionResult Index()
        {
            return View(_car.AllCars());
        }

        public IActionResult AllCars()
        {
            return View(_car.AllCars());
        }

        [HttpGet]
        public IActionResult Create()
        {
            return View();
        }
        [HttpPost]
        public IActionResult Create(Car car)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var newCar = _car.CreateCar(car);

            if (newCar != null)
            {
                return RedirectToAction(nameof(Details), "Cars", new { id = newCar.Id });
            }
            return BadRequest();
        }

        public IActionResult Details(int? id)
        {
            if (id == null || id == 0)
            {
                return BadRequest();
            }
            var car = _car.FindCar(id);

            if (car != null)
            {
                return View(car);
            }
            return NotFound();
        }

        [HttpGet]
        public IActionResult Edit(int? id)
        {
            if (id == null || id == 0)
            {
                return BadRequest();
            }
            var car = _car.FindCar(id);

            if (car != null)
            {
                return View(car);
            }
            return NotFound();
        }
        [HttpPost]
        public IActionResult Edit(Car car)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var newCar = _car.EditCar(car);

            if (newCar != null)
            {
                return RedirectToAction(nameof(Details), "Cars", new { id = newCar.Id });
            }
            return NotFound();
        }

        [HttpGet]
        public IActionResult Delete(int? id)
        {
            if (id == null || id == 0)
            {
                return BadRequest();
            }
            var car = _car.FindCar(id);

            if (car != null)
            {
                return View(car);
            }
            return NotFound();
        }
        [HttpPost, ActionName("Delete")]
        public IActionResult DeleteConfirmed(int? id)
        {
            if (id == null || id == 0)
            {
                return BadRequest();
            }
            var boolean = _car.DeleteCar(id);

            if (boolean)
            {
                return RedirectToAction(nameof(Index));
            }
            return NotFound();
        }
    }
}