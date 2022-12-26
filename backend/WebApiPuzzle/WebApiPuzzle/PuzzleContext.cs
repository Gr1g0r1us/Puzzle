using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using WebApiPuzzle.Models;

namespace WebApiPuzzle;

public partial class PuzzleContext : DbContext
{
    public PuzzleContext()
    {
    }

    public PuzzleContext(DbContextOptions<PuzzleContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Game> Games { get; set; }

    public virtual DbSet<Level> Levels { get; set; }

    public virtual DbSet<Puzzle> Puzzles { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=Puzzle;Username=postgres;Password =1234qwer");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Game>(entity =>
        {
            entity.HasKey(e => e.IdGame).HasName("game_pkey");

            entity.ToTable("game");

            entity.Property(e => e.IdGame)
                .ValueGeneratedNever()
                .HasColumnName("id_game");
            entity.Property(e => e.Condition)
                .HasColumnType("character varying")
                .HasColumnName("condition");
            entity.Property(e => e.CountStep).HasColumnName("count_step");
            entity.Property(e => e.IdPuzzle).HasColumnName("id_puzzle");
            entity.Property(e => e.Time)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("time");
        });

        modelBuilder.Entity<Level>(entity =>
        {
            entity.HasKey(e => e.IdLevel).HasName("level_pkey");

            entity.ToTable("level");

            entity.Property(e => e.IdLevel)
                .ValueGeneratedNever()
                .HasColumnName("id_level");
            entity.Property(e => e.Height).HasColumnName("height");
            //entity.Property(e => e.LocationFragment).HasColumnName("location_fragment");
            /*entity.Property(e => e.TypePuzle)
                .HasColumnType("character varying")
                .HasColumnName("type_puzle");*/
            entity.Property(e => e.Weight).HasColumnName("weight");
        });

        modelBuilder.Entity<Puzzle>(entity =>
        {
            entity.HasKey(e => e.IdPuzzle).HasName("puzzle_pkey");

            entity.ToTable("puzzle");

            entity.Property(e => e.IdPuzzle)
                .ValueGeneratedNever()
                .HasColumnName("id_puzzle");
            entity.Property(e => e.IdArt)
                .HasColumnType("character varying")
                .HasColumnName("id_art");
            entity.Property(e => e.IdLevel).HasColumnName("id_level");
            entity.Property(e => e.NamePuzzle)
                .HasColumnType("character varying")
                .HasColumnName("name_puzzle");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Login).HasName("user_pkey");

            entity.ToTable("user");

            entity.Property(e => e.Login)
                .HasColumnType("character varying")
                .HasColumnName("login");
            //entity.Property(e => e.IdGame).HasColumnName("id_game");
            entity.Property(e => e.Password)
                .HasColumnType("character varying")
                .HasColumnName("password");
            entity.Property(e => e.Role).HasColumnName("role");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
