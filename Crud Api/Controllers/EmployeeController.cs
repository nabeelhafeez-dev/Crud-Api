using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Crud.Models;
using System.Security.Cryptography;
using Crud_Api.AES;
using System.Text;
using Newtonsoft.Json;
using System.IO;

namespace Crud_Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly EmployeeContext _context;


        public EmployeeController(EmployeeContext context)
        {
            _context = context;
        }

        // GET: api/Employee
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployee()
        {
            return await _context.Employee.ToListAsync();
        }

        // GET: api/Employee/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Employee>> GetEmployee(int id)
        {
            var employee = await _context.Employee.FindAsync(id);

            if (employee == null)
            {
                return NotFound();
            }

            return employee;
        }

        // PUT: api/Employee/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult<Employee>> PutEmployee(int id, Employee employee)
        {
            if (id != employee.id)
            {
                return BadRequest();
            }

            _context.Entry(employee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EmployeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return employee;
        }


        [HttpPost] //ad string than send data in db
        public async Task<IActionResult> PostEmployee(Request encryptstr) // string encrypted data
        {
            //try
            //  String recresptedResquest = Decrypt(encryptstr.EncryptReq, encryptstr.Key);
            Request request = new Request();
            List<String> results = EncryptAesManaged(encryptstr.EncryptReq, "d", encryptstr.Key, "0000000000000000");
            request.EncryptReq = results[0];
            request.Key = results[1];
           
             Employee employee = JsonConvert.DeserializeObject<Employee>(results[0]);

            _context.Employee.Add(employee);
            await _context.SaveChangesAsync();
            //sync();

            return CreatedAtAction("GetEmployee", new { id = employee.id }, employee);
        }



        public List<String> EncryptAesManaged(String data, String action, String key, String iv)
        {

            DecryptionService decyptService = new DecryptionService();
            List<String> key_iv = new List<String>();
            try
            {
                using (Aes myAes = Aes.Create())
                {
                    byte[] cipherText = Convert.FromBase64String(data);
                    byte[] IV = new byte[myAes.BlockSize / 8];
                    myAes.IV = IV;
                    myAes.Mode = CipherMode.ECB;
                    myAes.Key = Encoding.UTF8.GetBytes(key);


                    if (action == "e")
                    {
                    }
                    else
                    {
                        try
                        {
                            myAes.Key =Encoding.UTF8.GetBytes(key);
                            string decrypted = decyptService.Decrypt(cipherText, myAes.Key, myAes.IV);
                            key_iv.Add(decrypted);
                            key_iv.Add(key);
                        }
                        catch (Exception e)
                        {
                            e.ToString();
                        }
                    }
                }

            }
            catch (Exception exp) {
                exp.ToString();
            }
            return key_iv;
        }
      
        //public static string EncryptString(string key, string plainText)
        //{
        //    byte[] iv = new byte[16];
        //    byte[] array;

        //    using (Aes aes = Aes.Create())
        //    {
        //        aes.Key = Encoding.UTF8.GetBytes(key);
        //        aes.IV = iv;
        //        aes.Padding = PaddingMode.PKCS7;
        //        aes.Mode = CipherMode.CBC;

        //        ICryptoTransform encryptor = aes.CreateEncryptor(aes.Key, aes.IV);

        //        using (MemoryStream memoryStream = new MemoryStream())
        //        {
        //            using (CryptoStream cryptoStream = new CryptoStream((Stream)memoryStream, encryptor, CryptoStreamMode.Write))
        //            {
        //                using (StreamWriter streamWriter = new StreamWriter((Stream)cryptoStream))
        //                {
        //                    streamWriter.Write(plainText);
        //                }

        //                array = memoryStream.ToArray();
        //            }
        //        }
        //    }

        //    return Convert.ToBase64String(array);
        //}

        // DELETE: api/Employee/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(int id)
        {
            var employee = await _context.Employee.FindAsync(id);
            if (employee == null)
            {
                return NotFound();
            }

            _context.Employee.Remove(employee);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EmployeeExists(int id)
        {
            return _context.Employee.Any(e => e.id == id);
        }
    }
}
