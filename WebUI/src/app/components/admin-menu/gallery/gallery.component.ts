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

  


  constructor(private fb: FormBuilder, private auth: SharedService, private router: Router,private http: HttpClient) { }

  ngOnInit(): void {
    this.auth.getArts().subscribe(x=>{
      this.imgs = x
    })
  }

  onFileSelected(fileInput: any) {
    this.selectedFile = <File>fileInput.target.files[0];
    // const file:File = event.target.files[0];
    this.fileName = this.selectedFile.name;
    console.log(this.fileName);
    // const file:File = event.target.files[0];
    // const Art  = {
    //   IdArt: this.fileName
    //   //base64: "f"
    //   }
    // 
    // if (file) {
    //     

    //     const formData = new FormData();

    //     formData.append("123",file);
    //     const Art  = {
    //       IdArt: this.fileName
    //       //base64: "f"
    //       }
        
    //     this.deleteArt(Art);
    // }
  }

  sendFile(){
    const Art  = {
            IdArt: this.fileName
            //base64: "f"
            }
    this.saveArt1(Art);
  }

  hiddenfileinput(){
    
  }

  deleteArt(element:any){
    console.log(element);
    this.auth.deleteArt(element).subscribe();
    this.ngOnInit();
  }

  saveArt1(img:any){
    console.log(img);
    this.auth.saveArt(img).subscribe(null,error=> console.log(error));
  }
}

interface IMG{
  IdArt? : string,
  base64? : string
}