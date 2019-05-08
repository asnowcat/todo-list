using System;
using System.ComponentModel.DataAnnotations;

namespace MosaicExercise.Models
{
    public class TodoModel
    {
        private string todoText;
        public bool Done { get; set; }
        public Guid ID { get; set; }
        public string Text
        {
            get => todoText;
            set => todoText = value;
        }

        public TodoModel(string text, Guid g)
        {
            this.Text = text;
            this.ID = g;
            this.Done = false;
        }
    }
}