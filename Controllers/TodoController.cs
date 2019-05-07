using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Text.Encodings.Web;

namespace MvcMovie.Controllers
{
    public class TodoController : Controller
    {
        public string Create(string text)
        {
            return HtmlEncoder.Default.Encode($"Create: {text}");
        }

        public string Delete(int ID)
        {
            return HtmlEncoder.Default.Encode($"Delete: {ID}");
        }

        public string Toggle(int ID)
        {
            return HtmlEncoder.Default.Encode($"Toggle: {ID}");
        }
    }
}