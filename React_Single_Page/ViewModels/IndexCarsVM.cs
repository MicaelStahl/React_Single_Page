using React_Single_Page.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React_Single_Page.ViewModels
{
    public class IndexCarsVM
    {
        public Car Car { get; set; }

        public string SortBy { get; set; }

        public List<Car> Cars { get; set; }
    }
}
