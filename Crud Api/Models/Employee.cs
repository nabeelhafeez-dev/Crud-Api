using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Crud.Models
{
    public class Employee 
    {
       [Key]
       public int id { get; set; }

       [Column(TypeName = "nvarchar(500)")]
       public string Name { get; set; }

       [Column(TypeName = "nvarchar(500)")]
        public string Contact { get; set; }


        [Column(TypeName = "nvarchar(500)")]
        public string Email { get; set; }


        [Column(TypeName = "nvarchar(500)")]
        public string DOJ { get; set; }


        [Column(TypeName = "nvarchar(500)")]
        public string Gender { get; set; }


        [Column(TypeName = "nvarchar(500)")]
        public string City { get; set; }


    }
}
