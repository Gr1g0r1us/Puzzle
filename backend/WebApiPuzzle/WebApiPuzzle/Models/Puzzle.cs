using System;
using System.Collections.Generic;

namespace WebApiPuzzle.Models;

public partial class Puzzle
{
    public int IdPuzzle { get; set; }

    public string NamePuzzle { get; set; } = null!;

    public int IdLevel { get; set; }

    public string IdArt { get; set; } = null!;
}
