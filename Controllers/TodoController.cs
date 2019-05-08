using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Text.Encodings.Web;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;

namespace MosaicExercise.Controllers
{
    public class TodoController : Controller
    {
        private List<Models.TodoModel> InitSession()
        {
            var todoItems = new List<Models.TodoModel>();
            HttpContext.Session.Set<List<Models.TodoModel>>("todoItems", todoItems);
            return todoItems;
        }
        private List<Models.TodoModel> Update(int id, Func<Models.TodoModel, Models.TodoModel> action)
        {
            List<Models.TodoModel> todoItems = HttpContext.Session.Get<List<Models.TodoModel>>("todoItems");
            if (todoItems == null)
            {
                todoItems = InitSession();
            }

            todoItems[id] = action(todoItems[id]);

            HttpContext.Session.Set<List<Models.TodoModel>>("todoItems", todoItems);

            return todoItems;
        }
        public string Create(string text)
        {
            Models.TodoModel newTodo = new Models.TodoModel(text);

            List<Models.TodoModel> todoItems = HttpContext.Session.Get<List<Models.TodoModel>>("todoItems");
            if (todoItems == null)
            {
                todoItems = InitSession();
            }
            todoItems.Add(newTodo);

            HttpContext.Session.Set<List<Models.TodoModel>>("todoItems", todoItems);

            return "{\"todoItems\":" + JsonConvert.SerializeObject(todoItems) + "}";
        }

        public string Delete(int id)
        {
            // Flip deletion flag on todo item (soft delete)
            Func<Models.TodoModel, Models.TodoModel> delete = (todo) => { todo.Deleted = !todo.Deleted; return todo; };

            var todoItems = Update(id, delete);

            return "{\"todoItems\":" + JsonConvert.SerializeObject(todoItems) + "}";
        }

        public string Toggle(int id)
        {
            // Flip completion flag on todo item
            Func<Models.TodoModel, Models.TodoModel> delete = (todo) => { todo.Done = !todo.Done; return todo; };

            var todoItems = Update(id, delete);

            return "{\"todoItems\":" + JsonConvert.SerializeObject(todoItems) + "}";
        }

        public string Index()
        {
            var todoItems = HttpContext.Session.Get<List<Models.TodoModel>>("todoItems");

            return "{\"todoItems\":" + JsonConvert.SerializeObject(todoItems) + "}";
        }
    }
}