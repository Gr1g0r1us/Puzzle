using System;
using System.Collections.Generic;

namespace WebApiPuzzle.Models;

public partial class User
{
    public string Login { get; set; } = null!;

    public string Password { get; set; } = null!;

    public bool? Role { get; set; }

    public int? IdGame { get; set; }
}
