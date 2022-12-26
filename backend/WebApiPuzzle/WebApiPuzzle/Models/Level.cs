using System;
using System.Collections.Generic;

namespace WebApiPuzzle.Models;

public partial class Level
{
    public int IdLevel { get; set; }

    //public string TypePuzle { get; set; } = null!;

    public int Height { get; set; }

    public int Weight { get; set; }

    //public int LocationFragment { get; set; }
}
