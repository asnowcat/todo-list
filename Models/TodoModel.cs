using System;
using System.ComponentModel.DataAnnotations;

namespace MosaicExercise.Models
{
    public class TodoModel
    {
        private string todoText;

        public TodoModel(string text) => Text = text;

        public string Text { 
            get => todoText;
            set => todoText = value;
        }
        
        public bool Done { get; set; } = false;
        public bool Deleted { get; set; } = false;
    }
}