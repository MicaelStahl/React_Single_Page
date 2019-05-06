using React_Single_Page.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React_Single_Page.Interfaces
{
    public interface ICarRepository
    {
        // (C)RUD
        Car CreateCar(Car car);

        // C(R)UD
        Car FindCar(int? id);
        List<Car> AllCars();

        // CR(U)D
        Car EditCar(Car car);
        Car SortCarBy(string sortBy);

        //CRU(D)
        bool DeleteCar(int? id);
    }
}
