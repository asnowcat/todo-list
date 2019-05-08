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
        private Dictionary<Guid, Models.TodoModel> Retrieve() {
            return HttpContext.Session.Get<Dictionary<Guid, Models.TodoModel>>("todoItems");
        }
        private void Store(Dictionary<Guid, Models.TodoModel> dict) {
            HttpContext.Session.Set<Dictionary<Guid, Models.TodoModel>>("todoItems", dict);
        }

        private Dictionary<Guid, Models.TodoModel> InitSession()
        {
            var todoItems = new Dictionary<Guid, Models.TodoModel>();
            Store(todoItems);
            return todoItems;
        }
        
        private Dictionary<Guid, Models.TodoModel> Update(Guid id, Func<Models.TodoModel, Models.TodoModel> action)
        {
            Dictionary<Guid, Models.TodoModel> todoItems = Retrieve();
            if (todoItems == null)
            {
                todoItems = InitSession();
            }

            todoItems[id] = action(todoItems[id]);

            Store(todoItems);

            return todoItems;
        }

        private Dictionary<Guid, Models.TodoModel> UpdateCollection(Guid id, Func<Models.TodoModel, Models.TodoModel> action)
        {
            Dictionary<Guid, Models.TodoModel> todoItems = Retrieve();
            if (todoItems == null)
            {
                todoItems = InitSession();
            }

            todoItems[id] = action(todoItems[id]);

            Store(todoItems);

            return todoItems;
        }

        public string Create(string text)
        {
            Models.TodoModel newTodo = new Models.TodoModel(text, Guid.NewGuid());

            Dictionary<Guid, Models.TodoModel> todoItems = Retrieve();
            if (todoItems == null)
            {
                todoItems = InitSession();
            }
            todoItems.Add(newTodo.ID, newTodo);

            Store(todoItems);

            return "{\"todoItems\":" + JsonConvert.SerializeObject(todoItems.Values) + "}";
        }

        public string Delete(string id)
        {
            var response = new Dictionary<string, dynamic>();

            Dictionary<Guid, Models.TodoModel> todoItems = Retrieve();
            if (todoItems == null)
            {
                todoItems = InitSession();
            }


            Guid guid = Guid.Parse(id);
            response["deleted"] = todoItems[guid];
            response["todoItems"] = todoItems.Values;
            todoItems.Remove(guid);

            Store(todoItems);

            return JsonConvert.SerializeObject(response);
        }

        public string Toggle(string id)
        {
            var response = new Dictionary<string, dynamic>();

            // Flip completion flag on todo item
            Func<Models.TodoModel, Models.TodoModel> toggle = (todo) => { todo.Done = !todo.Done; return todo; };

            Guid guid = Guid.Parse(id);
            var todoItems = Update(guid, toggle);
            response["toggled"] = todoItems[guid];
            response["todoItems"] = todoItems.Values;

            return JsonConvert.SerializeObject(response);
        }
        public string Index()
        {
            var response = new Dictionary<string, dynamic>();

            var todoItems = Retrieve();
            if (todoItems == null)
            {
                todoItems = InitSession();
            }

            response["todoItems"] = todoItems.Values;

            return JsonConvert.SerializeObject(response);
        }
    }
}