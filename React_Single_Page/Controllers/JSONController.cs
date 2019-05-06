using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using React_Single_Page.Database;
using React_Single_Page.Models;

namespace React_Single_Page.Controllers
{
    public class JSONController : Controller
    {
        CarDbContext _db;

        public JSONController(CarDbContext db)
        {
            _db = db;
        }

        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public IActionResult GetCars()
        {
            var cars = _db.Cars.ToList();

            return Json(cars);
        }
    }
}