using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace React_Single_Page.Models
{
    public class Brand
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [Display(Name = "Brand")]
        public string Name { get; set; }

        public List<Car> CarsToBrand { get; set; } = new List<Car>();
    }
}
