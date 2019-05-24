using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace React_Single_Page.Models
{
    public class Car
    {
        [Key]
        [Column(Order = 0)]
        public int Id { get; set; }

        [Required]
        [Display(Name = "Model name")]
        [StringLength(50, MinimumLength = 2, ErrorMessage = "The model name must be between 2 to 50 characters long.")]
        public string ModelName { get; set; }

        [Required]
        [Display(Name = "Brand")]
        [StringLength(20, MinimumLength = 2, ErrorMessage = "The brand must be between 2 to 20 characters long.")]
        public string Brand { get; set; }

        [Required]
        [Display(Name = "Color")]
        [StringLength(30, MinimumLength = 2, ErrorMessage = "The name of the color must be between 2 to 30 characters long.")]
        public string Color { get; set; }

        [Required]
        [Display(Name = "Production year")]
        [Range(1900, 2020, ErrorMessage = "The production year must be between year 1900 and 2020")]
        public int ProductionYear { get; set; }
    }
}
