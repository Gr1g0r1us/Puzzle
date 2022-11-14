using System;
using System.Collections.Generic;

namespace WebApiPuzzle.Models;

public partial class Game
{
    public int IdGame { get; set; }

    public int IdPuzzle { get; set; }

    public string Condition { get; set; } = null!;

    public DateTime Time { get; set; }

    public int CountStep { get; set; }
}
