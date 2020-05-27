using System.Collections.Generic;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace DatingApp.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        // with private fields it's conventional to have underscore in from of variable
        // VS Code doesn't add _ automatically but this can be configured in settings for csharpextension (private)
        private readonly DataContext _context;
        public ValuesController(DataContext context)
        {
            // here this.context is replaced with _context
            _context = context;
        }

        // GET api/values
        [HttpGet]
        // using asynchronous method will make application more scalable
        // using async method to make a request to the database it will pass query to a different thread
        // and it will not block the threads where request is coming in
        // so we will await task to be completed without blocking the request
        // very useful for long running requests
        public async Task<ActionResult<IEnumerable<Value>>> Get()
        {
            var values = await _context.Values.ToListAsync(); // await requires to use async method of ToList
            return Ok(values); // ok - 200 response
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Value>> Get(int id)
        {
            var value = await _context.Values.FindAsync(id); // id is our primary key
            return Ok(value);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}