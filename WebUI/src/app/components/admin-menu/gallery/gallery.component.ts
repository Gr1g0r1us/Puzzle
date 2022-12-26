import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared.service';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})


export class GalleryComponent implements OnInit {
  imgs:any;
  img:IMG ={
  };
  str?: string;
  displayedColumns: string[] = ['IdArt', 'base64', 'Do'];
  private selectedFile: File | undefined;
  fileName = '';
  
  // onFileSelect(event:any) {
  //   this.selectedFile = event.target.files[0];
  //   console.log(123);
   
  //   this.saveArt(this.selectedFile);
  // }

  onFileSelected(event:any) {

    const file:File = event.target.files[0];

    if (file) {
        this.fileName = file.name;

        const formData = new FormData();

        formData.append("123",file);
        
        this.saveArt(this.fileName);
    }
  }


  constructor(private fb: FormBuilder, private auth: SharedService, private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
    this.auth.getArts().subscribe(x=>{
      this.imgs = x
    })
  }

  hiddenfileinput(){
    
  }

  deleteArt(element:any){
    this.auth.deleteArt(element).subscribe();
    this.ngOnInit();
  }

  saveArt(img:string){
    console.log(img);
    this.auth.saveArt(img).subscribe();
    //this.ngOnInit();
  }
}

interface IMG{
  IdArt? : string,
  base64? : string
}