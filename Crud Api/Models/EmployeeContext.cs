using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Crud.Models
{
    public class EmployeeContext : DbContext
    {
        internal Task SaveChangesAs;

        public EmployeeContext(DbContextOptions<EmployeeContext> options) : base(options)
        {

       }

       public DbSet<Employee> Employee { get; set; }


   }}