using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using React_Single_Page.Interfaces;
using React_Single_Page.Models;

namespace React_Single_Page.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsTestController : ControllerBase
    {
        ICarRepository _car;

        public CarsTestController(ICarRepository car)
        {
            _car = car;
        }

        public List<Car> AllCars()
        {
            return _car.AllCars();
        }

    }
}